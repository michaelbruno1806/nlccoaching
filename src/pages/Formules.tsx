import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import serviceIndividual from "@/assets/service-individual.jpg";
import serviceGroup from "@/assets/service-group.jpg";
import serviceProgram from "@/assets/service-program.jpg";
import coachPortrait from "@/assets/coach-portrait.jpg";

const Formules = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  const formules = [
    {
      category: isFrench ? "Suivi" : "Follow-up",
      title: isFrench ? "Suivi Personnalisé" : "Personalized Follow-up",
      description: isFrench 
        ? "Suivi en distanciel sur mesure pour atteindre vos objectifs spécifiques."
        : "Remote custom follow-up to achieve your specific goals.",
      image: serviceProgram,
      price: "100",
      priceSuffix: isFrench ? "euro / mois" : "euro / month",
      features: isFrench 
        ? [
            "Suivi en distanciel 100 % adapté à ton rythme.",
            "Échanges hebdos pour ajuster ton évolution.",
            "Suivi et motivation constante",
            "Des résultats concrets et durables.",
          ]
        : [
            "100% remote follow-up adapted to your rhythm.",
            "Weekly exchanges to adjust your progress.",
            "Constant follow-up and motivation",
            "Concrete and lasting results.",
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
      priceSuffix: isFrench ? "euro / séance" : "euro / session",
      priceNote: isFrench ? "(conditions applicables)" : "(conditions apply)",
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
      description: isFrench 
        ? "Jusqu'à 6 personnes pour un suivi de qualité"
        : "Up to 6 people for quality support",
      image: serviceGroup,
      price: "30",
      priceSuffix: isFrench ? "euro / personne" : "euro / person",
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
      image: coachPortrait,
      multiPrice: true,
      prices: [
        { amount: "250", label: isFrench ? "5 séances" : "5 sessions" },
        { amount: "500", label: isFrench ? "10 séances" : "10 sessions" },
        { amount: "540", label: isFrench ? "12 séances" : "12 sessions" },
      ],
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
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={serviceIndividual}
            alt="Coaching"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              {isFrench ? "Retour à l'accueil" : "Back to home"}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-muted-foreground uppercase tracking-widest text-sm font-medium mb-4 block">
              Coaching
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              {isFrench ? "NOS " : "OUR "}
              <span className="text-primary">{isFrench ? "FORMULES" : "COACHING"}</span>
              <br />
              {isFrench ? "DE COACHING" : "PACKAGES"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {isFrench
                ? "Choisissez l'accompagnement qui vous transformera et vous aidera à atteindre vos objectifs personnels et professionnels."
                : "Choose the support that will transform you and help you achieve your personal and professional goals."}
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#formules">
                <Button size="lg">
                  {isFrench ? "Découvrir" : "Discover"}
                </Button>
              </a>
              <Link to="/#contact">
                <Button size="lg" variant="outline">
                  {isFrench ? "Nous Contacter" : "Contact Us"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formules Grid */}
      <section id="formules" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {formules.map((formule, index) => (
              <motion.div
                key={formule.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 h-full flex flex-col">
                  {/* Header */}
                  <div className="p-6 lg:p-8">
                    <span className="text-primary text-sm font-medium tracking-wide uppercase">
                      {formule.category}
                    </span>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2 mb-3">
                      {formule.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {formule.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={formule.image}
                      alt={formule.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  {/* Pricing */}
                  <div className="p-6 lg:p-8 border-t border-border/30">
                    {formule.multiPrice ? (
                      <div className="space-y-3">
                        {formule.prices?.map((price, i) => (
                          <div key={i} className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-primary">{price.amount}</span>
                            <span className="text-muted-foreground">euro / {price.label}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {formule.pricePrefix && (
                          <span className="text-sm text-muted-foreground">{formule.pricePrefix}</span>
                        )}
                        <span className="text-5xl font-bold text-primary">{formule.price}</span>
                        <span className="text-muted-foreground">{formule.priceSuffix}</span>
                        {formule.priceNote && (
                          <span className="text-xs text-muted-foreground w-full">{formule.priceNote}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8 flex-grow">
                    <ul className="space-y-3">
                      {formule.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="p-6 lg:p-8 pt-0 flex gap-3">
                    <Link to="/#contact" className="flex-1">
                      <Button className="w-full">
                        {isFrench ? "Réserver" : "Book"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "OPTIMISE TON PARCOURS DE PERFORMANCE" : "OPTIMIZE YOUR PERFORMANCE JOURNEY"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isFrench
                ? "Nos clients partagent leur expérience, leur progression et la transformation qu'ils ont vécue à nos côtés."
                : "Our clients share their experience, progress, and the transformation they experienced with us."}
            </p>
            <Link to="/#contact">
              <Button size="lg">
                {isFrench ? "Commencer maintenant" : "Start now"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Formules;
