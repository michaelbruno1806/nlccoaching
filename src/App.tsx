import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerFeedback from "./pages/CustomerFeedback";
import Formules from "./pages/Formules";
import SuiviPersonnalise from "./pages/SuiviPersonnalise";
import CoachingIndividuel from "./pages/CoachingIndividuel";
import SmallGroupes from "./pages/SmallGroupes";
import CarnetsSeances from "./pages/CarnetsSeances";
import MentionsLegales from "./pages/MentionsLegales";
import RgpdCookies from "./pages/RgpdCookies";
import ConditionsVente from "./pages/ConditionsVente";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";
import CookieConsent from "./components/CookieConsent";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./hooks/useAuth";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import APropos from "./pages/APropos";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/a-propos" element={<PageTransition><APropos /></PageTransition>} />
        <Route path="/feedback" element={<PageTransition><CustomerFeedback /></PageTransition>} />
        <Route path="/formules" element={<PageTransition><Formules /></PageTransition>} />
        <Route path="/suivi-personnalise" element={<PageTransition><SuiviPersonnalise /></PageTransition>} />
        <Route path="/coaching-individuel" element={<PageTransition><CoachingIndividuel /></PageTransition>} />
        <Route path="/small-groupes" element={<PageTransition><SmallGroupes /></PageTransition>} />
        <Route path="/carnets-seances" element={<PageTransition><CarnetsSeances /></PageTransition>} />
        <Route path="/mentions-legales" element={<PageTransition><MentionsLegales /></PageTransition>} />
        <Route path="/rgpd-cookies" element={<PageTransition><RgpdCookies /></PageTransition>} />
        <Route path="/conditions-vente" element={<PageTransition><ConditionsVente /></PageTransition>} />
        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure loading screen exit animation starts first
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <LoadingScreen isVisible={isLoading} onComplete={handleLoadingComplete} />
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                  }}
                >
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <AnimatedRoutes />
                    <CookieConsent />
                  </BrowserRouter>
                </motion.div>
              )}
            </AnimatePresence>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
