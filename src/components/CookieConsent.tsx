import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const isFrench = language === "fr";

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay before showing the banner
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      functional: true,
      statistics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      functional: true,
      statistics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 pr-6 md:pr-0">
                  <h3 className="font-display font-bold text-foreground mb-2">
                    {isFrench ? "Nous utilisons des cookies 🍪" : "We use cookies 🍪"}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isFrench
                      ? "Ce site utilise des cookies pour améliorer votre expérience. Les cookies fonctionnels sont essentiels, tandis que les cookies statistiques et marketing sont optionnels."
                      : "This site uses cookies to improve your experience. Functional cookies are essential, while statistics and marketing cookies are optional."}
                    {" "}
                    <Link
                      to="/rgpd-cookies"
                      className="text-primary hover:underline font-medium"
                    >
                      {isFrench ? "En savoir plus" : "Learn more"}
                    </Link>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAcceptEssential}
                    className="whitespace-nowrap"
                  >
                    {isFrench ? "Essentiels uniquement" : "Essential only"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="whitespace-nowrap"
                  >
                    {isFrench ? "Tout accepter" : "Accept all"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
