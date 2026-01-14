import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Bone, Zap, Activity, Heart, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import aboutCoach from "@/assets/about-coach-new.png";
import coachBackground from "@/assets/coach-background.jpg";
import spineIcon from "@/assets/spine-icon.png";
import methodTraining from "@/assets/method-training.jpg";
import coachSquat from "@/assets/coach-squat.jpg";
import coachThinking from "@/assets/coach-thinking.jpg";
import coachExplaining from "@/assets/coach-explaining.jpg";
const APropos = () => {
  const {
    language
  } = useLanguage();
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const origineRef = useRef(null);
  const forceRef = useRef(null);
  const philosophyRef = useRef(null);
  const heroInView = useInView(heroRef, {
    once: true
  });
  const missionInView = useInView(missionRef, {
    once: true,
    margin: "-100px"
  });
  const origineInView = useInView(origineRef, {
    once: true,
    margin: "-100px"
  });
  const forceInView = useInView(forceRef, {
    once: true,
    margin: "-100px"
  });
  const philosophyInView = useInView(philosophyRef, {
    once: true,
    margin: "-100px"
  });
  const benefits = [{
    icon: null,
    image: spineIcon,
    label: language === 'fr' ? "Améliore la posture et la mobilité" : "Improves posture and mobility"
  }, {
    icon: Scale,
    label: language === 'fr' ? "Favorise la perte de masse grasse" : "Promotes fat loss"
  }, {
    icon: Bone,
    label: language === 'fr' ? "Renforce la densité osseuse" : "Strengthens bone density"
  }, {
    icon: Zap,
    label: language === 'fr' ? "Soutient la réathlétisation" : "Supports re-athletization"
  }, {
    icon: Activity,
    label: language === 'fr' ? "Équilibre le métabolisme" : "Balances metabolism"
  }, {
    icon: Heart,
    label: language === 'fr' ? "Développe la confiance physique" : "Develops physical confidence"
  }];
  const philosophyItems = [{
    title: language === 'fr' ? "Performance" : "Performance",
    description: language === 'fr' ? "Renforcer la force, la mobilité et la technique sans blessure." : "Strengthen force, mobility and technique without injury."
  }, {
    title: language === 'fr' ? "Discipline" : "Discipline",
    description: language === 'fr' ? "Programmes ajustés à votre niveau et vos objectifs." : "Programs adjusted to your level and goals."
  }, {
    title: language === 'fr' ? "Bienveillance" : "Benevolence",
    description: language === 'fr' ? "Progression concrète, chiffrée et visible." : "Concrete, quantified and visible progression."
  }];
  return <div className="min-h-screen bg-background">
      <SEOHead title="À Propos - Notre Histoire et Philosophie" description="Découvrez NLC Coaching, fondé par Noa Liam Politino. Coach sportif et préparateur physique à Wasquehal, métropole lilloise. Notre mission : performance, discipline et bienveillance." keywords="Noa Liam Politino, coach sportif Wasquehal, préparateur physique Lille, histoire NLC Coaching, philosophie coaching" />
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span initial={{
          opacity: 0,
          y: 20
        }} animate={heroInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6
        }} className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-6">
            {language === 'fr' ? 'À Propos' : 'About Us'}
          </motion.span>
          
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={heroInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block">{language === 'fr' ? 'À PROPOS DE' : 'ABOUT'}</span>
            <span className="block text-gradient">NLC COACHING</span>
          </motion.h1>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={heroInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {language === 'fr' ? "Coach sportif, préparateur physique & entraineur dans la force basé dans la métropole lilloise." : "Sports coach, physical trainer & strength coach based in the Lille metropolitan area."}
          </motion.p>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={heroInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.6
        }}>
            <a href="#mission">
              <Button variant="gold" size="lg" className="group">
                {language === 'fr' ? 'Découvrir' : 'Discover'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" ref={missionRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={missionInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.8
          }} className="">
              <p className="font-display text-2xl font-bold leading-relaxed mb-6">
                <span className="text-foreground my-[32px] text-4xl">{language === 'fr' ? 'Force. Discipline. ' : 'Strength. Discipline. '}</span>
                <span className="text-gradient text-4xl">{language === 'fr' ? 'Résultats durables.' : 'Lasting Results.'}</span>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {language === 'fr' ? "Chez NLC Coaching, nous aidons les femmes et les hommes à retrouver un corps fort, mobile et performant." : "At NLC Coaching, we help women and men regain a strong, mobile and performing body."}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-8">
                <span className="font-display text-4xl md:text-5xl font-bold text-gradient">{language === 'fr' ? 'Notre mission : ' : 'Our mission: '}</span>
                {language === 'fr' ? "vous accompagner à reprendre le contrôle de votre corps, à perdre du poids durablement et à atteindre vos objectifs physiques sans blessure, grâce à un suivi structuré, exigeant et bienveillant." : "to help you regain control of your body, lose weight sustainably and achieve your physical goals without injury, through structured, demanding and caring support."}
              </p>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={missionInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img src={coachExplaining} alt="NLC Coaching Mission" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-gold/30 rounded-bl-2xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-gold/30 rounded-tr-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Origine Section */}
      <section ref={origineRef} className="py-32 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content - Left Side */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={origineInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.8
          }} className="space-y-8">
              {/* Section Header */}
              <div className="mb-8">
                <motion.span initial={{
                opacity: 0,
                y: 10
              }} animate={origineInView ? {
                opacity: 1,
                y: 0
              } : {}} transition={{
                duration: 0.5
              }} className="inline-block text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6 px-4 py-2 border border-gold/20 rounded-full bg-gold/5">
                  {language === 'fr' ? 'Parcours' : 'Journey'}
                </motion.span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {language === 'fr' ? 'Une méthode née du' : 'A method born from the'}{' '}
                  <span className="text-gradient">{language === 'fr' ? 'terrain' : 'field'}</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-gold/50 to-gold rounded-full" />
              </div>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={origineInView ? {
              opacity: 1,
              y: 0
            } : {}} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="text-muted-foreground leading-relaxed">
                {language === 'fr' ? "Fondé par Noa Liam Politino, coach sportif, préparateur physique et entraineur en force installé dans la métropole lilloise, NLC Coaching s'appuie sur un parcours profondément ancré dans la culture du sport et de la performance." : "Founded by Noa Liam Politino, sports coach, physical trainer and strength coach based in the Lille metropolitan area, NLC Coaching relies on a background deeply rooted in the culture of sport and performance."}
              </motion.p>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={origineInView ? {
              opacity: 1,
              y: 0
            } : {}} transition={{
              duration: 0.6,
              delay: 0.3
            }} className="text-muted-foreground leading-relaxed">
                {language === 'fr' ? "Originaire de l'océan Indien, Noa-liam a grandi entre montagnes, mer et terrains de rugby, au contact de la discipline, du collectif et du dépassement. Plusieurs fois champion de La Réunion avec son équipe, il s'est ensuite orienté vers l'haltérophilie et la préparation physique." : "Originally from the Indian Ocean, Noa-liam grew up between mountains, sea and rugby fields, in contact with discipline, teamwork and surpassing oneself. Several times champion of Réunion Island with his team, he then turned to weightlifting and physical preparation."}
              </motion.p>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={origineInView ? {
              opacity: 1,
              y: 0
            } : {}} transition={{
              duration: 0.6,
              delay: 0.4
            }} className="text-muted-foreground leading-relaxed">
                {language === 'fr' ? "Après avoir passé son BPJEPS AF à 18 ans, puis une première année en Licence STAPS à 19 ans, il a choisi la voie du DEJEPS dans les métiers de la force et de la coordination de projet sportif : une formation plus concrète, centrée sur la performance et l'entraînement." : "After passing his BPJEPS AF at 18, then a first year in a STAPS degree at 19, he chose the DEJEPS path in strength professions and sports project coordination: a more concrete training, focused on performance and training."}
              </motion.p>
            </motion.div>
            
            {/* Image - Right Side */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={origineInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img src={methodTraining} alt={language === 'fr' ? "Coach en action" : "Coach in action"} className="w-full h-full object-cover" />
              </div>
              {/* Corner decorations */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-gold/40 rounded-tr-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-gold/40 rounded-bl-xl" />
            </motion.div>
          </div>
          
          {/* Experiences Card - Below */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={origineInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.5
        }} className="mt-20 max-w-3xl">
            <div className="bg-gradient-to-br from-card via-card/80 to-card/60 rounded-2xl p-8 border border-gold/20 shadow-xl shadow-black/20 relative overflow-hidden">
              {/* Card glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
              
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-gold" />
                {language === 'fr' ? "Expériences" : "Experience"}
              </h3>
              
              <ul className="space-y-5 relative z-10">
                <li className="flex items-start gap-4 group">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gold mt-2.5 group-hover:scale-150 transition-transform" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {language === 'fr' ? "Des particuliers souhaitant transformer leur silhouette" : "Individuals wishing to transform their figure"}
                  </span>
                </li>
                <li className="flex items-start gap-4 group">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gold mt-2.5 group-hover:scale-150 transition-transform" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {language === 'fr' ? "Entreprises (Orange, La Foir'Fouille) — ateliers Sport-Santé" : "Companies (Orange, La Foir'Fouille) — Sport-Health workshops"}
                  </span>
                </li>
                <li className="flex items-start gap-4 group">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gold mt-2.5 group-hover:scale-150 transition-transform" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {language === 'fr' ? "Athlètes préparés au Championnat de France" : "Athletes prepared for French Championship"}
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Force Section */}
      <section ref={forceRef} className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={forceInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.8
        }} className="text-center mb-20">
            <motion.span initial={{
            opacity: 0,
            y: 10
          }} animate={forceInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5
          }} className="inline-block text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6 px-4 py-2 border border-gold/20 rounded-full bg-gold/5">
              {language === 'fr' ? 'Les Bénéfices' : 'The Benefits'}
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              {language === 'fr' ? "Pourquoi les sports de force sont faits pour " : "Why strength sports are for "}
              <span className="text-gradient">{language === 'fr' ? "tout le monde" : "everyone"}</span>
              {language === 'fr' ? " ?" : "?"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold/50 to-gold mx-auto rounded-full mb-8" />
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {language === 'fr' ? "La force n'est pas réservée aux athlètes — c'est la base de la santé. Chez NLC Coaching, nous croyons que les méthodes issues des métiers de la force sont l'avenir du coaching moderne." : "Strength is not reserved for athletes — it's the foundation of health. At NLC Coaching, we believe that methods from strength professions are the future of modern coaching."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30,
            scale: 0.95
          }} animate={forceInView ? {
            opacity: 1,
            y: 0,
            scale: 1
          } : {}} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="group relative bg-gradient-to-br from-card/80 to-card/40 border border-border/50 rounded-2xl p-8 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-300" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                    {benefit.image ? <img src={benefit.image} alt="" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" /> : benefit.icon ? <benefit.icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform" /> : null}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{benefit.label}</h3>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-32 bg-gradient-to-b from-card/30 via-card/50 to-card/30 relative overflow-hidden">
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={philosophyInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.8
        }} className="text-center mb-20">
            <motion.span initial={{
            opacity: 0,
            y: 10
          }} animate={philosophyInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5
          }} className="inline-block text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6 px-4 py-2 border border-gold/20 rounded-full bg-gold/5">
              {language === 'fr' ? 'Notre Philosophie' : 'Our Philosophy'}
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {language === 'fr' ? 'Performance, discipline,' : 'Performance, discipline,'}{' '}
              <span className="text-gradient">{language === 'fr' ? 'bienveillance.' : 'caring.'}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold/50 to-gold mx-auto rounded-full mb-8" />
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {language === 'fr' ? "Chez NLC Coaching, nous croyons en une approche du sport qui allie performance, discipline et bienveillance. Chaque accompagnement est pensé pour permettre une progression durable et mesurable." : "At NLC Coaching, we believe in a sports approach that combines performance, discipline and kindness. Each coaching is designed to enable sustainable and measurable progress."}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Philosophy Cards */}
            <div className="grid gap-8">
              {philosophyItems.map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} animate={philosophyInView ? {
              opacity: 1,
              y: 0
            } : {}} transition={{
              duration: 0.6,
              delay: index * 0.15
            }} className="group relative bg-gradient-to-b from-card to-card/60 border border-border/50 rounded-2xl p-8 hover:border-gold/40 transition-all duration-300">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gold/0 group-hover:bg-gold/5 transition-all duration-300" />
                  
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-xl font-display font-bold text-gold">{['I', 'II', 'III'][index]}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>)}
            </div>
            
            {/* Image */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={philosophyInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="relative hidden lg:block">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img src={coachThinking} alt={language === 'fr' ? "Coach en réflexion" : "Coach thinking"} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border-r-2 border-t-2 border-gold/40 rounded-tr-xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border-l-2 border-b-2 border-gold/40 rounded-bl-xl" />
            </motion.div>
          </div>
        </div>
      </section>


      {/* New Generation Section */}
      <section className="py-12 relative overflow-hidden min-h-[600px] flex flex-col">
        {/* Background Image - Full Banner */}
        <div className="absolute inset-0 w-full h-full">
          <img src={coachBackground} alt="Coach background" className="w-full h-full object-cover" style={{
          objectPosition: 'center 30%'
        }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-background/90" />
        </div>
        
        {/* Text Content - Positioned over the O */}
        <div className="container mx-auto px-6 relative z-10 flex justify-center pt-8 pl-20 lg:pl-32">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-3xl">
            <Users className="w-10 h-10 text-gold mb-3 mx-auto" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {language === 'fr' ? 'Une nouvelle génération de' : 'A new generation of'}{' '}
              <span className="text-gradient">{language === 'fr' ? 'coachs' : 'coaches'}</span>
            </h2>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              {language === 'fr' ? "Noa Liam incarne une nouvelle génération de coachs : exigeante, à l'écoute et connectée à la réalité des clients. Une équipe jeune, sérieuse et passionnée, plaçant discipline, technique et confiance au cœur de chaque progression." : "Noa Liam embodies a new generation of coaches: demanding, attentive and connected to clients' reality. A young, serious and passionate team, placing discipline, technique and confidence at the heart of every progression."}
            </p>
          </motion.div>
        </div>
        
        {/* CTA Buttons - Positioned to the right */}
        <div className="flex-1 flex items-center justify-center container mx-auto px-6 relative z-10 pl-20 lg:pl-32">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/formules">
              <Button variant="gold" size="lg" className="group text-lg px-8 py-6">
                {language === 'fr' ? 'Les Formules' : 'Programs'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="goldOutline" size="lg" className="text-lg px-8 py-6">
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default APropos;