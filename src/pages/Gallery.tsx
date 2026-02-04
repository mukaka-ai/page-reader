import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Play, Video } from "lucide-react";
import PhotoLightbox from "@/components/PhotoLightbox";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { mockGalleryVideos } from "@/lib/mockData";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";

interface MediaItem {
  id: string;
  type: "image" | "video";
  title: string;
  url: string;
  category: string;
}

interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  category: string;
}

export default function Gallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching gallery photos:", error);
        setMedia([]);
      } else {
        const items: MediaItem[] = (data as GalleryPhoto[]).map((photo) => ({
          id: photo.id,
          type: "image" as const,
          title: photo.title,
          url: photo.url,
          category: photo.category,
        }));
        setMedia(items);
      }
      
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  const categories = ["all", ...Array.from(new Set(media.map(m => m.category)))];
  const filteredMedia = selectedCategory === "all" 
    ? media 
    : media.filter(m => m.category === selectedCategory);

  const filteredVideos = selectedCategory === "all"
    ? mockGalleryVideos
    : mockGalleryVideos.filter(v => v.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentMediaIndex(index);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : filteredMedia.length - 1));
    } else {
      setCurrentMediaIndex((prev) => (prev < filteredMedia.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Gallery"
        description="Browse our photos and videos from training sessions, events, and tournaments at Nairobi Taekwondo Association."
      />
      <section className="py-16 text-center bg-muted/30">
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
          <Camera className="w-4 h-4 mr-2" /> Media Gallery
        </Badge>
        <h1 className="text-4xl font-bold mb-4">Academy Media Gallery</h1>
        <p className="text-muted-foreground mb-6">Browse our photos and videos from training, events, and tournaments.</p>
        
        {/* Tab Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={activeTab === "photos" ? "default" : "outline"}
            onClick={() => setActiveTab("photos")}
            className="gap-2"
          >
            <Camera className="w-4 h-4" /> Photos
          </Button>
          <Button
            variant={activeTab === "videos" ? "default" : "outline"}
            onClick={() => setActiveTab("videos")}
            className="gap-2"
          >
            <Video className="w-4 h-4" /> Videos
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {activeTab === "photos" ? (
          <>
            {loading ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className="space-y-3">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredMedia.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed"
              >
                <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No photos found</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "all" 
                    ? "No photos available yet."
                    : `No photos in the "${selectedCategory}" category.`}
                </p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMedia.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="font-medium truncate">{item.title}</p>
                        <Badge variant="secondary" className="mt-2 capitalize">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="space-y-3">
                    <Skeleton className="aspect-video w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredVideos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed"
              >
                <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No videos found</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "all" 
                    ? "No videos available yet."
                    : `No videos in the "${selectedCategory}" category.`}
                </p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-card"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <video
                        src={video.url}
                        poster={video.thumbnail}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{video.title}</h3>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Play className="w-3 h-3" /> {video.duration}
                        </span>
                      </div>
                      <Badge variant="outline" className="mt-2 capitalize text-primary border-primary/30">
                        {video.category}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <PhotoLightbox
        media={filteredMedia}
        currentIndex={currentMediaIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={navigateLightbox}
      />

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Next Event</h2>
          <p className="text-muted-foreground mb-6">
            Be part of the action and create memories that last a lifetime
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/events">View Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/join">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
