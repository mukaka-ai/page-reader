import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ["home-upcoming-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_past", false)
        .order("date", { ascending: true })
        .limit(3);
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <Layout>
      <SEOHead 
        title="Nairobi Taekwondo Association" 
        description="Join Nairobi's premier Taekwondo club. Expert coaching for all ages and skill levels. Build discipline, fitness, and confidence through martial arts training."
      />
      <HeroSection />

      {/* Quick Stats Section */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Active Members", delay: 0 },
              { value: "25+", label: "Years Experience", delay: 0.1 },
              { value: "100+", label: "Championships Won", delay: 0.2 },
              { value: "15", label: "Certified Coaches", delay: 0.3 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From beginners to black belts, we have programs designed for every age and skill level.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Kids Taekwondo", desc: "Building confidence, discipline, and fitness in children ages 5-12.", link: "/classes/kids", delay: 0 },
              { icon: Users, title: "Adult Classes", desc: "Comprehensive training for adults of all skill levels, from beginners to advanced.", link: "/classes/adults", delay: 0.1 },
              { icon: Trophy, title: "Private Training", desc: "One-on-one sessions for accelerated learning and competition preparation.", link: "/classes/private", delay: 0.2 },
            ].map((program) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: program.delay }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 shadow-elegant hover-lift text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <program.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                <p className="text-muted-foreground mb-6">{program.desc}</p>
                <Link to={program.link}>
                  <Button variant="outline" className="group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Events</h2>
                <p className="text-muted-foreground">Stay updated with our latest competitions and seminars.</p>
              </div>
              <Link to="/events" className="mt-4 md:mt-0">
                <Button variant="outline" className="group">
                  View All Events
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join the Nairobi Taekwondo Association and discover the martial artist within you.
            </p>
            <Link to="/join">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90">
                Join Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
