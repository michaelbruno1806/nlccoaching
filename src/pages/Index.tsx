import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PhilosophySection from "@/components/PhilosophySection";
import CoachSection from "@/components/CoachSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <CoachSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber="33612345678" 
        message="Bonjour! Je suis intéressé(e) par vos services de coaching NLC."
      />
    </main>
  );
};

export default Index;
