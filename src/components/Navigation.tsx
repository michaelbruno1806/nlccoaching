import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useLanguage, AnimatedText } from "@/contexts/LanguageContext";
import nlcLogo from "@/assets/nlc-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", fr: "À Propos", en: "About" },
    { href: "#philosophy", fr: "Philosophie", en: "Philosophy" },
    { href: "#services", fr: "Services", en: "Services" },
    { href: "#contact", fr: "Contact", en: "Contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-border"
            : "bg-black"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center">
              <motion.img 
                src={nlcLogo} 
                alt="NLC Coaching" 
                className="h-12 md:h-16 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-300 uppercase tracking-wider"
                  whileHover={{ y: -2 }}
                >
                  <AnimatedText fr={link.fr} en={link.en} />
                </motion.a>
              ))}
              <LanguageToggle />
              <Button variant="gold" size="sm">
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
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ 
                    delay: 0.1 + index * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-xl font-display text-foreground hover:text-gold transition-colors uppercase tracking-wider"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <AnimatedText fr={link.fr} en={link.en} />
                </motion.a>
              ))}
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
                <Button variant="gold" size="lg">
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
