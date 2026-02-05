import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Image, Video, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  category: string;
  created_at: string;
}

interface GalleryVideo {
  id: string;
  title: string;
  url: string;
  category: string;
  created_at: string;
}

const categories = ["training", "competition", "seminar", "graduation", "events"];

const AdminGallery = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("photos");
  
  // Photo states
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoFormData, setPhotoFormData] = useState({
    title: "",
    url: "",
    category: "training",
  });
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  // Video states
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<GalleryVideo | null>(null);
  const [videoFormData, setVideoFormData] = useState({
    title: "",
    url: "",
    category: "training",
  });

  // Photos query
  const { data: photos, isLoading: photosLoading } = useQuery({
    queryKey: ["admin-gallery-photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as GalleryPhoto[];
    },
  });

  // Videos query
  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["admin-gallery-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_videos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as GalleryVideo[];
    },
  });

  // Helper functions
  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const deleteStorageImage = async (url: string) => {
    try {
      const path = url.split("/gallery/")[1];
      if (path) {
        await supabase.storage.from("gallery").remove([path]);
      }
    } catch (error) {
      console.error("Error deleting storage image:", error);
    }
  };

  // Photo mutations
  const createPhotoMutation = useMutation({
    mutationFn: async (data: { title: string; url: string; category: string }) => {
      const { error } = await supabase.from("gallery_photos").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-photos"] });
      toast({ title: "Photo added successfully!" });
      resetPhotoForm();
    },
    onError: (error) => {
      toast({ title: "Error adding photo", description: error.message, variant: "destructive" });
    },
  });

  const updatePhotoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { title: string; url: string; category: string } }) => {
      const { error } = await supabase.from("gallery_photos").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-photos"] });
      toast({ title: "Photo updated successfully!" });
      resetPhotoForm();
    },
    onError: (error) => {
      toast({ title: "Error updating photo", description: error.message, variant: "destructive" });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: async (photo: GalleryPhoto) => {
      await deleteStorageImage(photo.url);
      const { error } = await supabase.from("gallery_photos").delete().eq("id", photo.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-photos"] });
      toast({ title: "Photo deleted successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error deleting photo", description: error.message, variant: "destructive" });
    },
  });

  // Video mutations
  const createVideoMutation = useMutation({
    mutationFn: async (data: { title: string; url: string; category: string }) => {
      const { error } = await supabase.from("gallery_videos").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-videos"] });
      toast({ title: "Video added successfully!" });
      resetVideoForm();
    },
    onError: (error) => {
      toast({ title: "Error adding video", description: error.message, variant: "destructive" });
    },
  });

  const updateVideoMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { title: string; url: string; category: string } }) => {
      const { error } = await supabase.from("gallery_videos").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-videos"] });
      toast({ title: "Video updated successfully!" });
      resetVideoForm();
    },
    onError: (error) => {
      toast({ title: "Error updating video", description: error.message, variant: "destructive" });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_videos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-videos"] });
      toast({ title: "Video deleted successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error deleting video", description: error.message, variant: "destructive" });
    },
  });

  // Form handlers
  const resetPhotoForm = () => {
    setPhotoFormData({ title: "", url: "", category: "training" });
    setEditingPhoto(null);
    setSelectedPhotoFile(null);
    setPhotoPreviewUrl(null);
    setIsPhotoDialogOpen(false);
  };

  const resetVideoForm = () => {
    setVideoFormData({ title: "", url: "", category: "training" });
    setEditingVideo(null);
    setIsVideoDialogOpen(false);
  };

  const handleEditPhoto = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
    setPhotoFormData({ title: photo.title, url: photo.url, category: photo.category });
    setPhotoPreviewUrl(photo.url);
    setIsPhotoDialogOpen(true);
  };

  const handleEditVideo = (video: GalleryVideo) => {
    setEditingVideo(video);
    setVideoFormData({ title: video.title, url: video.url, category: video.category });
    setIsVideoDialogOpen(true);
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPhotoPreviewUrl(url);
    }
  };

  const handlePhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhotoUploading(true);

    try {
      let imageUrl = photoFormData.url;

      if (selectedPhotoFile) {
        imageUrl = await uploadImage(selectedPhotoFile);
      }

      if (!imageUrl) {
        toast({ title: "Please upload an image or provide a URL", variant: "destructive" });
        setPhotoUploading(false);
        return;
      }

      if (editingPhoto) {
        if (selectedPhotoFile && editingPhoto.url !== imageUrl) {
          await deleteStorageImage(editingPhoto.url);
        }
        updatePhotoMutation.mutate({ id: editingPhoto.id, data: { ...photoFormData, url: imageUrl } });
      } else {
        createPhotoMutation.mutate({ ...photoFormData, url: imageUrl });
      }
    } catch (error: any) {
      toast({ title: "Error uploading image", description: error.message, variant: "destructive" });
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFormData.url) {
      toast({ title: "Please provide a video URL", variant: "destructive" });
      return;
    }

    if (editingVideo) {
      updateVideoMutation.mutate({ id: editingVideo.id, data: videoFormData });
    } else {
      createVideoMutation.mutate(videoFormData);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gallery</h1>
            <p className="text-muted-foreground">Manage photos and videos</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="photos" className="gap-2">
                <Image className="w-4 h-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
            </TabsList>

            {activeTab === "photos" ? (
              <Button onClick={() => { resetPhotoForm(); setIsPhotoDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
            ) : (
              <Button onClick={() => { resetVideoForm(); setIsVideoDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            )}
          </div>

          {/* Photos Tab */}
          <TabsContent value="photos">
            {photosLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
              </div>
            ) : photos?.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Image className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No photos in gallery yet</p>
                  <Button className="mt-4" onClick={() => setIsPhotoDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Photo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {photos?.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <Button size="icon" variant="secondary" onClick={() => handleEditPhoto(photo)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Photo</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{photo.title}"?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deletePhotoMutation.mutate(photo)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="font-medium text-sm truncate">{photo.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{photo.category}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            {videosLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
              </div>
            ) : videos?.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Video className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No videos in gallery yet</p>
                  <Button className="mt-4" onClick={() => setIsVideoDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Video
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {videos?.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video overflow-hidden relative bg-muted">
                        <video
                          src={video.url}
                          className="w-full h-full object-cover"
                          controls
                        />
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm truncate">{video.title}</p>
                            <p className="text-xs text-muted-foreground capitalize">{video.category}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" onClick={() => handleEditVideo(video)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost" className="text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Video</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{video.title}"?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteVideoMutation.mutate(video.id)}
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
          </TabsContent>
        </Tabs>

        {/* Photo Dialog */}
        <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingPhoto ? "Edit Photo" : "Add New Photo"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photo-title">Title *</Label>
                <Input
                  id="photo-title"
                  value={photoFormData.title}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, title: e.target.value })}
                  placeholder="Photo title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo-category">Category *</Label>
                <Select
                  value={photoFormData.category}
                  onValueChange={(value) => setPhotoFormData({ ...photoFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {photoPreviewUrl ? (
                    <div className="relative">
                      <img
                        src={photoPreviewUrl}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPhotoPreviewUrl(null);
                          setSelectedPhotoFile(null);
                          setPhotoFormData({ ...photoFormData, url: "" });
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer py-8"
                      onClick={() => photoInputRef.current?.click()}
                    >
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoFileChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo-url">Or enter image URL</Label>
                <Input
                  id="photo-url"
                  value={photoFormData.url}
                  onChange={(e) => {
                    setPhotoFormData({ ...photoFormData, url: e.target.value });
                    setPhotoPreviewUrl(e.target.value);
                    setSelectedPhotoFile(null);
                  }}
                  placeholder="https://..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetPhotoForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={photoUploading || createPhotoMutation.isPending || updatePhotoMutation.isPending}
                >
                  {photoUploading ? "Uploading..." : editingPhoto ? "Update Photo" : "Add Photo"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Video Dialog */}
        <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingVideo ? "Edit Video" : "Add New Video"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleVideoSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-title">Title *</Label>
                <Input
                  id="video-title"
                  value={videoFormData.title}
                  onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                  placeholder="Video title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-category">Category *</Label>
                <Select
                  value={videoFormData.category}
                  onValueChange={(value) => setVideoFormData({ ...videoFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL *</Label>
                <Input
                  id="video-url"
                  value={videoFormData.url}
                  onChange={(e) => setVideoFormData({ ...videoFormData, url: e.target.value })}
                  placeholder="https://... (YouTube, Vimeo, or direct video URL)"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter a direct video URL or embed URL from YouTube/Vimeo
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetVideoForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createVideoMutation.isPending || updateVideoMutation.isPending}
                >
                  {editingVideo ? "Update Video" : "Add Video"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
