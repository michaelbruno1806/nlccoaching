import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Clock, Target, Trophy, X, ZoomIn, ArrowLeft, MessageCircle, Play, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import ClientMessages from "@/components/ClientMessages";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import transformation1 from "@/assets/transformation-1.png";
import transformation2 from "@/assets/transformation-2.png";
import transformation3 from "@/assets/transformation-3.png";
import transformation4 from "@/assets/transformation-4.png";

// Testimonial images
import testimonialArmand from "@/assets/testimonial-armand.png";
import testimonialMagdalena from "@/assets/testimonial-magdalena.png";
import testimonialRicardo from "@/assets/testimonial-ricardo.jpg";
import testimonialLudivine from "@/assets/testimonial-ludivine.jpg";
import testimonialManon from "@/assets/testimonial-manon.jpg";

interface Testimonial {
  name: string;
  image: string;
  duration: string;
  durationEn: string;
  objective: string;
  objectiveEn: string;
  result: string;
  resultEn: string;
  highlight: string;
  highlightEn: string;
  fullReview?: string;
  fullReviewEn?: string;
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
    image: testimonialArmand,
    duration: "3 mois de suivi personnalisé",
    durationEn: "3 months personalized coaching",
    objective: "Se préparer pour un triathlon",
    objectiveEn: "Prepare for a triathlon",
    result: "Physique et mentalité à toute épreuve, maîtrise de la technique en salle et de la nutrition",
    resultEn: "Peak physical and mental condition, mastery of gym technique and nutrition",
    highlight: "Objectif atteint et dépassé",
    highlightEn: "Goal achieved and exceeded",
    fullReview: "Travailler avec mon coach a été une expérience transformatrice. Non seulement j'ai atteint mon objectif de terminer le triathlon, mais j'ai aussi découvert une force mentale que je ne savais pas posséder. Les séances étaient intenses mais toujours adaptées à mon niveau. Je recommande vivement!",
    fullReviewEn: "Working with my coach has been a transformative experience. Not only did I achieve my goal of completing the triathlon, but I also discovered a mental strength I didn't know I had. The sessions were intense but always adapted to my level. Highly recommend!",
  },
  {
    name: "Magdalena",
    image: testimonialMagdalena,
    duration: "6 mois de coaching individuel",
    durationEn: "6 months individual coaching",
    objective: "Perte de poids de 14 kg",
    objectiveEn: "14 kg weight loss",
    result: "Objectif atteint, elle a enfin appris à aimer son corps",
    resultEn: "Goal achieved, she finally learned to love her body",
    highlight: "-14 kg",
    highlightEn: "-14 kg",
    fullReview: "Après des années de régimes yo-yo, j'ai enfin trouvé une approche durable. Mon coach m'a appris à manger sainement sans me priver et à aimer l'exercice. -14 kg et surtout, une confiance en moi retrouvée!",
    fullReviewEn: "After years of yo-yo dieting, I finally found a sustainable approach. My coach taught me to eat healthy without deprivation and to love exercise. -14 kg and most importantly, my confidence restored!",
  },
  {
    name: "Ricardo",
    image: testimonialRicardo,
    duration: "6 mois de coaching individuel",
    durationEn: "6 months individual coaching",
    objective: "Perte de poids de 21 kg",
    objectiveEn: "21 kg weight loss",
    result: "Plus de douleurs au dos, sensation de renforcement et de mieux-être général",
    resultEn: "No more back pain, feeling of strengthening and overall well-being",
    highlight: "-15 kg",
    highlightEn: "-15 kg",
    fullReview: "Je souffrais de douleurs chroniques au dos depuis des années. Grâce au programme personnalisé, j'ai perdu du poids et renforcé mes muscles stabilisateurs. Aujourd'hui, je vis sans douleur et je me sens plus jeune que jamais.",
    fullReviewEn: "I had been suffering from chronic back pain for years. Thanks to the personalized program, I lost weight and strengthened my stabilizing muscles. Today, I live pain-free and feel younger than ever.",
  },
  {
    name: "Ludivine",
    image: testimonialLudivine,
    duration: "1 an de suivi personnalisé",
    durationEn: "1 year personalized coaching",
    objective: "Atteindre le niveau Régional 3 en Force Athlétique",
    objectiveEn: "Reach Regional 3 level in Powerlifting",
    result: "Performances en constante progression, métamorphose physique complète",
    resultEn: "Constantly improving performance, complete physical transformation",
    highlight: "40 kg au bench",
    highlightEn: "40 kg bench press",
    fullReview: "Une année incroyable de progression! J'ai atteint et dépassé mes objectifs en force athlétique. Mon coach a su adapter les entraînements à mes compétitions et m'a poussée à me surpasser à chaque séance.",
    fullReviewEn: "An incredible year of progress! I reached and exceeded my powerlifting goals. My coach adapted the training to my competitions and pushed me to surpass myself in every session.",
  },
  {
    name: "Manon",
    image: testimonialManon,
    duration: "3 mois de suivi personnalisé",
    durationEn: "3 months personalized coaching",
    objective: "Ventre plus plat et développer sa silhouette",
    objectiveEn: "Flatter stomach and improved silhouette",
    result: "Bonne technique, mentalité de gagnante et fierté d'elle-même",
    resultEn: "Good technique, winner's mentality and self-pride",
    highlight: "Transformation complète",
    highlightEn: "Complete transformation",
    fullReview: "En seulement 3 mois, j'ai complètement changé ma silhouette et surtout ma mentalité. J'ai appris les bonnes techniques et je suis maintenant autonome à la salle. Une expérience qui change la vie!",
    fullReviewEn: "In just 3 months, I completely changed my figure and especially my mindset. I learned the right techniques and am now independent at the gym. A life-changing experience!",
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

const CustomerFeedback = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";
  const [selectedImage, setSelectedImage] = useState<TransformationShowcase | null>(null);
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  const tryAutoplay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = isMuted;
    const p = el.play();
    if (p && typeof (p as Promise<void>).catch === "function") {
      (p as Promise<void>).catch(() => {
        setAutoplayBlocked(true);
      });
    }
  };

  const handleUserPlay = () => {
    const el = videoRef.current;
    if (!el) return;
    const p = el.play();
    if (p && typeof (p as Promise<void>).then === "function") {
      (p as Promise<void>)
        .then(() => setAutoplayBlocked(false))
        .catch(() => {});
    }
  };

  useEffect(() => {
    const t = window.setTimeout(() => tryAutoplay(), 50);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
      {/* Hero Header */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
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
            className="text-center"
          >
            <span className="text-primary uppercase tracking-widest text-sm font-medium mb-4 block">
              {isFrench ? "Avis Clients" : "Customer Reviews"}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">
                {isFrench ? "Ils nous font" : "They"}
              </span>{" "}
              <span className="text-foreground">
                {isFrench ? "confiance" : "trust us"}
              </span>
            </h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              {isFrench
                ? "Découvrez les témoignages de nos clients et leurs transformations exceptionnelles."
                : "Discover our clients' testimonials and their exceptional transformations."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transformation Gallery */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-10"
          >
            {isFrench ? "Transformations en images" : "Transformations in pictures"}
          </motion.h2>
          
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="font-display text-lg font-bold text-white mb-1">
                    {showcase.name}
                  </h4>
                  <p className="text-sm text-white/80">
                    {isFrench ? showcase.result : showcase.resultEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Messages Section */}
      <ClientMessages />

      {/* Video Testimonial Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={tryAutoplay}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Play className="w-4 h-4" />
              {isFrench ? "Témoignage vidéo" : "Video Testimonial"}
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {isFrench ? "Découvrez leur parcours" : "Discover their journey"}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-sm mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_rgba(34,197,94,0.15)] bg-gradient-to-br from-card to-card/50 p-2">
              <div 
                className="relative rounded-2xl overflow-hidden bg-black"
                style={{ aspectRatio: '9/16', minHeight: '500px' }}
              >
                <video
                  ref={videoRef}
                  src="/videos/Avis-Client-3-2.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  onLoadedMetadata={tryAutoplay}
                  onCanPlay={tryAutoplay}
                  onPlay={() => setAutoplayBlocked(false)}
                  onError={() => setVideoError(true)}
                  title={isFrench ? "Témoignage client" : "Customer testimonial"}
                />

                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="max-w-xs rounded-xl bg-background/80 backdrop-blur-sm border border-border px-4 py-3 text-center">
                      <p className="text-sm text-foreground">
                        {isFrench
                          ? "Vidéo non compatible ici. Réexporte en MP4 H.264 + AAC."
                          : "Video not supported. Re-export as MP4 H.264 + AAC."}
                      </p>
                    </div>
                  </div>
                )}

                {autoplayBlocked && !videoError && (
                  <motion.button
                    onClick={handleUserPlay}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isFrench ? "Lancer la vidéo" : "Play video"}
                  >
                    <Play className="w-7 h-7 text-foreground" />
                  </motion.button>
                )}

                {/* Sound control button */}
                <motion.button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-primary/80 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isMuted ? (isFrench ? "Activer le son" : "Unmute") : (isFrench ? "Couper le son" : "Mute")}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Testimonials - Cards with Photos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-4"
          >
            <MessageCircle className="inline-block w-8 h-8 text-primary mr-3" />
            {isFrench ? "Témoignages détaillés" : "Detailed testimonials"}
          </motion.h2>
          <p className="text-center text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            {isFrench ? "Cliquez sur une carte pour découvrir l'histoire complète" : "Click on a card to discover the full story"}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setExpandedReview(expandedReview === testimonial.name ? null : testimonial.name)}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--primary),0.2)]">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Floating badge */}
                    <motion.div 
                      className="absolute top-4 right-4 bg-gold/90 backdrop-blur-sm text-black px-3 py-1.5 rounded-full text-sm font-bold shadow-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                    >
                      {isFrench ? testimonial.highlight : testimonial.highlightEn}
                    </motion.div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Quote icon */}
                    <Quote className="absolute -top-6 left-4 w-10 h-10 text-primary/60 group-hover:text-primary transition-colors" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]" />
                      ))}
                    </div>

                    {/* Name */}
                    <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
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
                        <span className="font-medium text-white">{isFrench ? "Objectif:" : "Goal:"}</span>{" "}
                        {isFrench ? testimonial.objective : testimonial.objectiveEn}
                      </p>
                    </div>

                    {/* Read more indicator */}
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>{isFrench ? "Lire l'histoire" : "Read the story"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              {isFrench ? "Prêt à écrire votre histoire?" : "Ready to write your story?"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {isFrench
                ? "Rejoignez nos clients satisfaits et commencez votre transformation dès aujourd'hui."
                : "Join our satisfied clients and start your transformation today."}
            </p>
            <Link to="/#contact">
              <Button size="lg" className="gap-2">
                {isFrench ? "Commencer maintenant" : "Start now"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

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
                alt={`${selectedImage.name} transformation`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
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
      <Footer />
    </main>
    </>
  );
};

export default CustomerFeedback;
