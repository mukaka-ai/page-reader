import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  return (
    <Layout>
      <SEOHead 
        title="Page Not Found" 
        description="The page you're looking for doesn't exist or has been moved."
      />
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative mb-8"
            >
              <div className="text-[150px] font-bold text-primary/10 leading-none select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileQuestion className="w-12 h-12 text-primary" />
                </div>
              </div>
            </motion.div>

            <h1 className="text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Requested: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something specific?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/classes/kids">Kids Classes</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/classes/adults">Adult Classes</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/coaches">Our Coaches</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/events">Events</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/join">Join Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
