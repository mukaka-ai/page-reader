import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Shield, ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

type AuthMode = "signin" | "forgot-password" | "reset-password";

// Only these emails can sign in
const ADMIN_EMAILS = ["telo18429@gmail.com", "mukakahillary26@gmail.com"];

const Auth = () => {
  const { user, isAdmin, isLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectAfterSignIn, setRedirectAfterSignIn] = useState(false);

  useEffect(() => {
    if (!redirectAfterSignIn) return;
    if (!user || isLoading) return;

    navigate(isAdmin ? "/admin" : "/", { replace: true });
    setRedirectAfterSignIn(false);
  }, [redirectAfterSignIn, user, isLoading, isAdmin, navigate]);

  // Check for password reset token in URL
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    
    if (type === "recovery") {
      setMode("reset-password");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        // Check if email is an admin email
        if (!ADMIN_EMAILS.includes(formData.email.toLowerCase())) {
          toast({
            title: "Access Denied",
            description: "Only administrators can sign in.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          setRedirectAfterSignIn(true);
        }
      } else if (mode === "forgot-password") {
        // Check if email is an admin email
        if (!ADMIN_EMAILS.includes(formData.email.toLowerCase())) {
          toast({
            title: "Access Denied",
            description: "Only administrators can reset their password.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const redirectUrl = `${window.location.origin}/auth`;
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: redirectUrl,
        });
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Check your email",
            description: "We've sent you a password reset link.",
          });
          setMode("signin");
        }
      } else if (mode === "reset-password") {
        const { error } = await supabase.auth.updateUser({
          password: formData.newPassword,
        });
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Password updated!",
            description: "You can now sign in with your new password.",
          });
          setMode("signin");
          setFormData({ email: "", password: "", newPassword: "" });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  const getTitle = () => {
    switch (mode) {
      case "forgot-password":
        return "Reset Password";
      case "reset-password":
        return "Set New Password";
      default:
        return "Admin Login";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "forgot-password":
        return "Enter your admin email to receive a reset link";
      case "reset-password":
        return "Choose a new password for your account";
      default:
        return "Sign in to access the admin dashboard";
    }
  };

  return (
    <Layout>
      <SEOHead 
        title={getTitle()} 
        description="Admin login for Nairobi Taekwondo Association."
      />
      <section className="py-20 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Card className="border-2 border-border/50 shadow-elegant bg-card/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                >
                  <Shield className="w-8 h-8 text-primary" />
                </motion.div>
                <CardTitle className="text-2xl font-bold">{getTitle()}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {getDescription()}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode !== "reset-password" && (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your admin email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="pl-10 h-12 bg-background border-input focus:border-primary transition-colors"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {mode === "signin" && (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                          }
                          className="pl-10 pr-10 h-12 bg-background border-input focus:border-primary transition-colors"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === "reset-password" && (
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-foreground font-medium">
                        New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, newPassword: e.target.value })
                          }
                          className="pl-10 pr-10 h-12 bg-background border-input focus:border-primary transition-colors"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === "signin" && (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="link"
                        className="text-primary p-0 h-auto font-medium"
                        onClick={() => setMode("forgot-password")}
                      >
                        Forgot password?
                      </Button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold shadow-red hover:shadow-accent transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                        {mode === "signin" && "Signing In..."}
                        {mode === "forgot-password" && "Sending..."}
                        {mode === "reset-password" && "Updating..."}
                      </div>
                    ) : (
                      <>
                        {mode === "signin" && "Sign In"}
                        {mode === "forgot-password" && "Send Reset Link"}
                        {mode === "reset-password" && "Update Password"}
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  {(mode === "forgot-password" || mode === "reset-password") && (
                    <Button
                      variant="link"
                      onClick={() => {
                        setMode("signin");
                        setFormData({ email: "", password: "", newPassword: "" });
                      }}
                      className="text-primary font-semibold hover:text-primary/80 gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-muted-foreground mt-6"
            >
              This area is restricted to administrators only
            </motion.p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
