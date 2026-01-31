import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldX, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const AccessDenied = () => {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <ShieldX className="w-12 h-12 text-destructive" />
            </motion.div>

            <h1 className="text-4xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, you don't have permission to access this page. This area is restricted to administrators only.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
                <span className="cursor-pointer" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AccessDenied;
