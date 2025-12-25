import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Calendar, Clock, CreditCard, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import BookingFormSection from "@/components/BookingFormSection";
import serviceCarnets from "@/assets/service-carnets.jpg";
import transformation1 from "@/assets/transformation-1.png";
import transformation2 from "@/assets/transformation-2.png";
import transformation3 from "@/assets/transformation-3.png";
import transformation4 from "@/assets/transformation-4.png";

const CarnetsSeances = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  const packages = [
    {
      sessions: 5,
      price: 250,
      validity: isFrench ? "2 mois" : "2 months",
      description: isFrench 
        ? "Pour une remise en route ou un accompagnement court"
        : "For a restart or short-term support",
      pricePerSession: 50,
    },
    {
      sessions: 10,
      price: 500,
      validity: isFrench ? "3 mois" : "3 months",
      description: isFrench 
        ? "Pour progresser sur la durée"
        : "For long-term progress",
      pricePerSession: 50,
      popular: true,
    },
    {
      sessions: 12,
      price: 540,
      validity: isFrench ? "4 mois" : "4 months",
      description: isFrench 
        ? "L'équivalent d'un suivi sur 3 mois à raison d'une séance par semaine"
        : "Equivalent to 3-month follow-up with one session per week",
      pricePerSession: 45,
    },
  ];

  const benefits = [
    {
      icon: Calendar,
      title: isFrench ? "Grande Flexibilité" : "Great Flexibility",
      description: isFrench 
        ? "Tu planifies tes séances selon tes disponibilités, sans engagement mensuel."
        : "You schedule your sessions according to your availability, without monthly commitment."
    },
    {
      icon: CreditCard,
      title: isFrench ? "Tarif Avantageux" : "Competitive Pricing",
      description: isFrench 
        ? "Profite de coachings personnalisés avec un tarif réduit grâce aux carnets."
        : "Enjoy personalized coaching at a reduced rate thanks to the booklets."
    },
    {
      icon: Sparkles,
      title: isFrench ? "Qualité Identique" : "Same Quality",
      description: isFrench 
        ? "Chaque séance est entièrement adaptée à ton niveau, ton objectif et ta progression."
        : "Each session is fully adapted to your level, goal and progress."
    },
    {
      icon: Clock,
      title: isFrench ? "Sans Engagement" : "No Commitment",
      description: isFrench 
        ? "Pas d'abonnement, tu choisis simplement la formule qui te correspond."
        : "No subscription, you simply choose the package that suits you."
    },
  ];

  const transformations = [transformation1, transformation2, transformation3, transformation4];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={serviceCarnets}
            alt="Carnets de Séances"
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
              Carnet
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient">CARNETS</span>
              <br />
              <span className="text-foreground/90">DE SÉANCES</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8"
            >
              {isFrench
                ? "Des séances sur mesure, à ton rythme, avec un tarif avantageux et sans engagement."
                : "Tailor-made sessions, at your pace, with competitive pricing and no commitment."}
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="text-lg px-8 py-6">
                {isFrench ? "Réserver" : "Book"}
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "CHOISIS TA" : "CHOOSE YOUR"}
              <span className="text-gradient"> FORMULE</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isFrench
                ? "Trois options flexibles pour s'adapter à tes besoins et ton budget"
                : "Three flexible options to fit your needs and budget"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`relative bg-card border rounded-3xl p-8 ${
                  pkg.popular 
                    ? 'border-primary shadow-[0_0_40px_rgba(var(--primary),0.15)]' 
                    : 'border-border/50 hover:border-primary/50'
                } transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                      <Sparkles className="w-3 h-3" />
                      {isFrench ? "Populaire" : "Popular"}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-foreground mb-2">{pkg.sessions}</div>
                  <div className="text-muted-foreground">{isFrench ? "séances" : "sessions"}</div>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gradient">{pkg.price}</span>
                    <span className="text-muted-foreground">€</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {pkg.pricePerSession}€ / {isFrench ? "séance" : "session"}
                  </div>
                </div>

                <div className="border-t border-border/30 pt-6 mb-6">
                  <p className="text-sm text-muted-foreground text-center">{pkg.description}</p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{isFrench ? "Validité :" : "Validity:"} {pkg.validity}</span>
                </div>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block"
                >
                  <Button 
                    className={`w-full py-6 ${pkg.popular ? '' : 'bg-foreground/10 text-foreground hover:bg-primary hover:text-primary-foreground'}`}
                    variant={pkg.popular ? "default" : "ghost"}
                  >
                    {isFrench ? "Choisir" : "Choose"}
                  </Button>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 bg-card/50 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {isFrench ? "LA SOLUTION IDÉALE POUR" : "THE IDEAL SOLUTION FOR"}
                <br />
                <span className="text-gradient">{isFrench ? "S'ENTRAÎNER À TON RYTHME" : "TRAINING AT YOUR PACE"}</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {isFrench
                    ? "Les carnets de séances sont la solution idéale pour profiter de coachings personnalisés à ton rythme, tout en bénéficiant d'un tarif avantageux."
                    : "Session booklets are the ideal solution to enjoy personalized coaching at your pace, while benefiting from competitive pricing."}
                </p>
                <p>
                  {isFrench
                    ? "Chaque séance est entièrement adaptée à ton niveau, ton objectif et ta progression, avec la même qualité d'accompagnement qu'un coaching individuel."
                    : "Each session is fully adapted to your level, goal and progress, with the same quality of support as individual coaching."}
                </p>
                <p>
                  {isFrench
                    ? "Les carnets offrent une grande flexibilité : tu planifies tes séances selon tes disponibilités, sans engagement mensuel."
                    : "The booklets offer great flexibility: you schedule your sessions according to your availability, without monthly commitment."}
                </p>
              </div>

              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {isFrench ? "Validité des carnets" : "Booklet validity"}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    5 {isFrench ? "séances" : "sessions"} → 2 {isFrench ? "mois" : "months"}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    10 {isFrench ? "séances" : "sessions"} → 3 {isFrench ? "mois" : "months"}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    12 {isFrench ? "séances" : "sessions"} → 4 {isFrench ? "mois" : "months"}
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground/70 mt-4">
                  {isFrench
                    ? "Passé ce délai, les séances non utilisées sont considérées comme consommées, afin de garantir un accompagnement régulier et des résultats durables."
                    : "After this period, unused sessions are considered consumed, to ensure regular support and lasting results."}
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
      <BookingFormSection serviceName={isFrench ? "les Carnets de Séances" : "Session Booklets"} />

      {/* Testimonials/Transformations */}
      <section className="py-24 bg-card/50 border-y border-border/30 relative overflow-hidden">
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
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {isFrench ? "PRÊT À COMMENCER ?" : "READY TO START?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {isFrench
                ? "Choisis ton carnet et commence ta transformation dès aujourd'hui."
                : "Choose your booklet and start your transformation today."}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="text-lg px-8 py-6">
                  {isFrench ? "Réserver maintenant" : "Book now"}
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

export default CarnetsSeances;
