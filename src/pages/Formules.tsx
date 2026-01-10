import { motion } from "framer-motion";
import { ArrowLeft, Check, Star, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import ScrollIndicator from "@/components/ScrollIndicator";
import serviceIndividual from "@/assets/service-individual.jpg";
import serviceGroup from "@/assets/service-group.jpg";
import serviceProgram from "@/assets/service-program.jpg";
import serviceCarnets from "@/assets/service-carnets.jpg";

const Formules = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  // SEO content
  const seoTitle = isFrench
    ? "Formules & Tarifs - Coaching Sportif Lille"
    : "Programs & Pricing - Sports Coaching Lille";
  const seoDescription = isFrench
    ? "Découvrez nos formules de coaching : suivi personnalisé, coaching individuel, small groupes et carnets de séances. Tarifs adaptés à tous les budgets."
    : "Discover our coaching programs: personalized follow-up, individual coaching, small groups and session packages. Pricing for all budgets.";

  const formules = [
    {
      category: isFrench ? "Suivi" : "Follow-up",
      title: isFrench ? "Suivi Personnalisé" : "Personalized Follow-up",
      description: isFrench
        ? "Suivi en distanciel sur mesure pour atteindre vos objectifs spécifiques."
        : "Remote custom follow-up to achieve your specific goals.",
      image: serviceProgram,
      price: "100",
      priceSuffix: isFrench ? "€ / mois" : "€ / month",
      icon: Zap,
      popular: false,
      detailsLink: "/suivi-personnalise",
      features: isFrench
        ? [
            "Suivi en distanciel 100 % adapté à ton rythme",
            "Échanges hebdos pour ajuster ton évolution",
            "Suivi et motivation constante",
            "Des résultats concrets et durables",
          ]
        : [
            "100% remote follow-up adapted to your rhythm",
            "Weekly exchanges to adjust your progress",
            "Constant follow-up and motivation",
            "Concrete and lasting results",
          ],
    },
    {
      category: isFrench ? "Coaching" : "Coaching",
      title: isFrench ? "Coaching Individuel" : "Individual Coaching",
      description: isFrench
        ? "Un accompagnement 100% personnalisé pour des résultats réels"
        : "100% personalized support for real results",
      image: serviceIndividual,
      pricePrefix: isFrench ? "à partir de" : "starting at",
      price: "50",
      priceSuffix: isFrench ? "€ / séance" : "€ / session",
      priceNote: isFrench ? "(conditions applicables)" : "(conditions apply)",
      icon: Star,
      popular: true,
      detailsLink: "/coaching-individuel",
      features: isFrench
        ? [
            "Accompagnement en présentiel pour un maximum de résultats",
            "Guidance continue du début à la fin",
            "Progression rapide et maîtrisée",
            "Résultats concrets séance après séance",
          ]
        : [
            "In-person support for maximum results",
            "Continuous guidance from start to finish",
            "Fast and controlled progression",
            "Concrete results session after session",
          ],
    },
    {
      category: isFrench ? "Groupes" : "Groups",
      title: "Small Groupes",
      description: isFrench ? "Jusqu'à 6 personnes pour un suivi de qualité" : "Up to 6 people for quality support",
      image: serviceGroup,
      price: "30",
      priceSuffix: isFrench ? "€ / personne" : "€ / person",
      icon: Users,
      popular: false,
      detailsLink: "/small-groupes",
      features: isFrench
        ? [
            "Ambiance motivante & dynamique",
            "Encadrement professionnel et personnalisé",
            "Groupes limités à 6 personnes",
            "Un équilibre parfait entre convivialité & performance",
          ]
        : [
            "Motivating & dynamic atmosphere",
            "Professional and personalized coaching",
            "Groups limited to 6 people",
            "A perfect balance between friendliness & performance",
          ],
    },
    {
      category: isFrench ? "Carnet" : "Booklet",
      title: isFrench ? "Carnets de Séances" : "Session Booklets",
      description: isFrench
        ? "Accompagnement sur mesure, flexibilité, sans engagement"
        : "Custom support, flexibility, no commitment",
      image: serviceCarnets,
      multiPrice: true,
      prices: [
        { amount: "250", label: isFrench ? "5 séances" : "5 sessions" },
        { amount: "500", label: isFrench ? "10 séances" : "10 sessions" },
        { amount: "540", label: isFrench ? "12 séances" : "12 sessions" },
      ],
      icon: Sparkles,
      popular: false,
      detailsLink: "/carnets-seances",
      features: isFrench
        ? [
            "Coaching personnalisé à ton rythme",
            "Tarif avantageux",
            "Qualité identique au coaching individuel",
            "Sans engagement",
          ]
        : [
            "Personalized coaching at your pace",
            "Competitive pricing",
            "Same quality as individual coaching",
            "No commitment",
          ],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords="formules coaching Lille, tarifs coach sportif, prix coaching individuel, small groupes Wasquehal, carnets séances"
      />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <img src={serviceIndividual} alt="Coaching" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-gold/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Link to="/">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4" />
                {isFrench ? "Retour à l'accueil" : "Back to home"}
              </Button>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
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
              className="font-display text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              {isFrench ? "NOS " : "OUR "}
              <span className="text-gradient">{isFrench ? "FORMULES" : "COACHING"}</span>
              <br />
              <span className="text-foreground/90">{isFrench ? "DE COACHING" : "PACKAGES"}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              {isFrench
                ? "Choisissez l'accompagnement qui vous transformera et vous aidera à atteindre vos objectifs personnels et professionnels."
                : "Choose the support that will transform you and help you achieve your personal and professional goals."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <motion.a href="#formules" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="text-lg px-8 py-6">
                  {isFrench ? "Découvrir" : "Discover"}
                </Button>
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/#contact">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    {isFrench ? "Nous Contacter" : "Contact Us"}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <ScrollIndicator />
        </div>
      </section>

      {/* Formules Grid */}
      <section id="formules" className="py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "Choisissez votre formule" : "Choose your package"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isFrench
                ? "Des offres adaptées à tous les niveaux et tous les objectifs"
                : "Offers adapted to all levels and all goals"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {formules.map((formule, index) => {
              const IconComponent = formule.icon;
              return (
                <motion.div
                  key={formule.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div
                    className={`relative bg-card border rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-500 ${
                      formule.popular
                        ? "border-primary shadow-[0_0_40px_rgba(var(--primary),0.15)]"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    {/* Popular Badge */}
                    {formule.popular && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                          <Star className="w-3 h-3 fill-current" />
                          {isFrench ? "Populaire" : "Popular"}
                        </span>
                      </motion.div>
                    )}

                    {/* Image with Overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={formule.image}
                        alt={formule.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                      {/* Icon Badge */}
                      <div className="absolute bottom-4 left-6">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                        >
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8 flex-grow flex flex-col">
                      {/* Category & Title */}
                      <div className="mb-4">
                        <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                          {formule.category}
                        </span>
                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2">
                          {formule.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2">{formule.description}</p>
                      </div>

                      {/* Pricing */}
                      <div className="py-6 border-y border-border/30 mb-6">
                        {formule.multiPrice ? (
                          <div className="space-y-2">
                            {formule.prices?.map((price, i) => (
                              <div key={i} className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">{price.amount}</span>
                                <span className="text-muted-foreground text-sm">€ / {price.label}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-2 flex-wrap">
                            {formule.pricePrefix && (
                              <span className="text-sm text-muted-foreground">{formule.pricePrefix}</span>
                            )}
                            <span className="text-5xl font-bold text-foreground">{formule.price}</span>
                            <span className="text-muted-foreground">{formule.priceSuffix}</span>
                            {formule.priceNote && (
                              <span className="text-xs text-muted-foreground/70 w-full mt-1">{formule.priceNote}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 flex-grow">
                        {formule.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA Buttons */}
                      <div className="mt-8 flex gap-3">
                        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link to="/#contact" className="block">
                            <Button
                              className={`w-full py-6 text-base font-semibold ${
                                formule.popular
                                  ? ""
                                  : "bg-foreground/10 text-foreground hover:bg-primary hover:text-primary-foreground"
                              }`}
                              variant={formule.popular ? "default" : "ghost"}
                            >
                              {isFrench ? "Réserver" : "Book"}
                            </Button>
                          </Link>
                        </motion.div>
                        {formule.detailsLink && (
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link to={formule.detailsLink}>
                              <Button variant="outline" className="py-6 px-6 text-base font-semibold">
                                {isFrench ? "Détails" : "Details"}
                              </Button>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100%", label: isFrench ? "Satisfaction" : "Satisfaction" },
              { value: "350+", label: isFrench ? "Clients accompagnés" : "Clients coached" },
              { value: "500+", label: isFrench ? "Séances réalisées" : "Sessions completed" },
              { value: "5★", label: isFrench ? "Note moyenne" : "Average rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-gold/5" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              {isFrench ? "PRÊT À TRANSFORMER" : "READY TO TRANSFORM"}
              <br />
              <span className="text-gradient">{isFrench ? "TA VIE ?" : "YOUR LIFE?"}</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              {isFrench
                ? "Rejoins nos clients satisfaits et commence ta transformation dès aujourd'hui."
                : "Join our satisfied clients and start your transformation today."}
            </p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/#contact">
                  <Button size="lg" className="text-lg px-10 py-6">
                    {isFrench ? "Commencer maintenant" : "Start now"}
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/feedback">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-6">
                    {isFrench ? "Voir les témoignages" : "View testimonials"}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Formules;
