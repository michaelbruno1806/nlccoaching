import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import training1 from "@/assets/training-1.jpg";
import training2 from "@/assets/training-2.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />

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
                className="aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img
                  src={training1}
                  alt="Training intensity"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="aspect-[3/4] rounded-2xl overflow-hidden mt-12"
              >
                <img
                  src={training2}
                  alt="Focused training"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-2xl"
            >
              <div className="text-center">
                <span className="text-4xl font-display font-bold text-gradient">
                  10+
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Années d'expérience
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Qui Nous Sommes
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Optimise ton parcours de{" "}
              <span className="text-gradient">performance</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Nous créons des expériences de coaching d'élite basées sur la
              science, la discipline et la performance humaine. Chaque séance
              vise à repousser tes limites, transformer ton corps et renforcer
              ton mental.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              L'excellence naît du travail, de la rigueur et de la constance.
              Notre approche personnalisée garantit que chaque athlète reçoit
              l'attention et les outils nécessaires pour atteindre son plein
              potentiel.
            </p>
            <Button variant="goldOutline" className="group">
              En Savoir Plus
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
