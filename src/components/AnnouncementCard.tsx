import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, Info } from "lucide-react";
import type { Announcement } from "@/lib/mockData";

interface AnnouncementCardProps {
  announcement: Announcement;
}

const priorityConfig = {
  high: {
    icon: AlertCircle,
    color: "bg-destructive text-destructive-foreground",
    borderColor: "border-l-4 border-l-destructive",
  },
  medium: {
    icon: Bell,
    color: "bg-accent text-accent-foreground",
    borderColor: "border-l-4 border-l-accent",
  },
  low: {
    icon: Info,
    color: "bg-muted text-muted-foreground",
    borderColor: "border-l-4 border-l-muted-foreground",
  },
};

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const config = priorityConfig[announcement.priority];
  const Icon = config.icon;
  
  const formattedDate = new Date(announcement.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className={`h-full ${config.borderColor} border-0 shadow-elegant hover-lift`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className={config.color}>
            <Icon className="h-3 w-3 mr-1" />
            {announcement.priority}
          </Badge>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
        <CardTitle className="text-lg mt-2">{announcement.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{announcement.content}</CardDescription>
      </CardContent>
    </Card>
  );
}
