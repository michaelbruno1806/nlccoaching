import { motion } from "framer-motion";
import { ArrowLeft, Check, Star, User, Target, Clock, Shield, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import serviceIndividual from "@/assets/service-individual.jpg";
import transformation1 from "@/assets/transformation-1.png";
import transformation2 from "@/assets/transformation-2.png";
import transformation3 from "@/assets/transformation-3.png";
import transformation4 from "@/assets/transformation-4.png";

const CoachingIndividuel = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  const objectives = [
    { id: "perte", label: isFrench ? "Perte de poids" : "Weight loss" },
    { id: "remise", label: isFrench ? "Remise en forme" : "Fitness" },
    { id: "muscle", label: isFrench ? "Développement musculaire" : "Muscle building" },
    { id: "force", label: isFrench ? "Amélioration de la force" : "Strength improvement" },
    { id: "reath", label: isFrench ? "Réathlétisation" : "Reathlétisation" },
  ];

  const profiles = [
    { id: "particulier", label: isFrench ? "Particulier" : "Individual" },
    { id: "sportif", label: isFrench ? "Sportif" : "Athlete" },
    { id: "professionnel", label: isFrench ? "Professionnel" : "Professional" },
    { id: "entreprise", label: isFrench ? "Entreprise" : "Company" },
    { id: "etudiant", label: isFrench ? "Étudiant" : "Student" },
    { id: "autre", label: isFrench ? "Autre" : "Other" },
  ];

  const benefits = [
    {
      icon: User,
      title: isFrench ? "100% Personnalisé" : "100% Personalized",
      description: isFrench 
        ? "Chaque séance est construite sur mesure selon ton objectif, ton niveau et ton état du moment."
        : "Each session is tailor-made based on your goal, level and current state."
    },
    {
      icon: Target,
      title: isFrench ? "Résultats Concrets" : "Concrete Results",
      description: isFrench 
        ? "Progresser plus vite, comprendre ton corps et dépasser tes limites en toute sécurité."
        : "Progress faster, understand your body and push your limits safely."
    },
    {
      icon: Clock,
      title: isFrench ? "Suivi Précis" : "Precise Tracking",
      description: isFrench 
        ? "Je suis à tes côtés du début à la fin pour te guider, te corriger et te pousser."
        : "I'm by your side from start to finish to guide, correct and push you."
    },
    {
      icon: Shield,
      title: isFrench ? "En Toute Sécurité" : "Complete Safety",
      description: isFrench 
        ? "Progresser tout en respectant ton rythme et tes capacités."
        : "Progress while respecting your pace and abilities."
    },
  ];

  const transformations = [transformation1, transformation2, transformation3, transformation4];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={serviceIndividual}
            alt="Coaching Individuel"
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
              Coaching
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient">COACHING</span>
              <br />
              <span className="text-foreground/90">INDIVIDUEL</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8"
            >
              {isFrench
                ? "Transforme ta performance avec une démarche claire, mesurable et personnalisée."
                : "Transform your performance with a clear, measurable and personalized approach."}
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
                <span className="text-5xl font-bold text-foreground">50</span>
                <span className="text-xl text-muted-foreground">€ / {isFrench ? "séance" : "session"}</span>
              </div>
              <div className="text-xs text-muted-foreground/70 mt-1">{isFrench ? "(conditions applicables)" : "(conditions apply)"}</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {isFrench ? "L'ACCOMPAGNEMENT LE PLUS" : "THE MOST"}
                <br />
                <span className="text-gradient">{isFrench ? "COMPLET & PERSONNALISÉ" : "COMPLETE & PERSONALIZED"}</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {isFrench
                    ? "Le coaching individuel, c'est l'accompagnement le plus complet et le plus personnalisé que je propose."
                    : "Individual coaching is the most complete and personalized support I offer."}
                </p>
                <p>
                  {isFrench
                    ? "Chaque séance est construite sur mesure selon ton objectif, ton niveau et ton état du moment. Je suis à tes côtés du début à la fin pour te guider, te corriger et te pousser à donner le meilleur de toi-même, en toute sécurité."
                    : "Each session is tailor-made according to your goal, your level and your current state. I'm by your side from start to finish to guide you, correct you and push you to give your best, safely."}
                </p>
                <p>
                  {isFrench
                    ? "L'objectif : t'aider à progresser plus vite, à comprendre ton corps et à dépasser tes limites tout en respectant ton rythme."
                    : "The goal: help you progress faster, understand your body and push your limits while respecting your pace."}
                </p>
                <p>
                  {isFrench
                    ? "Que tu sois débutant(e) ou déjà expérimenté(e), le coaching individuel te permet de bénéficier d'un suivi précis, d'une attention totale et de résultats concrets séance après séance."
                    : "Whether you're a beginner or already experienced, individual coaching gives you precise follow-up, total attention and concrete results session after session."}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-card/50 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isFrench ? "COMMENCER MAINTENANT" : "START NOW"}
              </h2>
              <p className="text-muted-foreground">
                {isFrench
                  ? "Remplis le formulaire ci-dessous pour démarrer ton coaching individuel"
                  : "Fill out the form below to start your individual coaching"}
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(
                  "https://wa.me/23058035450?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%28e%29%20par%20le%20Coaching%20Individuel%20et%20j%E2%80%99aimerais%20avoir%20plus%20d%E2%80%99informations.",
                  "_blank"
                );
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{isFrench ? "Nom" : "Name"}</label>
                  <Input placeholder={isFrench ? "Votre nom" : "Your name"} className="bg-background" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <Input type="email" placeholder="email@example.com" className="bg-background" />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">{isFrench ? "Téléphone" : "Phone"}</label>
                <Input placeholder="+33 6 12 34 56 78" className="bg-background" />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-3 block">{isFrench ? "Objectifs" : "Goals"}</label>
                <div className="flex flex-wrap gap-2">
                  {objectives.map((obj) => (
                    <label
                      key={obj.id}
                      className="flex items-center gap-2 bg-background border border-border/50 rounded-lg px-4 py-2 cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <Checkbox id={obj.id} />
                      <span className="text-sm">{obj.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-3 block">{isFrench ? "Qui êtes-vous" : "Who are you"}</label>
                <div className="flex flex-wrap gap-2">
                  {profiles.map((profile) => (
                    <label
                      key={profile.id}
                      className="flex items-center gap-2 bg-background border border-border/50 rounded-lg px-4 py-2 cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <Checkbox id={profile.id} />
                      <span className="text-sm">{profile.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                <Textarea 
                  placeholder={isFrench ? "Parlez-nous de vos objectifs..." : "Tell us about your goals..."} 
                  className="bg-background min-h-[120px]"
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  {isFrench ? "J'accepte les conditions" : "I accept the terms"}
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" size="lg" className="flex-1">
                  {isFrench ? "Envoyer" : "Send"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={() => window.open(
                    "https://wa.me/23058035450?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%28e%29%20par%20le%20Coaching%20Individuel%20et%20j%E2%80%99aimerais%20avoir%20plus%20d%E2%80%99informations.",
                    "_blank"
                  )}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Testimonials/Transformations */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "OPTIMISE TON PARCOURS DE" : "OPTIMIZE YOUR"}
              <br />
              <span className="text-gradient">PERFORMANCE</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isFrench
                ? "Nos clients partagent leur expérience, leur progression et la transformation qu'ils ont vécue à nos côtés."
                : "Our clients share their experience, progress and the transformation they experienced with us."}
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
            {[...transformations, ...transformations].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 md:w-80 snap-center"
              >
                <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                  <img
                    src={img}
                    alt={`Transformation ${(index % 4) + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-gold/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Star className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {isFrench ? "PRÊT À COMMENCER ?" : "READY TO START?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {isFrench
                ? "Rejoins-nous et commence ta transformation dès aujourd'hui."
                : "Join us and start your transformation today."}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="text-lg px-8 py-6">
                  {isFrench ? "Réserver une séance" : "Book a session"}
                </Button>
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/formules">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    {isFrench ? "Voir les formules" : "View packages"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CoachingIndividuel;
