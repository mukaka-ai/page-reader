import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Event } from "@/lib/mockData";

interface EventCardProps {
  event: Event;
}

const typeColors = {
  competition: "bg-primary text-primary-foreground",
  seminar: "bg-accent text-accent-foreground",
  workshop: "bg-secondary text-secondary-foreground",
  exam: "bg-destructive text-destructive-foreground",
};

export function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="h-full hover-lift border-0 shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className={typeColors[event.type]}>{event.type}</Badge>
        </div>
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription className="flex flex-col gap-2 mt-2">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{event.description}</p>
        {event.registrationLink && (
          <Button asChild className="w-full">
            <Link to={event.registrationLink}>Register Now</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
