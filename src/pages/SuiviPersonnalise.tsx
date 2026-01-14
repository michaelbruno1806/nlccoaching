import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import BookingFormSection from "@/components/BookingFormSection";
import ClientMessages from "@/components/ClientMessages";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import serviceProgram from "@/assets/service-program.jpg";
import transformation1 from "@/assets/transformation-1.png";
import transformation2 from "@/assets/transformation-2.png";
import transformation3 from "@/assets/transformation-3.png";
import transformation4 from "@/assets/transformation-4.png";

const SuiviPersonnalise = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  const features = isFrench
    ? [
        "Suivi en distanciel 100% adapté à ton rythme",
        "Échanges hebdomadaires pour ajuster ton évolution",
        "Suivi et motivation constante",
        "Des résultats concrets et durables",
        "Corrections vidéo personnalisées",
        "Programme nutritionnel adapté",
      ]
    : [
        "100% remote follow-up adapted to your rhythm",
        "Weekly exchanges to adjust your progress",
        "Constant follow-up and motivation",
        "Concrete and lasting results",
        "Personalized video corrections",
        "Adapted nutritional program",
      ];

  const transformations = [transformation1, transformation2, transformation3, transformation4];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={serviceProgram}
            alt="Suivi Personnalisé"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        </div>

        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Link to="/formules">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4" />
                {isFrench ? "Retour aux formules" : "Back to packages"}
              </Button>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-primary uppercase tracking-[0.4em] text-sm font-medium mb-6"
            >
              Suivi
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient">SUIVI</span>
              <br />
              <span className="text-foreground/90">PERSONNALISÉ</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8"
            >
              {isFrench
                ? "Choisissez le suivi et le programme qui vous transformera et vous aidera à atteindre vos objectifs personnels et professionnels."
                : "Choose the follow-up and program that will transform you and help you achieve your personal and professional goals."}
            </motion.p>

            {/* Pricing Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="inline-block bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
            >
              <div className="text-sm text-muted-foreground mb-1">{isFrench ? "à partir de" : "starting at"}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gold">100</span>
                <span className="text-xl text-muted-foreground">€ / {isFrench ? "mois" : "month"}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {isFrench ? "Un accompagnement sur mesure" : "Tailored support"}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {isFrench
                    ? "Le suivi personnalisé n'est pas un simple programme à distance."
                    : "Personalized follow-up is not just a remote program."}
                </p>
                <p>
                  {isFrench
                    ? "Je t'accompagne étape par étape avec un plan adapté à ton niveau, à ton emploi du temps et à tes objectifs. Chaque semaine, on échange sur tes retours, tes vidéos et tes progrès afin d'ajuster ensemble ton évolution."
                    : "I guide you step by step with a plan adapted to your level, schedule, and goals. Every week, we discuss your feedback, videos, and progress to adjust your evolution together."}
                </p>
                <p>
                  {isFrench
                    ? "Mon rôle, c'est d'être présent du début à la fin, même à distance : te guider, te motiver, te corriger et t'aider à rester constant."
                    : "My role is to be present from start to finish, even remotely: guiding you, motivating you, correcting you, and helping you stay consistent."}
                </p>
                <p>
                  {isFrench
                    ? "Ce suivi te permet d'avancer en confiance, d'éviter les erreurs et d'obtenir des résultats réels et durables quel que soit ton point de départ."
                    : "This follow-up allows you to move forward with confidence, avoid mistakes, and achieve real and lasting results regardless of your starting point."}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-card border border-border/50 rounded-2xl p-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  {isFrench ? "Ce qui est inclus" : "What's included"}
                </h3>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <BookingFormSection serviceName={isFrench ? "le Suivi Personnalisé" : "Personalized Follow-up"} />

      {/* Client Messages Section */}
      <ClientMessages />

      {/* Transformations Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "OPTIMISE TON PARCOURS DE PERFORMANCE" : "OPTIMIZE YOUR PERFORMANCE JOURNEY"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isFrench
                ? "Nos clients partagent leur expérience, leur progression et la transformation qu'ils ont vécue à nos côtés."
                : "Our clients share their experience, progress, and the transformation they experienced with us."}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {transformations.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Transformation ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/feedback">
              <Button variant="outline" size="lg">
                {isFrench ? "Voir tous les témoignages" : "View all testimonials"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
    </>
  );
};

export default SuiviPersonnalise;
