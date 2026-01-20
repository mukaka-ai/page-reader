import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">🥋 Nairobi TKD</h3>
            <p className="text-sm text-secondary-foreground/80">
              Building champions in martial arts and life since 2009. Join Kenya's
              premier Taekwondo academy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/classes/kids" className="hover:text-primary transition-colors">
                  Kids Program
                </Link>
              </li>
              <li>
                <Link to="/classes/adults" className="hover:text-primary transition-colors">
                  Adult Classes
                </Link>
              </li>
              <li>
                <Link to="/coaches" className="hover:text-primary transition-colors">
                  Our Coaches
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="font-semibold">Programs</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <Link to="/events" className="hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/classes/private" className="hover:text-primary transition-colors">
                  Private Lessons
                </Link>
              </li>
              <li>
                <Link to="/join" className="hover:text-primary transition-colors">
                  Join Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Nairobi CBD, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@nairobitkd.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>© {new Date().getFullYear()} Nairobi Taekwondo Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
