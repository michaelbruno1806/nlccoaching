import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage, AnimatedText } from "@/contexts/LanguageContext";
import nlcLogo from "@/assets/nlc-logo-final.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { t } = useLanguage();
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
    { href: "/a-propos", fr: "À Propos", en: "About" },
    { href: "/parcours", fr: "Parcours", en: "Journey" },
    { href: "/formules", fr: "Formules", en: "Programs" },
    { href: "/#contact", fr: "Contact", en: "Contact" },
  ];

  const serviceLinks = [
    { href: "/suivi-personnalise", fr: "Suivi Personnalisé", en: "Personalized Coaching" },
    { href: "/coaching-individuel", fr: "Coaching Individuel", en: "Individual Coaching" },
    { href: "/small-groupes", fr: "Small Groupes", en: "Small Groups" },
    { href: "/carnets-seances", fr: "Carnets de Séances", en: "Session Packages" },
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
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <motion.img 
                src={nlcLogo} 
                alt="NLC Coaching" 
                className="h-10 md:h-12 w-auto max-w-[160px] md:max-w-[200px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.div key={link.href} whileHover={{ y: -2 }}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-300 uppercase tracking-wider bg-transparent border-none cursor-pointer"
                  >
                    <AnimatedText fr={link.fr} en={link.en} />
                  </button>
                </motion.div>
              ))}

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-300 uppercase tracking-wider bg-transparent border-none cursor-pointer"
                >
                  <AnimatedText fr="Services" en="Services" />
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                  />
                </motion.button>
                
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-black/95 backdrop-blur-md border border-gold/30 rounded-lg shadow-xl shadow-black/30 overflow-hidden z-50"
                    >
                      {serviceLinks.map((service, index) => (
                        <motion.button
                          key={service.href}
                          onClick={() => handleNavClick(service.href)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-gold hover:bg-gold/10 transition-colors duration-200 border-b border-gold/10 last:border-b-0 bg-transparent cursor-pointer"
                        >
                          <AnimatedText fr={service.fr} en={service.en} />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg pt-24 md:hidden overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-col items-center gap-8 p-8"
            >
              {navLinks.map((link, index) => (
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
                    className="text-xl font-display text-foreground hover:text-gold transition-colors uppercase tracking-wider bg-transparent border-none cursor-pointer"
                  >
                    <AnimatedText fr={link.fr} en={link.en} />
                  </button>
                </motion.div>
              ))}

              {/* Mobile Services Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ 
                  delay: 0.1 + navLinks.length * 0.08,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xl font-display text-gold uppercase tracking-wider">
                  <AnimatedText fr="Services" en="Services" />
                </span>
                <div className="flex flex-col items-center gap-3 mt-2">
                  {serviceLinks.map((service, index) => (
                    <motion.button
                      key={service.href}
                      onClick={() => handleNavClick(service.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="text-base text-muted-foreground hover:text-gold transition-colors bg-transparent border-none cursor-pointer"
                    >
                      <AnimatedText fr={service.fr} en={service.en} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
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
