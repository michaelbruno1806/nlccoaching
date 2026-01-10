import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage, AnimatedText } from "@/contexts/LanguageContext";
import nlcLogo from "@/assets/nlc-coaching-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash scrolling after navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    
    // Check if it's a hash link
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const targetPath = path || "/";
      
      if (location.pathname === targetPath) {
        // Same page, just scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to page, then scroll
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  const navLinks = [
    { href: "/a-propos", fr: "À propos de\nNLC Coaching", en: "About\nNLC Coaching", multiline: true },
    { href: "/formules", fr: "Les Formules", en: "Programs" },
    { href: "/#reviews", fr: "Avis Clients", en: "Client Reviews" },
    { href: "/#contact", fr: "Contact", en: "Contact" },
  ];

  const serviceLinks = [
    { href: "/suivi-personnalise", fr: "Suivi Personnalisé", en: "Personalized Coaching", price: "À partir de 150€/mois", priceEn: "From €150/month" },
    { href: "/coaching-individuel", fr: "Coaching Individuel", en: "Individual Coaching", price: "À partir de 50€/séance", priceEn: "From €50/session" },
    { href: "/small-groupes", fr: "Small Groupes", en: "Small Groups", price: "À partir de 25€/séance", priceEn: "From €25/session" },
    { href: "/carnets-seances", fr: "Carnets de Séances", en: "Session Packages", price: "Packs de 5 ou 10 séances", priceEn: "Packs of 5 or 10 sessions" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 shadow-lg shadow-black/20 border-b-2 border-gold/60 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-xl shadow-black/30 border-gold/80"
            : "bg-black"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between h-14 sm:h-20">
            <Link to="/" className="flex items-center">
            <motion.img 
                src={nlcLogo} 
                alt="NLC Coaching" 
                className="h-20 sm:h-28 md:h-36 w-auto max-w-[240px] sm:max-w-[350px] md:max-w-[450px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const text = language === 'fr' ? link.fr : link.en;
                return (
                  <motion.div key={link.href} whileHover={{ y: -2 }}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-xs font-medium text-white hover:text-gold transition-colors duration-300 uppercase tracking-wider bg-transparent border-none cursor-pointer text-center leading-tight"
                    >
                      {link.multiline ? (
                        <span className="flex flex-col">
                          <span>{text.split('\n')[0]}</span>
                          <span className="text-gold">{text.split('\n')[1]}</span>
                        </span>
                      ) : (
                        <AnimatedText fr={link.fr} en={link.en} />
                      )}
                    </button>
                  </motion.div>
                );
              })}

              <LanguageToggle />
              <Button variant="gold" size="sm" onClick={() => handleNavClick("/#contact")}>
                <AnimatedText fr="Commencer" en="Get Started" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.3 }
            }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg pt-16 sm:pt-24 md:hidden overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-col items-center gap-8 p-8"
            >
              {navLinks.map((link, index) => {
                const text = language === 'fr' ? link.fr : link.en;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ 
                      delay: 0.1 + index * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-2xl font-display text-white hover:text-gold transition-colors uppercase tracking-wider bg-transparent border-none cursor-pointer text-center"
                    >
                      {link.multiline ? (
                        <span className="flex flex-col leading-tight">
                          <span>{text.split('\n')[0]}</span>
                          <span className="text-gold">{text.split('\n')[1]}</span>
                        </span>
                      ) : (
                        <AnimatedText fr={link.fr} en={link.en} />
                      )}
                    </button>
                  </motion.div>
                );
              })}

              {/* Mobile Get Started Button */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ 
                  delay: 0.35,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex flex-col items-center gap-4 mt-4"
              >
                <LanguageToggle />
                <Button variant="gold" size="lg" onClick={() => handleNavClick("/#contact")}>
                  <AnimatedText fr="Commencer" en="Get Started" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
