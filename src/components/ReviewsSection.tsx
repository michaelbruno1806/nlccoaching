import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Clock, Target, Trophy, X, ZoomIn, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import transformation1 from "@/assets/transformation-1.png";
import transformation2 from "@/assets/transformation-2.png";
import transformation3 from "@/assets/transformation-3.png";
import transformation4 from "@/assets/transformation-4.png";

interface Testimonial {
  name: string;
  duration: string;
  durationEn: string;
  objective: string;
  objectiveEn: string;
  result: string;
  resultEn: string;
  highlight: string;
  highlightEn: string;
}

interface TransformationShowcase {
  name: string;
  image: string;
  result: string;
  resultEn: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Armand",
    duration: "3 mois de suivi personnalisé",
    durationEn: "3 months personalized coaching",
    objective: "Se préparer pour un triathlon",
    objectiveEn: "Prepare for a triathlon",
    result: "Physique et mentalité à toute épreuve, maîtrise de la technique en salle et de la nutrition",
    resultEn: "Peak physical and mental condition, mastery of gym technique and nutrition",
    highlight: "Objectif atteint et dépassé",
    highlightEn: "Goal achieved and exceeded",
  },
  {
    name: "Magdalena",
    duration: "6 mois de coaching individuel",
    durationEn: "6 months individual coaching",
    objective: "Perte de poids de 14 kg",
    objectiveEn: "14 kg weight loss",
    result: "Objectif atteint, elle a enfin appris à aimer son corps",
    resultEn: "Goal achieved, she finally learned to love her body",
    highlight: "-14 kg",
    highlightEn: "-14 kg",
  },
  {
    name: "Ricardo",
    duration: "6 mois de coaching individuel",
    durationEn: "6 months individual coaching",
    objective: "Perte de poids de 21 kg",
    objectiveEn: "21 kg weight loss",
    result: "Plus de douleurs au dos, sensation de renforcement et de mieux-être général",
    resultEn: "No more back pain, feeling of strengthening and overall well-being",
    highlight: "-15 kg",
    highlightEn: "-15 kg",
  },
  {
    name: "Ludivine",
    duration: "1 an de suivi personnalisé",
    durationEn: "1 year personalized coaching",
    objective: "Atteindre le niveau Régional 3 en Force Athlétique",
    objectiveEn: "Reach Regional 3 level in Powerlifting",
    result: "Performances en constante progression, métamorphose physique complète",
    resultEn: "Constantly improving performance, complete physical transformation",
    highlight: "40 kg au bench",
    highlightEn: "40 kg bench press",
  },
  {
    name: "Manon",
    duration: "3 mois de suivi personnalisé",
    durationEn: "3 months personalized coaching",
    objective: "Ventre plus plat et développer sa silhouette",
    objectiveEn: "Flatter stomach and improved silhouette",
    result: "Bonne technique, mentalité de gagnante et fierté d'elle-même",
    resultEn: "Good technique, winner's mentality and self-pride",
    highlight: "Transformation complète",
    highlightEn: "Complete transformation",
  },
];

const transformationShowcases: TransformationShowcase[] = [
  {
    name: "Magdalena",
    image: transformation1,
    result: "-14 kg en 6 mois",
    resultEn: "-14 kg in 6 months",
  },
  {
    name: "Armand",
    image: transformation2,
    result: "Préparation triathlon réussie",
    resultEn: "Successful triathlon preparation",
  },
  {
    name: "Ricardo",
    image: transformation3,
    result: "-15 kg, plus de douleurs",
    resultEn: "-15 kg, no more pain",
  },
  {
    name: "Ludivine",
    image: transformation4,
    result: "Force et souplesse",
    resultEn: "Strength and flexibility",
  },
];

const ReviewsSection = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";
  const [selectedImage, setSelectedImage] = useState<TransformationShowcase | null>(null);

  return (
    <section id="reviews" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-widest text-sm font-medium mb-4 block">
            {isFrench ? "Témoignages" : "Testimonials"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">
              {isFrench ? "Performance" : "Performance"}
            </span>{" "}
            <span className="text-foreground">&</span>{" "}
            <span className="text-gradient">
              {isFrench ? "Transformation" : "Transformation"}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isFrench
              ? "Nos clients partagent leur expérience, leur progression et la transformation qu'ils ont vécue à nos côtés."
              : "Our clients share their experience, progress and the transformation they experienced with us."}
          </p>
        </motion.div>

        {/* Transformation Showcases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            {isFrench ? "Transformations réelles" : "Real Transformations"}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {transformationShowcases.map((showcase, index) => (
              <motion.div
                key={showcase.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedImage(showcase)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={showcase.image}
                    alt={`${showcase.name} transformation`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Zoom icon */}
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-1">
                        {showcase.name}
                      </h4>
                      <p className="text-sm text-white/80">
                        {isFrench ? showcase.result : showcase.resultEn}
                      </p>
                    </div>
                    <div className="bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-xs font-semibold text-primary-foreground">
                        {isFrench ? "Avant / Après" : "Before / After"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)]">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>

                {/* Highlight badge */}
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
                  <Trophy className="w-4 h-4" />
                  {isFrench ? testimonial.highlight : testimonial.highlightEn}
                </div>

                {/* Name */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {testimonial.name}
                </h3>

                {/* Duration */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Clock className="w-4 h-4 text-primary" />
                  {isFrench ? testimonial.duration : testimonial.durationEn}
                </div>

                {/* Objective */}
                <div className="flex items-start gap-2 mb-3">
                  <Target className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {isFrench ? "Objectif:" : "Goal:"}
                    </span>{" "}
                    {isFrench ? testimonial.objective : testimonial.objectiveEn}
                  </p>
                </div>

                {/* Result */}
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {isFrench ? testimonial.result : testimonial.resultEn}
                </p>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link to="/feedback">
            <Button size="lg" variant="outline" className="gap-2 group">
              {isFrench ? "Voir tous les avis" : "View all feedback"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "100%", label: isFrench ? "Satisfaction" : "Satisfaction" },
            { value: "50+", label: isFrench ? "Clients transformés" : "Transformed clients" },
            { value: "-15kg", label: isFrench ? "Perte moyenne" : "Average loss" },
            { value: "5★", label: isFrench ? "Note moyenne" : "Average rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-card/30 rounded-xl border border-border/30"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={`${selectedImage.name} transformation`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {selectedImage.name}
                    </h3>
                    <p className="text-white/80">
                      {isFrench ? selectedImage.result : selectedImage.resultEn}
                    </p>
                  </div>
                  <div className="bg-primary px-4 py-2 rounded-full">
                    <span className="font-semibold text-primary-foreground">
                      {isFrench ? "Avant / Après" : "Before / After"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReviewsSection;
