import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Award, Star, Users, Trophy, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Coaches = () => {
  const [openCoaches, setOpenCoaches] = useState<string[]>([]);

  const toggleCoach = (coachId: string) => {
    setOpenCoaches((prev) =>
      prev.includes(coachId)
        ? prev.filter((id) => id !== coachId)
        : [...prev, coachId]
    );
  };

  const { data: coaches = [], isLoading } = useQuery({
    queryKey: ["public-coaches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coaches")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const stats = [
    { number: "25+", label: "Expert Instructors", icon: Users },
    { number: "150+", label: "Black Belts Awarded", icon: Award },
    { number: "50+", label: "Competition Medals", icon: Trophy },
    { number: "15+", label: "Years Experience", icon: Star },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              🥋 World-Class Instruction
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Masters & Instructors
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Train with Kenya's most accomplished Taekwondo masters. Our
              instructors combine decades of experience with passion for
              teaching, ensuring every student reaches their potential.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/join">Start Training Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-elegant hover-lift"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent">
                    {stat.number}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Directory */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Coaching Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any coach to see their achievements and notable students.
            </p>
          </div>

          {isLoading ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : coaches.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No coaches added yet.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {coaches.map((coach, idx) => (
                <motion.div
                  key={coach.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Collapsible
                    open={openCoaches.includes(coach.id)}
                    onOpenChange={() => toggleCoach(coach.id)}
                  >
                    <Card className="border-0 shadow-elegant overflow-hidden hover-lift">
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-smooth">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                                {coach.image_url ? (
                                  <AvatarImage
                                    src={coach.image_url}
                                    alt={coach.name}
                                  />
                                ) : null}
                                <AvatarFallback className="bg-accent text-accent-foreground text-lg font-bold">
                                  {coach.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-left">
                                <CardTitle className="text-xl">
                                  {coach.name}
                                </CardTitle>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge className="belt-red">
                                    {coach.rank}
                                  </Badge>
                                  {coach.experience && (
                                    <Badge variant="outline">
                                      {coach.experience}
                                    </Badge>
                                  )}
                                </div>
                                {coach.bio && (
                                  <CardDescription className="mt-2 line-clamp-2">
                                    {coach.bio}
                                  </CardDescription>
                                )}
                              </div>
                            </div>
                            <motion.div
                              animate={{
                                rotate: openCoaches.includes(coach.id)
                                  ? 180
                                  : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <AnimatePresence>
                        {openCoaches.includes(coach.id) && (
                          <CollapsibleContent forceMount>
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CardContent className="pt-0">
                                <div className="grid md:grid-cols-2 gap-8">
                                  {/* Specializations */}
                                  {coach.specialization &&
                                    coach.specialization.length > 0 && (
                                      <div>
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                          <Star className="w-4 h-4 text-accent" />
                                          Specializations
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                          {coach.specialization.map(
                                            (spec, i) => (
                                              <Badge
                                                key={i}
                                                variant="outline"
                                              >
                                                {spec}
                                              </Badge>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}

                                  {/* Achievements */}
                                  {coach.achievements &&
                                    coach.achievements.length > 0 && (
                                      <div>
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                          <Trophy className="w-4 h-4 text-accent" />
                                          Achievements
                                        </h4>
                                        <div className="space-y-2">
                                          {coach.achievements.map(
                                            (achievement, i) => (
                                              <div
                                                key={i}
                                                className="flex items-start gap-2"
                                              >
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-sm">
                                                  {achievement}
                                                </span>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}

                                  {/* Notable Students */}
                                  {coach.students &&
                                    coach.students.length > 0 && (
                                      <div>
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                          <Users className="w-4 h-4 text-accent" />
                                          Notable Students
                                        </h4>
                                        <div className="space-y-2">
                                          {coach.students.map((student, i) => (
                                            <div
                                              key={i}
                                              className="flex items-start gap-2"
                                            >
                                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                              <span className="text-sm">
                                                {student}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </CardContent>
                            </motion.div>
                          </CollapsibleContent>
                        )}
                      </AnimatePresence>
                    </Card>
                  </Collapsible>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 accent-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-6">
              Train With the Best
            </h2>
            <p className="text-xl text-accent-foreground/90 mb-8">
              Our world-class instructors are ready to guide your martial arts
              journey. Join our academy and learn from Kenya's most accomplished
              masters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link to="/join">Begin Your Training</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-accent-foreground hover:bg-accent-foreground/10"
              >
                <Link to="/classes/private">Private Lessons</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Coaches;
