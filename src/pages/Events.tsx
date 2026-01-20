import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { PastEventGallery } from "@/components/PastEventGallery";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Megaphone, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { mockEvents, mockAnnouncements, type Event, type Announcement } from "@/lib/mockData";

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setUpcomingEvents(mockEvents);
      setAnnouncements(mockAnnouncements);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Stay Updated</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Events & Announcements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
          >
            Join us for competitions, workshops, and community events
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full text-base"
              asChild
            >
              <Link to="/join">Register for Events</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Megaphone className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Latest Updates</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Announcements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed about important updates and news
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AnnouncementCard announcement={announcement} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't miss these exciting opportunities to train and compete
            </p>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <Skeleton className="h-10 w-32" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events Gallery */}
      <PastEventGallery />

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Participate?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join us at our next event and be part of our growing Taekwondo community
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild className="rounded-full">
                <Link to="/join">Register Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full">
                <Link to="/classes/kids">View Classes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;
