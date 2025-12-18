import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import aboutCoach from "@/assets/about-coach.png";
import aboutCoach2 from "@/assets/about-coach-2.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/hooks/useSiteContent";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const { getContent } = useSiteContent();

  // Get content from database with fallbacks
  const badge = getContent("about_badge") || t("Qui Nous Sommes", "Who We Are");
  const title = getContent("about_title") || t("Optimise ton parcours de performance", "Optimize your journey to performance");
  const paragraph1 = getContent("about_paragraph_1") || t(
    "Nous créons des expériences de coaching d'élite basées sur la science, la discipline et la performance humaine. Chaque séance vise à repousser tes limites, transformer ton corps et renforcer ton mental.",
    "We create elite coaching experiences based on science, discipline, and human performance. Each session aims to push your limits, transform your body, and strengthen your mind."
  );
  const paragraph2 = getContent("about_paragraph_2") || t(
    "L'excellence naît du travail, de la rigueur et de la constance. Notre approche personnalisée garantit que chaque athlète reçoit l'attention et les outils nécessaires pour atteindre son plein potentiel.",
    "Excellence is born from work, rigor, and consistency. Our personalized approach ensures that each athlete receives the attention and tools needed to reach their full potential."
  );
  const buttonText = getContent("about_button") || t("En Savoir Plus", "Learn More");
  const statValue = getContent("about_stat_value") || "10+";
  const statLabel = getContent("about_stat_label") || t("Années d'expérience", "Years of experience");

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-1/4 right-20 w-32 h-32 bg-gold/10 rounded-full blur-2xl"
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-20 w-48 h-48 bg-gold/5 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <motion.img
                  src={aboutCoach}
                  alt="Training intensity"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] rounded-2xl overflow-hidden mt-12"
              >
                <motion.img
                  src={aboutCoach2}
                  alt="Focused training"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
              </motion.div>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-2xl"
            >
              <div className="text-center">
                <motion.span 
                  className="text-4xl font-display font-bold text-gradient"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {statValue}
                </motion.span>
                <p className="text-sm text-muted-foreground mt-1">
                  {statLabel}
                </p>
              </div>
            </motion.div>
            
            {/* Decorative corner element */}
            <motion.div 
              className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-gold/30 rounded-tl-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span 
              className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4"
              animate={isInView ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {badge}
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title.includes("performance") ? (
                <>
                  {title.split("performance")[0]}
                  <motion.span 
                    className="text-gradient inline-block"
                    animate={isInView ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    performance
                  </motion.span>
                  {title.split("performance")[1]}
                </>
              ) : (
                title
              )}
            </h2>
            <motion.p 
              className="text-muted-foreground text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {paragraph1}
            </motion.p>
            <motion.p 
              className="text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {paragraph2}
            </motion.p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button variant="goldOutline" className="group">
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
