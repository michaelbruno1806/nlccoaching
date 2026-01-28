import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Dumbbell, Activity, Bone, Heart, Shield, Trophy, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import SEOHead from "@/components/SEOHead";
import aboutCoach from "@/assets/about-coach.png";
import methodTraining from "@/assets/method-training.jpg";

const Parcours = () => {
  const { language } = useLanguage();
  const missionRef = useRef(null);
  const origineRef = useRef(null);
  const forceRef = useRef(null);
  const philosophyRef = useRef(null);
  
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const origineInView = useInView(origineRef, { once: true, margin: "-100px" });
  const forceInView = useInView(forceRef, { once: true, margin: "-100px" });
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });

  const benefits = [
    { icon: Activity, label: language === 'fr' ? "Améliore la posture et la mobilité" : "Improves posture and mobility" },
    { icon: Target, label: language === 'fr' ? "Favorise la perte de masse grasse" : "Promotes fat loss" },
    { icon: Bone, label: language === 'fr' ? "Renforce la densité osseuse" : "Strengthens bone density" },
    { icon: Heart, label: language === 'fr' ? "Soutient la réathlétisation" : "Supports re-athletization" },
    { icon: Dumbbell, label: language === 'fr' ? "Équilibre le métabolisme" : "Balances metabolism" },
    { icon: Shield, label: language === 'fr' ? "Développe la confiance physique" : "Develops physical confidence" },
  ];

  const experiences = [
    {
      icon: Users,
      title: language === 'fr' ? "Particuliers" : "Individuals",
      description: language === 'fr' 
        ? "Des particuliers souhaitant transformer leur silhouette"
        : "Individuals wishing to transform their figure"
    },
    {
      icon: Award,
      title: language === 'fr' ? "Entreprises" : "Companies",
      description: language === 'fr'
        ? "Différentes entreprises (Orange, La Foir'Fouille) dans le cadre d'ateliers Sport-Santé reconnus par la Sécurité sociale"
        : "Various companies (Orange, La Foir'Fouille) through Sport-Health workshops recognized by Social Security"
    },
    {
      icon: Trophy,
      title: language === 'fr' ? "Athlètes" : "Athletes",
      description: language === 'fr'
        ? "Des athlètes, dont Cécile, préparée jusqu'au Championnat de France de force athlétique"
        : "Athletes, including Cécile, prepared for the French Powerlifting Championship"
    },
  ];

  const philosophyItems = [
    {
      title: language === 'fr' ? "Performance Durable" : "Sustainable Performance",
      description: language === 'fr' ? "Renforcer la force, la mobilité et la technique sans blessure." : "Strengthen force, mobility and technique without injury."
    },
    {
      title: language === 'fr' ? "Suivi personnalisé" : "Personalized Follow-up",
      description: language === 'fr' ? "Programmes ajustés à votre niveau et vos objectifs." : "Programs adjusted to your level and goals."
    },
    {
      title: language === 'fr' ? "Résultats mesurables" : "Measurable Results",
      description: language === 'fr' ? "Progression concrète, chiffrée et visible." : "Concrete, quantified and visible progression."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={language === 'fr' ? "Parcours - Noa Liam Politino" : "Journey - Noa Liam Politino"}
        description={language === 'fr' 
          ? "Découvrez le parcours de Noa Liam Politino, coach sportif et préparateur physique. De La Réunion à Lille, une méthode née du terrain."
          : "Discover Noa Liam Politino's journey, sports coach and physical trainer. From Réunion Island to Lille, a method born from the field."
        }
        keywords="Noa Liam Politino, parcours coach, BPJEPS, DJEPS, force athlétique, préparateur physique Lille"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-6"
              >
                {language === 'fr' ? 'Parcours' : 'Journey'}
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              >
                {language === 'fr' ? 'UNE MÉTHODE NÉE' : 'A METHOD BORN'}{' '}
                <span className="text-gradient">{language === 'fr' ? 'DU TERRAIN' : 'FROM THE FIELD'}</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10"
              >
                {language === 'fr' 
                  ? "Coach sportif, préparateur physique & entraineur dans la métropole lilloise"
                  : "Sports coach, physical trainer & coach in the Lille metropolitan area"
                }
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a href="#mission">
                  <Button variant="gold" size="lg" className="group">
                    {language === 'fr' ? 'Découvrir' : 'Discover'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src={methodTraining}
                  alt={language === 'fr' ? "Coach en action" : "Coach in action"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-gold/30 rounded-bl-2xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-gold/30 rounded-tr-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                {language === 'fr' ? 'Notre Mission' : 'Our Mission'}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                {language === 'fr' ? 'Force. Discipline.' : 'Strength. Discipline.'}{' '}
                <span className="text-gradient">{language === 'fr' ? 'Résultats durables.' : 'Lasting Results.'}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {language === 'fr'
                  ? "Chez NLC Coaching, nous aidons les femmes et les hommes à retrouver un corps fort, mobile et performant."
                  : "At NLC Coaching, we help women and men regain a strong, mobile and performing body."
                }
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'fr'
                  ? "Notre mission : vous accompagner à reprendre le contrôle de votre corps, à perdre du poids durablement et à atteindre vos objectifs physiques sans blessure, grâce à un suivi structuré, exigeant et bienveillant."
                  : "Our mission: to help you regain control of your body, lose weight sustainably and achieve your physical goals without injury, through structured, demanding and caring support."
                }
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={aboutCoach}
                  alt="NLC Coaching Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-gold/30 rounded-bl-2xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-gold/30 rounded-tr-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Origine Section */}
      <section ref={origineRef} className="py-32 bg-gradient-to-b from-background via-card/40 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/8 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={origineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={origineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6 px-4 py-2 border border-gold/20 rounded-full bg-gold/5"
              >
                {language === 'fr' ? 'Origine' : 'Origin'}
              </motion.span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {language === 'fr' ? 'Le parcours de' : 'The journey of'}{' '}
                <span className="text-gradient">Noa Liam Politino</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gold/50 to-gold mx-auto rounded-full" />
            </div>
            
            <div className="space-y-8 text-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={origineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-foreground/90 leading-relaxed"
              >
                {language === 'fr'
                  ? "Fondé par Noa Liam Politino, coach sportif, préparateur physique et entraineur installé dans la métropole lilloise, NLC Coaching s'appuie sur un parcours profondément ancré dans la culture du sport et de la performance."
                  : "Founded by Noa Liam Politino, sports coach, physical trainer and coach based in the Lille metropolitan area, NLC Coaching relies on a background deeply rooted in the culture of sport and performance."
                }
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={origineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-muted-foreground leading-relaxed"
              >
                {language === 'fr'
                  ? "Originaire de l'océan Indien, Noa-liam a grandi entre montagnes, mer et terrains de rugby, au contact de la discipline, du collectif et du dépassement. Plusieurs fois champion de La Réunion avec son équipe, il s'est ensuite orienté vers l'haltérophilie et la préparation physique."
                  : "Originally from the Indian Ocean, Noa-liam grew up between mountains, sea and rugby fields, in contact with discipline, teamwork and surpassing oneself. Several times champion of Réunion Island with his team, he then turned to weightlifting and physical preparation."
                }
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={origineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground leading-relaxed"
              >
                {language === 'fr'
                  ? "Après avoir passé son BPJEPS à 18 ans, puis une première année en Licence STAPS à 19 ans, il a choisi la voie du DJEPS dans les métiers de la force et de la coordination de projet sportif : une formation plus concrète, centrée sur la performance et l'entraînement."
                  : "After passing his BPJEPS at 18, then a first year in a STAPS degree at 19, he chose the DJEPS path in strength professions and sports project coordination: a more concrete training, focused on performance and training."
                }
              </motion.p>
            </div>

            {/* Experiences */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={origineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="bg-card/50 border border-gold/20 rounded-2xl p-6 hover:border-gold/40 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{exp.title}</h3>
                    <p className="text-muted-foreground text-sm">{exp.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Force Section */}
      <section ref={forceRef} className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={forceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={forceInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6 px-4 py-2 border border-gold/20 rounded-full bg-gold/5"
            >
              {language === 'fr' ? 'Les Bénéfices' : 'The Benefits'}
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              {language === 'fr' 
                ? "Pourquoi les sports de force sont faits pour "
                : "Why strength sports are for "
              }
              <span className="text-gradient">{language === 'fr' ? "tout le monde" : "everyone"}</span>
              {language === 'fr' ? " ?" : "?"}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {language === 'fr'
                ? "La force n'est pas réservée aux athlètes — c'est la base de la santé. Chez NLC Coaching, nous croyons que les méthodes issues des métiers de la force sont l'avenir du coaching moderne."
                : "Strength is not reserved for athletes — it's the foundation of health. At NLC Coaching, we believe that methods from strength professions are the future of modern coaching."
              }
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={forceInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-gold/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl flex items-center justify-center mb-4 group-hover:from-gold/30 group-hover:to-gold/10 transition-colors">
                    <IconComponent className="w-7 h-7 text-gold" />
                  </div>
                  <p className="font-medium text-foreground">{benefit.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-32 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-6 px-4 py-2 border border-gold/20 rounded-full bg-gold/5"
            >
              {language === 'fr' ? 'Notre Philosophie' : 'Our Philosophy'}
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {language === 'fr' ? 'Performance, discipline,' : 'Performance, discipline,'}{' '}
              <span className="text-gradient">{language === 'fr' ? 'bienveillance' : 'care'}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {language === 'fr'
                ? "Chez NLC Coaching, nous allions les principes du sport de haut niveau à une approche humaine et accessible. Pas de promesses miracles, pas de discours creux : une méthode claire, personnalisée et mesurable."
                : "At NLC Coaching, we combine high-level sport principles with a human and accessible approach. No miracle promises, no empty talk: a clear, personalized and measurable method."
              }
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {philosophyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-gold/10 absolute -top-6 -left-2">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="relative pt-8">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-t from-gold/5 to-transparent relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Users className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {language === 'fr' ? 'Une nouvelle génération de' : 'A new generation of'}{' '}
              <span className="text-gradient">{language === 'fr' ? 'coachs' : 'coaches'}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {language === 'fr'
                ? "Noa Liam incarne une nouvelle génération de coachs : exigeante, à l'écoute et connectée à la réalité des clients. Une équipe jeune, sérieuse et passionnée, plaçant discipline, technique et confiance au cœur de chaque progression."
                : "Noa Liam embodies a new generation of coaches: demanding, attentive and connected to clients' reality. A young, serious and passionate team, placing discipline, technique and confidence at the heart of every progression."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/formules">
                <Button variant="gold" size="lg" className="group">
                  {language === 'fr' ? 'Les Formules' : 'Programs'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/#contact">
                <Button variant="goldOutline" size="lg">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Parcours;
