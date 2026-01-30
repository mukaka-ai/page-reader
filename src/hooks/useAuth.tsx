import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRoleLoading, setIsRoleLoading] = useState(false);

  // Exposed loading flag: includes both auth init + admin role resolution.
  const isLoading = isInitializing || isRoleLoading;

  const checkAdminRole = async (userId: string) => {
    // Use maybeSingle() to avoid errors when the user has no admin role.
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) return false;
    return !!data;
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Don't query roles inside onAuthStateChange (can deadlock). We resolve roles in a separate effect.
        if (!session?.user) {
          setIsAdmin(false);
          setIsRoleLoading(false);
        }

        setIsInitializing(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (!session?.user) {
        setIsAdmin(false);
        setIsRoleLoading(false);
      }

      setIsInitializing(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Resolve admin role whenever the authenticated user changes.
  useEffect(() => {
    if (!user?.id) return;

    let cancelled = false;
    setIsRoleLoading(true);

    (async () => {
      const admin = await checkAdminRole(user.id);
      if (cancelled) return;
      setIsAdmin(admin);
      setIsRoleLoading(false);
    })().catch(() => {
      if (cancelled) return;
      setIsAdmin(false);
      setIsRoleLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setIsRoleLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAdmin,
      isLoading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
