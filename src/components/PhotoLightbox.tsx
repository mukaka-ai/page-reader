import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface MediaItem {
  id: string;
  type: "image" | "video";
  title: string;
  url: string;
  category: string;
}

interface PhotoLightboxProps {
  media: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function PhotoLightbox({
  media,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  if (!media.length) return null;

  const currentItem = media[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 bg-black/95 border-0">
        <div className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            onClick={() => onNavigate("prev")}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            onClick={() => onNavigate("next")}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Media Content */}
          <div className="flex items-center justify-center min-h-[60vh] p-8">
            {currentItem.type === "image" ? (
              <img
                src={currentItem.url}
                alt={currentItem.title}
                className="max-h-[70vh] max-w-full object-contain"
              />
            ) : (
              <video
                src={currentItem.url}
                controls
                className="max-h-[70vh] max-w-full"
              />
            )}
          </div>

          {/* Caption */}
          <div className="text-center p-4 text-white">
            <p className="font-medium">{currentItem.title}</p>
            <p className="text-sm text-white/60 capitalize">{currentItem.category}</p>
            <p className="text-xs text-white/40 mt-2">
              {currentIndex + 1} of {media.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
