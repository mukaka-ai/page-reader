import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Heart, Award } from "lucide-react"
import { BeltRanks } from "@/components/BeltRanks"

const About = () => {
  const clubs = [
    "Swiftkicks Taekwondo Club",
    "Regional Taekwondo Club",
    "KCB Taekwondo Club",
    "Kenya Power Taekwondo Club",
    "Soweto Taekwondo Club",
    "Black and White Taekwondo Club",
    "Cobras Taekwondo Club",
    "Waitha Taekwondo Club",
    "Kawangware Taekwondo Club",
    "Mathare Taekwondo Club",
    "Falcon Taekwondo Club",
    "St. Teresa's Taekwondo Club",
    "Pioneer Taekwondo Club",
    "Huruma Taekwondo Club",
    "Survivor Taekwondo Club",
    "Lions Gate Taekwondo Club",
    "Dojang Taekwondo Club",
    "Blue Tigers Taekwondo Club",
    "Kenya Police Taekwondo Club",
    "KIMA Taekwondo Club",
    "Baba Dogo Taekwondo Club",
    "Prisons Taekwondo Club",
    "GSU Taekwondo Club",
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Since 2009
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nairobi Taekwondo Association has grown to become one of the most popular associations 
              through our consistent and well-structured programs. From coaches' empowerment initiatives 
              to competitions across all levels, and hosting major national events, we have set a strong 
              foundation for excellence. Thanks to a team of dedicated coaches, our image and influence 
              now extend to the global stage.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our History</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Nairobi Taekwondo Association was established under the Societies Act of Kenya, prior to the enactment of the Sports Act 2013, under the leadership of Master Voiya as our first chairman. Together with other dedicated coaches, we successfully registered over 22 clubs in Nairobi, with close to 5,000 practitioners.
              </p>
              <p className="mb-6">
                Over the past five years, under the stewardship of our second Secretary General senior coach Aloice Ojuka, the Association has consistently conducted two seminars annually to empower our coaches and ensure they remain competitive on the global stage.
              </p>
              <p className="mb-6">
                Furthermore, Nairobi leads the country in promotional tests for both coaches and students, positioning the city as the epicentre of Taekwondo practice in East and Central Africa. Our dominance in producing athletes for previous national teams is clear evidence of the dedication and commitment of our coaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl font-semibold mb-8 text-center">Our Clubs</h3>

          {/* First Row 1–8 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            {clubs.slice(0, 8).map((club, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-primary font-semibold">{index + 1}.</span>
                <span>{club}</span>
              </div>
            ))}
          </div>

          {/* Second Row 9–16 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            {clubs.slice(8, 16).map((club, index) => (
              <div key={index + 8} className="flex items-start space-x-2">
                <span className="text-primary font-semibold">{index + 9}.</span>
                <span>{club}</span>
              </div>
            ))}
          </div>

          {/* Third Row 17–23 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {clubs.slice(16).map((club, index) => (
              <div key={index + 16} className="flex items-start space-x-2">
                <span className="text-primary font-semibold">{index + 17}.</span>
                <span>{club}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Vision */}
            <Card className="border-0 shadow-elegant hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  To be East Africa's leading Taekwondo Association, recognized for developing champions 
                  who excel not only in martial arts but as leaders and positive contributors to society. 
                  We envision a community where every individual, regardless of age or background, 
                  can discover their potential through the discipline and artistry of Taekwondo.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border-0 shadow-elegant hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  To provide world-class Taekwondo instruction that develops physical fitness, mental discipline, 
                  and moral character. We are committed to creating a safe, inclusive, and supportive environment 
                  where students of all ages can grow, learn, and achieve their personal best while building 
                  lifelong friendships and values.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              These principles guide everything we do and shape every interaction within our academy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { title: "Courtesy", description: "Respect for others and ourselves in all interactions", icon: Heart },
              { title: "Integrity", description: "Honesty and moral uprightness in all our actions", icon: Award },
              { title: "Perseverance", description: "Never giving up, even when faced with challenges", icon: Target },
              { title: "Self-Control", description: "Mastery over our emotions and reactions", icon: Eye },
              { title: "Indomitable Spirit", description: "Unbreakable will and courage to overcome obstacles", icon: Award }
            ].map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-elegant hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Belt Ranking System */}
      <BeltRanks />

      {/* Achievements */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are proud of our students' accomplishments and our contribution to Kenya's martial arts community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">National Champions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm text-muted-foreground">International Medals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-muted-foreground">Olympic Participants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Lives Transformed</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About
