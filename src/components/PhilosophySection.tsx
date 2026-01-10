import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/hooks/useSiteContent";

const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const { getContent } = useSiteContent();

  const philosophyItems = [
    {
      icon: Target,
      title: getContent("philosophy_1_title") || t("Performance Durable", "Lasting Performance"),
      description:
        getContent("philosophy_1_description") ||
        t(
          "Renforcer la force, la mobilité et la technique sans blessure. Une approche à long terme pour des résultats qui durent.",
          "Build strength, mobility, and technique without injury. A long-term approach for lasting results.",
        ),
    },
    {
      icon: Users,
      title: getContent("philosophy_2_title") || t("Discipline", "Discipline"),
      description:
        getContent("philosophy_2_description") ||
        t(
          "Chaque programme est adapté à vos objectifs, votre niveau et votre style de vie. Un accompagnement sur mesure.",
          "Each program is tailored to your goals, level, and lifestyle. Custom-made support.",
        ),
    },
    {
      icon: TrendingUp,
      title: getContent("philosophy_3_title") || t("Bienveillance", "Kindness"),
      description:
        getContent("philosophy_3_description") ||
        t(
          "Des indicateurs de progression clairs et des objectifs quantifiables pour suivre votre évolution en temps réel.",
          "Clear progress indicators and quantifiable goals to track your evolution in real-time.",
        ),
    },
  ];

  return (
    <section id="philosophy" className="py-32 relative overflow-hidden bg-card" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
            {t("Notre Philosophie", "Our Philosophy")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t("Une approche qui allie", "An approach that combines")}{" "}
            <span className="text-gradient">{t("performance, discipline", "performance, discipline")}</span> {t("et bienveillance", "and kindness")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(
              "Chez NLC Coaching, nous croyons en une approche du sport qui allie performance, discipline et bienveillance. Chaque accompagnement est pensé pour permettre une progression durable et mesurable.",
              "At NLC Coaching, we believe in a sports approach that combines performance, rigor, and kindness. Each coaching is designed to enable sustainable and measurable progress.",
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-background border border-border hover:border-gold/50 transition-all duration-500 h-full">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                    <item.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
