import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Clock, Star, Target, Zap, User, Trophy } from "lucide-react"

const PrivateClasses = () => {
  const benefits = [
    { icon: User, title: "Individual Attention", description: "100% focused coaching tailored to your unique needs and goals" },
    { icon: Target, title: "Personalized Goals", description: "Custom training plans designed around your specific objectives" },
    { icon: Clock, title: "Flexible Scheduling", description: "Train when it's convenient for you, including evenings and weekends" },
    { icon: Zap, title: "Accelerated Progress", description: "Learn faster with dedicated instruction and immediate corrections" },
    { icon: Trophy, title: "Competition Prep", description: "Specialized training for tournaments and belt examinations" },
    { icon: Star, title: "Master Level Instruction", description: "Learn from our most experienced black belt instructors" }
  ]

  const idealFor = [
    "Beginners who want to build a strong foundation",
    "Busy professionals with irregular schedules", 
    "Athletes preparing for competitions",
    "Students working toward belt advancement",
    "Anyone wanting to learn at their own pace",
    "Those needing specialized technique work"
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
              🎯 1-on-1 Training
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Private Taekwondo Coaching</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Experience the ultimate in personalized martial arts instruction. Our private coaching offers 
              individualized attention, custom training plans, and accelerated progress toward your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link to="/join">Book Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/coaches">Choose Your Instructor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Choose Private Training?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Private lessons offer unmatched personalization and efficiency, making them perfect for 
              serious students and busy professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-elegant hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-secondary" />
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

      {/* Ideal For */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Perfect For</h2>
              <p className="text-lg text-muted-foreground">
                Private training is ideal for a wide range of students with different needs and goals.
              </p>
            </div>

            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Who Benefits Most from Private Training?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {idealFor.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Consultation", description: "Free 15-minute assessment to discuss your goals and needs" },
              { step: "2", title: "Match Instructor", description: "We pair you with the perfect coach based on your objectives" },
              { step: "3", title: "Schedule", description: "Book sessions at times that work with your busy schedule" },
              { step: "4", title: "Train & Progress", description: "Begin your personalized training journey with expert guidance" }
            ].map((process, index) => (
              <Card key={index} className="text-center border-0 shadow-elegant hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <CardTitle className="text-lg">{process.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {process.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary via-muted-foreground to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Personal Training Journey
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Experience the difference personalized instruction makes. Book your free consultation 
              today and discover how private training can accelerate your martial arts journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-secondary hover:bg-white/90">
                <Link to="/join">Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
                <Link to="/coaches">View All Instructors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default PrivateClasses
