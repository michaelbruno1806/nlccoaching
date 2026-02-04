import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatAssistant from "@/components/ChatAssistant";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Contact | NLC Coaching"
        description="Contactez NLC Coaching pour un coaching sportif personnalisé à Lille, Wasquehal. Démarrez votre transformation dès aujourd'hui."
        keywords="contact coach sportif Lille, coaching personnalisé, réservation séance, NLC Coaching contact"
      />
      <Navigation />
      <div className="pt-20 sm:pt-28">
        <ContactSection />
      </div>
      <Footer />
      
      <WhatsAppButton 
        phoneNumber="33616224037" 
        message="Bonjour, j'étais sur votre site internet. Je suis intéressé(e) par vos services de coaching NLC!"
      />
      <ChatAssistant />
    </main>
  );
};

export default Contact;
