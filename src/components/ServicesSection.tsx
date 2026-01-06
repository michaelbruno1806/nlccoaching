import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import serviceProgram from "@/assets/service-program.jpg";
import serviceIndividual from "@/assets/service-individual-new.jpg";
import serviceGroup from "@/assets/service-group-new.jpg";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const { getContent } = useSiteContent();

  const services = [
    {
      category: t("Programme", "Program"),
      titleLine1: t("PROGRAMME", "PERSONALIZED"),
      titleLine2: t("PERSONNALISÉ", "PROGRAM"),
      description: getContent("service_1_description") || t(
        "Accompagnement sur mesure pour atteindre vos objectifs spécifiques.",
        "Tailored support to achieve your specific goals."
      ),
      image: serviceProgram,
    },
    {
      category: t("Programme", "Program"),
      titleLine1: t("COACHING", "INDIVIDUAL"),
      titleLine2: t("INDIVIDUEL", "COACHING"),
      description: getContent("service_2_description") || t(
        "Séances intensives pour maximiser votre potentiel personnel.",
        "Intensive sessions to maximize your personal potential."
      ),
      image: serviceIndividual,
    },
    {
      category: t("Groupes", "Groups"),
      titleLine1: "SMALL",
      titleLine2: "GROUPS",
      description: getContent("service_3_description") || t(
        "Jusqu'à 4 personnes pour un suivi de qualité.",
        "Up to 4 people for quality support."
      ),
      image: serviceGroup,
    },
  ];

  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span 
            className="inline-block text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4"
            animate={isInView ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Services
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wider">
            {t("MES PROGRAMMES", "MY PROGRAMS")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(
              "Des solutions adaptées à vos objectifs personnels et professionnels.",
              "Solutions tailored to your personal and professional goals."
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="group"
            >
              <div className="relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden h-full flex flex-col hover:border-primary/50 transition-all duration-500">
                {/* Content */}
                <div className="p-6 lg:p-8 flex-grow">
                  <span className="text-primary text-sm font-medium tracking-wide">
                    {service.category}
                  </span>
                  
                  <h3 className="font-display text-2xl lg:text-3xl font-bold mt-3 leading-tight">
                    <span className="text-primary block">{service.titleLine1}</span>
                    <span className="text-primary block">{service.titleLine2}</span>
                  </h3>
                  
                  <p className="text-muted-foreground mt-4 text-sm lg:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.titleLine1} ${service.titleLine2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/formules">
            <Button size="lg" className="gap-2 group">
              {t("Découvrir les Formules", "Discover Packages")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
