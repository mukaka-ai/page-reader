import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { motion } from "framer-motion";

interface Coach {
  id: string;
  name: string;
  rank: string;
  bio: string | null;
  experience: string | null;
  image_url: string | null;
  specialization: string[] | null;
  achievements: string[] | null;
}

const AdminCoaches = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    bio: "",
    experience: "",
    image_url: "",
    specialization: "",
    achievements: "",
  });

  const { data: coaches, isLoading } = useQuery({
    queryKey: ["admin-coaches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coaches")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Coach[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("coaches").insert({
        name: data.name,
        rank: data.rank,
        bio: data.bio || null,
        experience: data.experience || null,
        image_url: data.image_url || null,
        specialization: data.specialization ? data.specialization.split(",").map((s) => s.trim()) : null,
        achievements: data.achievements ? data.achievements.split(",").map((s) => s.trim()) : null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coaches"] });
      queryClient.invalidateQueries({ queryKey: ["coaches-count"] });
      toast({ title: "Coach added successfully!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error adding coach", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from("coaches")
        .update({
          name: data.name,
          rank: data.rank,
          bio: data.bio || null,
          experience: data.experience || null,
          image_url: data.image_url || null,
          specialization: data.specialization ? data.specialization.split(",").map((s) => s.trim()) : null,
          achievements: data.achievements ? data.achievements.split(",").map((s) => s.trim()) : null,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coaches"] });
      toast({ title: "Coach updated successfully!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error updating coach", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("coaches").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coaches"] });
      queryClient.invalidateQueries({ queryKey: ["coaches-count"] });
      toast({ title: "Coach deleted successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error deleting coach", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", rank: "", bio: "", experience: "", image_url: "", specialization: "", achievements: "" });
    setEditingCoach(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (coach: Coach) => {
    setEditingCoach(coach);
    setFormData({
      name: coach.name,
      rank: coach.rank,
      bio: coach.bio || "",
      experience: coach.experience || "",
      image_url: coach.image_url || "",
      specialization: coach.specialization?.join(", ") || "",
      achievements: coach.achievements?.join(", ") || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoach) {
      updateMutation.mutate({ id: editingCoach.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Coaches</h1>
            <p className="text-muted-foreground">Manage your coaching staff</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Coach
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCoach ? "Edit Coach" : "Add New Coach"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rank">Rank *</Label>
                    <Input
                      id="rank"
                      value={formData.rank}
                      onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                      placeholder="e.g., 5th Dan Black Belt"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 15 years"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Coach Photo</Label>
                  <ImageUpload
                    currentImageUrl={formData.image_url}
                    onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
                    bucket="coaches"
                    folder="photos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specializations (comma-separated)</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="Forms, Sparring, Breaking"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievements">Achievements (comma-separated)</Label>
                  <Input
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    placeholder="National Champion, Certified Instructor"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingCoach ? "Update Coach" : "Add Coach"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
          </div>
        ) : coaches?.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No coaches added yet</p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Coach
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coaches?.map((coach, index) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {coach.image_url && (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={coach.image_url}
                        alt={coach.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                    <p className="text-sm text-primary font-medium">{coach.rank}</p>
                  </CardHeader>
                  <CardContent>
                    {coach.experience && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Experience: {coach.experience}
                      </p>
                    )}
                    {coach.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{coach.bio}</p>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(coach)}>
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Coach</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {coach.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(coach.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default AdminCoaches;
