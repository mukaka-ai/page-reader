import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Clock, Users, Trophy, Heart, Shield, Smile, Star, Target } from "lucide-react"

const KidsClasses = () => {
  const ageGroups = [
    { age: "3-11 Years", name: "Peewees", focus: "Basic movements, coordination, fun games" },
    { age: "12-14 Years", name: "Cadet", focus: "Fundamental techniques, discipline, teamwork" },
    { age: "15-17 Years", name: "Junior Athletes", focus: "Advanced skills, sparring, competition prep" }
  ]

  const benefits = [
    { icon: Heart, title: "Character Building", description: "Develop respect, courtesy, and moral values" },
    { icon: Shield, title: "Anti-Bullying", description: "Build confidence and learn peaceful conflict resolution" },
    { icon: Target, title: "Focus & Discipline", description: "Improve concentration and self-control" },
    { icon: Smile, title: "Fun & Fitness", description: "Exercise through engaging games and activities" },
    { icon: Star, title: "Goal Achievement", description: "Progress through belt ranks and celebrate success" },
    { icon: Trophy, title: "Competition Ready", description: "Opportunities to compete at local and national levels" }
  ]

  const schedule = [
    { day: "Monday", time: "4:00 PM - 5:00 PM", group: "Little Dragons (4-6)" },
    { day: "Monday", time: "5:15 PM - 6:15 PM", group: "Young Warriors (7-9)" },
    { day: "Wednesday", time: "4:00 PM - 5:00 PM", group: "Junior Athletes (10-12)" },
    { day: "Friday", time: "4:30 PM - 5:30 PM", group: "All Ages (Mixed)" },
    { day: "Saturday", time: "9:00 AM - 10:00 AM", group: "Little Dragons (4-6)" },
    { day: "Saturday", time: "10:15 AM - 11:15 AM", group: "Advanced Kids (8-12)" }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🥋 Ages 3-17
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">TKD Kids Program</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Building tomorrow's leaders through martial arts. Our kids program focuses on character development, 
              physical fitness, and life skills in a fun, safe, and supportive environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/join">Book Free Trial Class</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/coaches">Meet Our Instructors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Age-Appropriate Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each age group has specially designed curriculum that matches their developmental stage and abilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ageGroups.map((group, index) => (
              <Card key={index} className="border-0 shadow-elegant hover-lift text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                    {group.age.split('-')[0]}+
                  </div>
                  <CardTitle className="text-xl">{group.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto">{group.age}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {group.focus}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Kids Love Our Program</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Beyond martial arts techniques, our program develops essential life skills that benefit children 
              in school, at home, and in their future endeavors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-elegant hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Class Schedule</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible scheduling options to fit your family's busy lifestyle. All classes are held at our 
              main training facility in Nairobi CBD.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule.map((session, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary text-primary-foreground">{session.day}</Badge>
                      <span className="font-medium">{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{session.group}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Child's Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Give your child the gift of confidence, discipline, and martial arts skills. 
              Book a free trial class today and see the difference!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link to="/join">Book Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
                <Link to="/gallery">Watch Training Videos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default KidsClasses
