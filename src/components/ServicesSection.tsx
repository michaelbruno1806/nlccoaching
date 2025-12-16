import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Users, Sparkles } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    category: "Programme",
    title: "Programme Personnalisé",
    description:
      "Accompagnement sur mesure pour atteindre vos objectifs spécifiques. Un programme unique créé pour vous.",
    features: [
      "Analyse complète de vos besoins",
      "Plan d'entraînement sur mesure",
      "Suivi nutritionnel personnalisé",
      "Ajustements en temps réel",
    ],
    highlighted: true,
  },
  {
    icon: User,
    category: "Programme",
    title: "Coaching Individuel",
    description:
      "Séances intensives pour maximiser votre potentiel personnel. Une attention exclusive à votre progression.",
    features: [
      "Sessions privées 1-on-1",
      "Correction technique approfondie",
      "Feedback instantané",
      "Flexibilité horaire",
    ],
    highlighted: false,
  },
  {
    icon: Users,
    category: "Groupes",
    title: "Small Groupes",
    description:
      "Jusqu'à 4 personnes pour un suivi de qualité. L'énergie du groupe avec l'attention du coaching privé.",
    features: [
      "Maximum 4 participants",
      "Dynamique de groupe motivante",
      "Tarif avantageux",
      "Ambiance stimulante",
    ],
    highlighted: false,
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span 
            className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4"
            animate={isInView ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Services
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Mes <span className="text-gradient">programmes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Des solutions adaptées à vos objectifs personnels et professionnels.
            Choisissez la formule qui correspond le mieux à vos besoins.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`group relative ${
                service.highlighted ? "md:-mt-4 md:mb-4" : ""
              }`}
            >
              <motion.div
                className={`relative p-8 rounded-2xl h-full flex flex-col transition-all duration-500 ${
                  service.highlighted
                    ? "bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border-2 border-gold/50"
                    : "bg-card border border-border hover:border-gold/30"
                }`}
                whileHover={{ 
                  boxShadow: service.highlighted 
                    ? "0 20px 60px -15px hsl(38, 92%, 50%, 0.4)" 
                    : "0 20px 40px -15px hsl(0, 0%, 0%, 0.5)"
                }}
              >
                {service.highlighted && (
                  <motion.div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="px-4 py-1 text-xs font-semibold uppercase tracking-wider bg-gold text-primary-foreground rounded-full">
                      Populaire
                    </span>
                  </motion.div>
                )}

                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-gold">
                    {service.category}
                  </span>
                </div>

                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-7 h-7 text-gold" />
                </motion.div>

                <h3 className="font-display text-2xl font-bold mb-4">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 flex-grow">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 + fIndex * 0.05 }}
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-gold mr-3"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: fIndex * 0.2 }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant={service.highlighted ? "gold" : "outline"}
                    className="w-full group/btn"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button variant="hero" size="xl">
              Découvrir les Formules
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
