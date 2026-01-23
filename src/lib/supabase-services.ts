import { supabase } from "@/integrations/supabase/client";

// ============================================
// AUTH SERVICES
// ============================================

export const authService = {
  signUp: async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName }
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }
};

// ============================================
// USER ROLE SERVICES
// ============================================

export const roleService = {
  getUserRole: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
    return { role: data?.role, error };
  },

  isAdmin: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();
    
    return !!data;
  }
};

// ============================================
// COACHES SERVICES
// ============================================

export interface Coach {
  id: string;
  name: string;
  rank: string;
  experience: string | null;
  specialization: string[] | null;
  achievements: string[] | null;
  students: string[] | null;
  image_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export type CoachInsert = Omit<Coach, 'id' | 'created_at' | 'updated_at'>;
export type CoachUpdate = Partial<CoachInsert>;

export const coachesService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: data as Coach[] | null, error };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', id)
      .single();
    return { data: data as Coach | null, error };
  },

  create: async (coach: CoachInsert) => {
    const { data, error } = await supabase
      .from('coaches')
      .insert(coach)
      .select()
      .single();
    return { data: data as Coach | null, error };
  },

  update: async (id: string, updates: CoachUpdate) => {
    const { data, error } = await supabase
      .from('coaches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data: data as Coach | null, error };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('coaches')
      .delete()
      .eq('id', id);
    return { error };
  },

  uploadImage: async (file: File, coachId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${coachId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('coaches')
      .upload(filePath, file);

    if (uploadError) return { url: null, error: uploadError };

    const { data } = supabase.storage
      .from('coaches')
      .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  }
};

// ============================================
// EVENTS SERVICES
// ============================================

export interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  type: 'competition' | 'seminar' | 'workshop' | 'exam';
  registration_link: string | null;
  image_url: string | null;
  is_past: boolean | null;
  created_at: string;
  updated_at: string;
}

export type EventInsert = Omit<Event, 'id' | 'created_at' | 'updated_at'>;
export type EventUpdate = Partial<EventInsert>;

export const eventsService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    return { data: data as Event[] | null, error };
  },

  getUpcoming: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_past', false)
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true });
    return { data: data as Event[] | null, error };
  },

  getPast: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_past', true)
      .order('date', { ascending: false });
    return { data: data as Event[] | null, error };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    return { data: data as Event | null, error };
  },

  create: async (event: EventInsert) => {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();
    return { data: data as Event | null, error };
  },

  update: async (id: string, updates: EventUpdate) => {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data: data as Event | null, error };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    return { error };
  },

  uploadImage: async (file: File, eventId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${eventId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('events')
      .upload(filePath, file);

    if (uploadError) return { url: null, error: uploadError };

    const { data } = supabase.storage
      .from('events')
      .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  }
};

// ============================================
// STUDENTS SERVICES (Registration)
// ============================================

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  class: 'kids' | 'adults' | 'private';
  message: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export type StudentInsert = Omit<Student, 'id' | 'created_at' | 'updated_at' | 'status'>;
export type StudentUpdate = Partial<Pick<Student, 'status'>>;

export const studentsService = {
  // Public: Register a new student (from Join page form)
  register: async (student: StudentInsert) => {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single();
    return { data: data as Student | null, error };
  },

  // Admin only: Get all students
  getAll: async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: data as Student[] | null, error };
  },

  // Admin only: Update student status
  updateStatus: async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    const { data, error } = await supabase
      .from('students')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    return { data: data as Student | null, error };
  },

  // Admin only: Delete student
  delete: async (id: string) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    return { error };
  }
};

// ============================================
// MESSAGES SERVICES (Contact Form)
// ============================================

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export type MessageInsert = Omit<Message, 'id' | 'created_at' | 'is_read'>;

export const messagesService = {
  // Public: Submit a contact message
  submit: async (message: MessageInsert) => {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();
    return { data: data as Message | null, error };
  },

  // Admin only: Get all messages
  getAll: async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: data as Message[] | null, error };
  },

  // Admin only: Mark message as read
  markAsRead: async (id: string) => {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();
    return { data: data as Message | null, error };
  },

  // Admin only: Delete message
  delete: async (id: string) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    return { error };
  }
};

// ============================================
// PROFILE SERVICES
// ============================================

export interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const profilesService = {
  getMyProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    return { data: data as Profile | null, error };
  },

  updateMyProfile: async (updates: Partial<Pick<Profile, 'full_name' | 'avatar_url'>>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();
    return { data: data as Profile | null, error };
  }
};
