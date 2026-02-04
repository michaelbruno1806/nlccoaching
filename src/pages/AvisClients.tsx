import Navigation from "@/components/Navigation";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatAssistant from "@/components/ChatAssistant";
import SEOHead from "@/components/SEOHead";

const AvisClients = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Avis Clients | NLC Coaching"
        description="Découvrez les témoignages et transformations de nos clients. Coach sportif à Lille, Wasquehal - résultats prouvés."
        keywords="avis clients coach sportif, témoignages coaching, transformations fitness, résultats musculation Lille"
      />
      <Navigation />
      <div className="pt-20 sm:pt-28">
        <ReviewsSection />
      </div>
      <Footer />
      
      <WhatsAppButton 
        phoneNumber="33616224037" 
        message="Bonjour, j'étais sur votre site internet. Je suis intéressé(e) par vos services de coaching !"
      />
      <ChatAssistant />
    </main>
  );
};

export default AvisClients;
