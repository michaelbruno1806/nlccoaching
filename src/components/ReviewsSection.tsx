import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Clock, Target, Trophy, X, ZoomIn, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

// Testimonial images
import testimonialArmand from "@/assets/testimonial-armand.png";
import testimonialMagdalena from "@/assets/testimonial-magdalena.png";
import testimonialRicardo from "@/assets/testimonial-ricardo.jpg";
import testimonialLudivine from "@/assets/testimonial-ludivine.jpg";
import testimonialManon from "@/assets/testimonial-manon.jpg";

// Transformation images
import transformBefore1 from "@/assets/transform-before-1.jpg";
import transformAfter1 from "@/assets/transform-after-1.jpg";
import transformBefore2 from "@/assets/transform-before-2.jpg";
import transformAfter2 from "@/assets/transform-after-2.jpg";
import transformBefore3 from "@/assets/transform-before-3.jpg";
import transformAfter3 from "@/assets/transform-after-3.jpg";
import transformBefore4 from "@/assets/transform-before-4.jpg";
import transformAfter4 from "@/assets/transform-after-4.jpg";

// Screenshot images
import screenshot1 from "@/assets/screenshot-1.jpg";
import screenshot2 from "@/assets/screenshot-2.jpg";
import screenshot3 from "@/assets/screenshot-3.jpg";
import screenshot4 from "@/assets/screenshot-4.jpg";

interface Testimonial {
  name: string;
  image: string;
  duration: string;
  durationEn: string;
  objective: string;
  objectiveEn: string;
  story: string;
  storyEn: string;
  highlight: string;
  highlightEn: string;
}

interface TransformationShowcase {
  name: string;
  beforeImage: string;
  afterImage: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Armand",
    image: testimonialArmand,
    duration: "3 mois de suivi personnalisé",
    durationEn: "3 months personalized coaching",
    objective: "Se préparer pour un triathlon",
    objectiveEn: "Prepare for a triathlon",
    story: "Armand m'a fait confiance et aujourd'hui, il a développé un physique et une mentalité à toute épreuve. Aujourd'hui, il a non seulement atteint son objectif, mais il a également développé une maîtrise solide de la technique en salle, des méthodes d'entraînement et de la nutrition.",
    storyEn: "Armand trusted me and today, he has developed an unshakeable physique and mentality. Today, he has not only achieved his goal, but has also developed a solid mastery of gym technique, training methods and nutrition.",
    highlight: "Objectif atteint et dépassé",
    highlightEn: "Goal achieved and exceeded",
  },
  {
    name: "Magdalena",
    image: testimonialMagdalena,
    duration: "6 mois de coaching individuel",
    durationEn: "6 months individual coaching",
    objective: "Perte de poids de 14 kg",
    objectiveEn: "14 kg weight loss",
    story: "Après seulement quelques séances, elle a pris goût à la salle de sport et ne pouvait plus s'arrêter, elle était déterminée ! Une fois son objectif atteint, elle était heureuse de constater qu'elle n'avait pas seulement changé physiquement : elle avait enfin appris à aimer son corps, qu'elle avait détesté pendant longtemps.",
    storyEn: "After just a few sessions, she developed a taste for the gym and couldn't stop, she was determined! Once she achieved her goal, she was happy to see that she hadn't just changed physically: she had finally learned to love her body, which she had hated for a long time.",
    highlight: "-14 kg",
    highlightEn: "-14 kg",
  },
  {
    name: "Ricardo",
    image: testimonialRicardo,
    duration: "6 mois de coaching individuel",
    durationEn: "6 months individual coaching",
    objective: "Perte de poids de 21 kg",
    objectiveEn: "21 kg weight loss",
    story: "Après 6 mois, accompagnés d'un suivi nutritionnel adapté, nous sommes arrivés à -15 kg sur la balance. Mais ce qui a le plus surpris Ricardo, ce n'est pas le poids perdu, c'est la sensation de renforcement et de mieux-être général. Des douleurs au dos le gênaient depuis plusieurs années. Après avoir amélioré sa condition physique, ces douleurs ont totalement disparu.",
    storyEn: "After 6 months, accompanied by adapted nutritional monitoring, we achieved -15 kg on the scale. But what surprised Ricardo the most wasn't the weight lost, it was the feeling of strengthening and overall well-being. Back pain had been bothering him for several years. After improving his physical condition, this pain completely disappeared.",
    highlight: "-15 kg",
    highlightEn: "-15 kg",
  },
  {
    name: "Ludivine",
    image: testimonialLudivine,
    duration: "1 an de suivi personnalisé",
    durationEn: "1 year personalized coaching",
    objective: "Atteindre le niveau Régional 3 en Force Athlétique",
    objectiveEn: "Reach Regional 3 level in Powerlifting",
    story: "Ludivine m'a découvert lors d'un entraînement de force athlétique. Elle a immédiatement été passionnée par ce sport et a décidé de me faire confiance. Cette fille qui ne connaissait rien du bench réalise aujourd'hui 40 kg sans difficulté. Physiquement, Ludivine s'est métamorphosée : ses performances ne cessent de progresser. Elle continue de me faire confiance en repartant pour une nouvelle année de travail à mes côtés.",
    storyEn: "Ludivine discovered me during a powerlifting training session. She was immediately passionate about this sport and decided to trust me. This girl who knew nothing about bench press now achieves 40 kg effortlessly. Physically, Ludivine has transformed: her performance continues to improve. She continues to trust me by starting another year of work by my side.",
    highlight: "40 kg au bench",
    highlightEn: "40 kg bench press",
  },
  {
    name: "Manon",
    image: testimonialManon,
    duration: "3 mois de suivi personnalisé",
    durationEn: "3 months personalized coaching",
    objective: "Ventre plus plat et développer sa silhouette",
    objectiveEn: "Flatter stomach and improved silhouette",
    story: "Manon m'a rencontré grâce à Instagram et m'a tout de suite contacté ! Après seulement un mois, son premier objectif était atteint. Au bout de trois mois, son physique n'avait plus rien à voir avec celui du premier jour. Ce que Manon a appris durant ces trois mois lui servira pour toute sa vie : une bonne technique, une mentalité de gagnante et surtout, la fierté d'elle-même.",
    storyEn: "Manon met me through Instagram and contacted me right away! After just one month, her first goal was achieved. After three months, her physique had nothing to do with that of the first day. What Manon learned during these three months will serve her for life: good technique, a winner's mentality and above all, pride in herself.",
    highlight: "Transformation complète",
    highlightEn: "Complete transformation",
  },
];

