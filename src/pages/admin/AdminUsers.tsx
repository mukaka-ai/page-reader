import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Shield, ShieldCheck, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: "admin" | "user";
}

const AdminUsers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profiles, isLoading: loadingProfiles } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as UserProfile[];
    },
  });

  const { data: userRoles, isLoading: loadingRoles } = useQuery({
    queryKey: ["admin-user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data as UserRole[];
    },
  });

  const toggleAdminMutation = useMutation({
    mutationFn: async ({ userId, makeAdmin }: { userId: string; makeAdmin: boolean }) => {
      if (makeAdmin) {
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", "admin");
        if (error) throw error;
      }
    },
    onSuccess: (_, { makeAdmin }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-roles"] });
      toast({
        title: makeAdmin ? "Admin role granted" : "Admin role revoked",
        description: makeAdmin
          ? "User now has admin access."
          : "User no longer has admin access.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating role",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const isLoading = loadingProfiles || loadingRoles;

  const getUserRole = (userId: string): "admin" | "user" => {
    const role = userRoles?.find((r) => r.user_id === userId && r.role === "admin");
    return role ? "admin" : "user";
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">
            View and manage user accounts and roles.
          </p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              All Users ({profiles?.length || 0})
            </CardTitle>
            <CardDescription>
              Manage user accounts and assign admin privileges.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!profiles || profiles.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No users yet"
                description="Users will appear here once they sign up."
              />
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile) => {
                      const role = getUserRole(profile.user_id);
                      const isAdmin = role === "admin";

                      return (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-bold text-primary">
                                  {(profile.full_name || profile.email || "U")
                                    .charAt(0)
                                    .toUpperCase()}
                                </span>
                              </div>
                              <span>{profile.full_name || "No name"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {profile.email || "No email"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={isAdmin ? "default" : "secondary"}
                              className="gap-1"
                            >
                              {isAdmin ? (
                                <ShieldCheck className="w-3 h-3" />
                              ) : (
                                <Shield className="w-3 h-3" />
                              )}
                              {role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(profile.created_at), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant={isAdmin ? "destructive" : "outline"}
                                  size="sm"
                                >
                                  {isAdmin ? "Remove Admin" : "Make Admin"}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    {isAdmin ? "Remove admin access?" : "Grant admin access?"}
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {isAdmin
                                      ? `This will revoke admin privileges from ${profile.full_name || profile.email}. They will no longer be able to access the admin dashboard.`
                                      : `This will grant admin privileges to ${profile.full_name || profile.email}. They will be able to access all admin features.`}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      toggleAdminMutation.mutate({
                                        userId: profile.user_id,
                                        makeAdmin: !isAdmin,
                                      })
                                    }
                                  >
                                    {isAdmin ? "Remove Admin" : "Grant Admin"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
