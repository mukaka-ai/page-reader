import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Mail, Phone, Calendar, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { StudentForm } from "@/components/admin/StudentForm";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  class: string;
  message: string | null;
  status: string | null;
  created_at: string;
}

const AdminStudents = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<string>("all");

  const { data: students, isLoading } = useQuery({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Student[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("students")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students"] });
      queryClient.invalidateQueries({ queryKey: ["pending-students"] });
      toast({ title: "Status updated!" });
    },
    onError: (error) => {
      toast({ title: "Error updating status", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("students").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-students"] });
      queryClient.invalidateQueries({ queryKey: ["students-count"] });
      queryClient.invalidateQueries({ queryKey: ["pending-students"] });
      toast({ title: "Student registration deleted!" });
    },
    onError: (error) => {
      toast({ title: "Error deleting", description: error.message, variant: "destructive" });
    },
  });

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-500">Pending</Badge>;
    }
  };

  const filteredStudents = students?.filter((student) => {
    if (filter === "all") return true;
    return student.status === filter || (filter === "pending" && !student.status);
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Student Registrations</h1>
            <p className="text-muted-foreground">Review and manage student applications</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Registrations</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <StudentForm />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
          </div>
        ) : filteredStudents?.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <GraduationCap className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {filter === "all" ? "No student registrations yet" : `No ${filter} registrations`}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredStudents?.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">
                              {student.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{student.name}</h3>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(student.status)}
                              <Badge variant="outline">{student.class}</Badge>
                              <span className="text-sm text-muted-foreground">Age: {student.age}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {student.email}
                          </span>
                          <span className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {student.phone}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(student.created_at), "PPP")}
                          </span>
                        </div>

                        {student.message && (
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            "{student.message}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {student.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600"
                            onClick={() => updateStatusMutation.mutate({ id: student.id, status: "approved" })}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                        {student.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                            onClick={() => updateStatusMutation.mutate({ id: student.id, status: "rejected" })}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Registration</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {student.name}'s registration? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(student.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminStudents;