const transformationShowcases: TransformationShowcase[] = [
  { name: "Transformation 1", beforeImage: transformBefore1, afterImage: transformAfter1 },
  { name: "Transformation 2", beforeImage: transformBefore2, afterImage: transformAfter2 },
  { name: "Transformation 3", beforeImage: transformBefore3, afterImage: transformAfter3 },
  { name: "Transformation 4", beforeImage: transformBefore4, afterImage: transformAfter4 },
];

const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];

const ReviewsSection = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string } | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
            {isFrench ? "Avis" : "Reviews"}
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

        {/* Video Section - Auto Play */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-black/30">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/hero-background.mp4"
            >
              <source src="/videos/hero-background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Testimonials Grid - Cards with Photos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            {isFrench ? "Témoignages Clients" : "Client Testimonials"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)]">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Quote icon */}
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/40 group-hover:text-primary/60 transition-colors" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-gold text-gold"
                        />
                      ))}
                    </div>

                    {/* Highlight badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-sm font-semibold mb-3">
                      <Trophy className="w-4 h-4" />
                      {isFrench ? testimonial.highlight : testimonial.highlightEn}
                    </div>

                    {/* Name */}
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {testimonial.name}
                    </h3>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {isFrench ? testimonial.duration : testimonial.durationEn}
                    </div>

                    {/* Objective */}
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white/70">
                        <span className="font-medium text-white">
                          {isFrench ? "Objectif:" : "Goal:"}
                        </span>{" "}
                        {isFrench ? testimonial.objective : testimonial.objectiveEn}
                      </p>
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transformations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            {isFrench ? "Nos Transformations" : "Our Transformations"}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {transformationShowcases.map((showcase, index) => (
              <motion.div
                key={showcase.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500"
              >
                {/* Before/After comparison */}
                <div className="relative aspect-[3/4]">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={showcase.beforeImage}
                        alt="Avant"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white">
                        {isFrench ? "Avant" : "Before"}
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <img
                        src={showcase.afterImage}
                        alt="Après"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary-foreground">
                        {isFrench ? "Après" : "After"}
                      </div>
                    </div>
                  </div>
                  {/* Center divider */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gold/50" />
                  {/* Zoom icon on hover */}
                  <div 
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedImage({ image: showcase.afterImage, title: showcase.name })}
                  >
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Screenshots Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            {isFrench ? "Optimise ton Parcours de Performance" : "Optimize Your Performance Journey"}
          </h3>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isFrench
              ? "Nos clients partagent leur expérience, leur progression et la transformation qu'ils ont vécue à nos côtés."
              : "Our clients share their experience, progress and the transformation they experienced with us."}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-xl overflow-hidden border border-border/50 hover:border-gold/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage({ image: screenshot, title: `Screenshot ${index + 1}` })}
              >
                <img
                  src={screenshot}
                  alt={`Client feedback ${index + 1}`}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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

      {/* Lightbox Modal for Images */}
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
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

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
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonial Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedTestimonial(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              onClick={() => setSelectedTestimonial(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full bg-card rounded-2xl overflow-hidden border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto">
                  <img
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  
                  <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
                    <Trophy className="w-4 h-4" />
                    {isFrench ? selectedTestimonial.highlight : selectedTestimonial.highlightEn}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {selectedTestimonial.name}
                  </h3>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Clock className="w-4 h-4 text-primary" />
                    {isFrench ? selectedTestimonial.duration : selectedTestimonial.durationEn}
                  </div>

                  <div className="flex items-start gap-2 mb-4">
                    <Target className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {isFrench ? "Objectif:" : "Goal:"}
                      </span>{" "}
                      {isFrench ? selectedTestimonial.objective : selectedTestimonial.objectiveEn}
                    </p>
                  </div>

                  <Quote className="w-8 h-8 text-primary/30 mb-2" />
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {isFrench ? selectedTestimonial.story : selectedTestimonial.storyEn}
                  </p>
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