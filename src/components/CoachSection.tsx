import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Calendar } from "lucide-react";
import coachPortrait from "@/assets/coach-portrait.jpg";

const stats = [
  { icon: Award, value: "500+", label: "Clients transformés" },
  { icon: Users, value: "10+", label: "Années d'expérience" },
  { icon: Calendar, value: "5000+", label: "Séances réalisées" },
];

const CoachSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Votre Coach
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Coach sportif et{" "}
              <span className="text-gradient">mentor de vie</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              J'accompagne chacun vers l'équilibre et la performance. Mon
              approche est simple : transformer les défis en opportunités et
              vous guider vers votre meilleure version.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Avec plus de 10 ans d'expérience dans le coaching sportif et le
              développement personnel, j'ai développé une méthodologie unique
              qui combine science du sport, psychologie de la performance et
              accompagnement humain.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-card border border-border"
                >
                  <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <div className="text-2xl font-display font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold">
                Parcours
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">Contact</Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Border gradient effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-gold via-gold/50 to-transparent rounded-2xl blur-sm" />
              <div className="relative rounded-2xl overflow-hidden h-full">
                <img
                  src={coachPortrait}
                  alt="Coach NLC"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;
