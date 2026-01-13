import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-background pt-20">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gradient">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page non trouvée</p>
          <Link to="/" className="text-gold underline hover:text-gold/90">
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
