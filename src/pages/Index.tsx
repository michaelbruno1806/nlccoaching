import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PhilosophySection from "@/components/PhilosophySection";
import CoachSection from "@/components/CoachSection";
import ServicesSection from "@/components/ServicesSection";

import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatAssistant from "@/components/ChatAssistant";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Coach Sportif & Préparateur Physique à Lille, Wasquehal"
        description="NLC Coaching - Coach sportif et préparateur physique dans la métropole lilloise. Suivi personnalisé, coaching individuel, small groups. Transformez votre corps avec Noa Liam Politino."
        keywords="coach sportif Lille, préparateur physique Wasquehal, coaching personnalisé, musculation Lille, personal trainer métropole lilloise, coaching individuel, small groups, perte de poids"
      />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <CoachSection />
      <ServicesSection />
      
      <ReviewsSection />
      <ContactSection />
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber="33616224037" 
        message="Bonjour, j'étais sur votre site internet. Je suis intéressé(e) par vos services de coaching !"
      />
      
      {/* AI Chat Assistant */}
      <ChatAssistant />
    </main>
  );
};

export default Index;
