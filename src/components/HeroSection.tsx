import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/landing-hero.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Taekwondo training session"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-accent/20 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-accent/30 rounded-full animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <Badge className="mb-6 px-4 py-2 text-sm bg-accent/20 text-accent border-accent/30 backdrop-blur-sm">
            🥋 Nairobi Taekwondo Association
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Strength • Discipline • Respect
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Nairobi's most respected Taekwondo association. Master the art of self-defense,
            build unshakeable discipline, and become part of a community dedicated to excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {/* Events & Announcements Button */}
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full"
            >
              <Link to="/events">
                📰 Events & Announcements
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full"
            >
              <Link to="/classes/adults">
                See Classes
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full"
            >
              <Link to="/coaches">
                Meet Coaches
              </Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-3xl md:text-4xl font-bold text-accent">500+</p>
              <p className="text-sm text-white/70">Active Members</p>
            </div>

            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-3xl md:text-4xl font-bold text-accent">25+</p>
              <p className="text-sm text-white/70">Expert Coaches</p>
            </div>

            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-3xl md:text-4xl font-bold text-accent">15+</p>
              <p className="text-sm text-white/70">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
