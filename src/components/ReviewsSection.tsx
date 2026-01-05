import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Star, Quote, Clock, Target, Trophy, X, ZoomIn, ArrowRight, Play, MessageCircle, Heart, ChevronLeft, ChevronRight } from "lucide-react";
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

// Additional text reviews without images
interface TextReview {
  name: string;
  review: string;
  reviewEn: string;
  highlight?: string;
  highlightEn?: string;
}

const textReviews: TextReview[] = [
  {
    name: "Thomas",
    review: "Liam est un coach exceptionnel. Il m'a aidé à perdre 10kg en 3 mois tout en gagnant en muscle. Son approche est professionnelle et motivante.",
    reviewEn: "Liam is an exceptional coach. He helped me lose 10kg in 3 months while gaining muscle. His approach is professional and motivating.",
    highlight: "-10kg en 3 mois",
    highlightEn: "-10kg in 3 months"
  },
  {
    name: "Sophie",
    review: "J'étais sceptique au début mais les résultats parlent d'eux-mêmes. Liam a su adapter les séances à mes besoins et me pousser à dépasser mes limites.",
    reviewEn: "I was skeptical at first but the results speak for themselves. Liam knew how to adapt the sessions to my needs and push me beyond my limits.",
    highlight: "Transformation totale",
    highlightEn: "Total transformation"
  },
  {
    name: "Antoine",
    review: "Le suivi nutritionnel combiné aux entraînements m'a permis d'atteindre mes objectifs plus rapidement que prévu. Merci Liam!",
    reviewEn: "The nutritional follow-up combined with training allowed me to reach my goals faster than expected. Thank you Liam!",
    highlight: "Objectifs dépassés",
    highlightEn: "Goals exceeded"
  },
  {
    name: "Julie",
    review: "Enfin un coach qui comprend les femmes! Liam m'a aidée à tonifier mon corps sans devenir trop musclée. Exactement ce que je voulais.",
    reviewEn: "Finally a coach who understands women! Liam helped me tone my body without becoming too muscular. Exactly what I wanted.",
    highlight: "Corps tonifié",
    highlightEn: "Toned body"
  },
  {
    name: "Marc",
    review: "Après une blessure, je pensais ne plus pouvoir faire de sport. Liam m'a accompagné dans ma rééducation et aujourd'hui je suis plus fort qu'avant!",
    reviewEn: "After an injury, I thought I couldn't exercise anymore. Liam accompanied me in my rehabilitation and today I'm stronger than before!",
    highlight: "Retour en force",
    highlightEn: "Back stronger"
  },
  {
    name: "Camille",
    review: "Les séances en small group sont géniales! L'ambiance est motivante et on se pousse les uns les autres. Je recommande à 100%!",
    reviewEn: "The small group sessions are great! The atmosphere is motivating and we push each other. I recommend 100%!",
    highlight: "Esprit d'équipe",
    highlightEn: "Team spirit"
  },
  {
    name: "Lucas",
    review: "Liam m'a préparé pour ma première compétition de powerlifting. Son expertise technique est impressionnante. J'ai fini sur le podium!",
    reviewEn: "Liam prepared me for my first powerlifting competition. His technical expertise is impressive. I finished on the podium!",
    highlight: "Podium 🏆",
    highlightEn: "Podium 🏆"
  },
  {
    name: "Emma",
    review: "Ce qui me plaît avec Liam, c'est qu'il ne vend pas du rêve. Il est honnête, direct et les résultats suivent. Un vrai professionnel.",
    reviewEn: "What I like about Liam is that he doesn't sell dreams. He's honest, direct and the results follow. A true professional.",
    highlight: "Pro et honnête",
    highlightEn: "Pro and honest"
  }
];

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

        {/* Dynamic Text Reviews Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-20"
        >
          <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
            <MessageCircle className="w-7 h-7 text-primary" />
            {isFrench ? "Ce Que Disent Nos Clients" : "What Our Clients Say"}
          </h3>
          
          {/* Animated marquee of text reviews */}
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -2000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {[...textReviews, ...textReviews, ...textReviews].map((review, index) => (
                <motion.div
                  key={`${review.name}-${index}`}
                  className="flex-shrink-0 w-80 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Quote className="w-6 h-6 text-primary/40 mb-3" />
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{isFrench ? review.review : review.reviewEn}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {review.name[0]}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{review.name}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                  {review.highlight && (
                    <div className="mt-3 inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      <Trophy className="w-3 h-3" />
                      {isFrench ? review.highlight : review.highlightEn}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
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
          <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Heart className="w-7 h-7 text-primary" />
            {isFrench ? "Témoignages Clients" : "Client Testimonials"}
          </h3>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
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
                onClick={() => setSelectedTestimonial(testimonial)}
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
                        <Star
                          key={i}
                          className="w-4 h-4 fill-gold text-gold drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]"
                        />
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
                        <span className="font-medium text-white">
                          {isFrench ? "Objectif:" : "Goal:"}
                        </span>{" "}
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
                whileHover={{ y: -5 }}
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

        {/* WhatsApp-style Messages - Horizontal Swipeable */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20 relative"
        >
          <div className="text-center mb-12">
            <motion.span 
              className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageCircle className="w-4 h-4" />
              {isFrench ? "Messages Clients" : "Client Messages"}
            </motion.span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "Optimise ton Parcours" : "Optimize Your Journey"}
            </h3>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              {isFrench
                ? "Découvrez les retours authentiques de nos clients."
                : "Discover authentic feedback from our clients."}
            </p>
          </div>
          
          {/* Horizontal Swipeable Container */}
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            {/* Swipe instruction */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                <ChevronLeft className="w-4 h-4 animate-pulse" />
                <span>{isFrench ? "Glissez" : "Swipe"}</span>
                <ChevronRight className="w-4 h-4 animate-pulse" />
              </div>
            </motion.div>
            
            {/* Scrollable messages container */}
            <div 
              className="flex gap-6 overflow-x-auto pb-6 pt-2 px-8 md:px-20 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {screenshots.map((screenshot, index) => {
                const times = ["09:41", "10:15", "14:32", "18:47"];
                const senderNames = ["Armand", "Magdalena", "Ricardo", "Ludivine"];
                const messages = isFrench 
                  ? ["Merci coach ! 💪", "Incroyable résultat !", "Tu gères Liam 🔥", "Trop contente !"]
                  : ["Thanks coach! 💪", "Incredible result!", "You rock Liam 🔥", "So happy!"];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-shrink-0 snap-center"
                  >
                    {/* WhatsApp Message Bubble - Bigger */}
                    <div 
                      className="relative bg-white dark:bg-[#202c33] rounded-2xl rounded-tl-none shadow-xl cursor-pointer group overflow-hidden w-[280px] md:w-[320px] lg:w-[360px]"
                      onClick={() => setSelectedImage({ image: screenshot, title: `Message de ${senderNames[index]}` })}
                    >
                      {/* Message tail */}
                      <div className="absolute -left-3 top-0 w-4 h-4">
                        <svg viewBox="0 0 8 13" className="w-full h-full">
                          <path fill="white" className="dark:fill-[#202c33]" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.567 0 5.188 0z"/>
                        </svg>
                      </div>
                      
                      {/* Sender name */}
                      <div className="px-4 pt-3">
                        <span className="text-sm font-semibold text-[#06cf9c]">{senderNames[index]}</span>
                      </div>
                      
                      {/* Image */}
                      <div className="p-2">
                        <img
                          src={screenshot}
                          alt={`Message from ${senderNames[index]}`}
                          className="rounded-xl w-full aspect-[3/4] object-cover group-hover:brightness-95 transition-all duration-300"
                        />
                      </div>
                      
                      {/* Text message */}
                      <div className="px-4 pb-1">
                        <p className="text-foreground text-sm">{messages[index]}</p>
                      </div>
                      
                      {/* Time and read status */}
                      <div className="flex items-center justify-end gap-1.5 px-4 pb-3">
                        <span className="text-xs text-muted-foreground/60">{times[index]}</span>
                        {/* Double check marks */}
                        <svg className="w-4 h-4 text-[#53bdeb]" viewBox="0 0 16 15" fill="currentColor">
                          <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                        </svg>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-black/60 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-200">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-primary/30 hover:bg-primary/60 transition-colors"
              />
            ))}
          </div>
          
          <motion.p 
            className="text-center text-muted-foreground/50 text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {isFrench ? "Glissez pour voir plus • Cliquez pour agrandir" : "Swipe to see more • Click to enlarge"}
          </motion.p>
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
            <Button size="lg" className="gap-2 group bg-gradient-to-r from-primary to-gold hover:from-primary/90 hover:to-gold/90 text-primary-foreground shadow-lg shadow-primary/20">
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