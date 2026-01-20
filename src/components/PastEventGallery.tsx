import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

const pastEvents = [
  {
    title: "National Championship 2023",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600",
    medals: "15 Gold, 12 Silver, 8 Bronze",
  },
  {
    title: "Inter-School Tournament",
    image: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=600",
    medals: "8 Gold, 5 Silver, 10 Bronze",
  },
  {
    title: "East African Games",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600",
    medals: "3 Gold, 4 Silver, 2 Bronze",
  },
];

export function PastEventGallery() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Past Highlights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Celebrating our students' success at recent competitions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pastEvents.map((event, index) => (
            <Card key={index} className="overflow-hidden group hover-lift border-0 shadow-elegant">
              <div className="aspect-video overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <Badge variant="outline" className="text-xs">
                  🏅 {event.medals}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
