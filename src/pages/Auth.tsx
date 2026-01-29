import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  // Load Visme forms script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div
            className="visme_d"
            data-title="Workshop Registration Form"
            data-url="7vgogkkw-workshop-registration-form?fullPage=true"
            data-domain="forms"
            data-full-page="true"
            data-min-height="100vh"
            data-form-id="162818"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
