import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Play } from "lucide-react";
import PhotoLightbox from "@/components/PhotoLightbox";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { mockGalleryImages } from "@/lib/mockData";

interface MediaItem {
  id: string;
  type: "image" | "video";
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

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const items: MediaItem[] = mockGalleryImages.map((img) => ({
        id: img.id,
        type: "image" as const,
        title: img.caption,
        url: img.url,
        category: img.category,
      }));
      
      setMedia(items);
      setLoading(false);
    }, 500);
  }, []);

  const categories = ["all", ...Array.from(new Set(media.map(m => m.category)))];
  const filteredMedia = selectedCategory === "all" 
    ? media 
    : media.filter(m => m.category === selectedCategory);

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
      <section className="py-16 text-center bg-muted/30">
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
          <Camera className="w-4 h-4 mr-2" /> Media Gallery
        </Badge>
        <h1 className="text-4xl font-bold mb-4">Academy Media Gallery</h1>
        <p className="text-muted-foreground mb-6">Browse our photos from training, events, and tournaments.</p>
        
        {/* Category Filter */}
        <div className="flex justify-center gap-2 flex-wrap mt-6">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
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
            <h3 className="text-xl font-bold mb-2">No media found</h3>
            <p className="text-muted-foreground">
              {selectedCategory === "all" 
                ? "No media items available yet."
                : `No items in the "${selectedCategory}" category.`}
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
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-muted flex items-center justify-center">
                      <Play className="w-12 h-12 text-primary" />
                      <video
                        src={item.url}
                        className="w-full h-full object-cover absolute inset-0"
                        muted
                      />
                    </div>
                  )}
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
