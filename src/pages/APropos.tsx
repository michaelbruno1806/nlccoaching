import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Dumbbell, Activity, Bone, Heart, Shield, MapPin, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import aboutCoach from "@/assets/about-coach.png";

const APropos = () => {
  const { language } = useLanguage();
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const origineRef = useRef(null);
  const forceRef = useRef(null);
  const philosophyRef = useRef(null);
  const locationRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const origineInView = useInView(origineRef, { once: true, margin: "-100px" });
  const forceInView = useInView(forceRef, { once: true, margin: "-100px" });
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });
  const locationInView = useInView(locationRef, { once: true, margin: "-100px" });

  const benefits = [
    { icon: Activity, label: language === 'fr' ? "Améliore la posture et la mobilité" : "Improves posture and mobility" },
    { icon: Target, label: language === 'fr' ? "Favorise la perte de masse grasse" : "Promotes fat loss" },
    { icon: Bone, label: language === 'fr' ? "Renforce la densité osseuse" : "Strengthens bone density" },
    { icon: Heart, label: language === 'fr' ? "Soutient la réathlétisation" : "Supports re-athletization" },
    { icon: Dumbbell, label: language === 'fr' ? "Équilibre le métabolisme" : "Balances metabolism" },
    { icon: Shield, label: language === 'fr' ? "Développe la confiance physique" : "Develops physical confidence" },
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
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-6"
          >
            {language === 'fr' ? 'À Propos' : 'About Us'}
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            {language === 'fr' ? 'À PROPOS DE' : 'ABOUT'}{' '}
            <span className="text-gradient">NLC COACHING</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            {language === 'fr' 
              ? "Coach sportif, préparateur physique & entraineur dans la métropole lilloise"
              : "Sports coach, physical trainer & coach in the Lille metropolitan area"
            }
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#mission">
              <Button variant="gold" size="lg" className="group">
                {language === 'fr' ? 'Découvrir' : 'Discover'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="/#contact">
              <Button variant="goldOutline" size="lg">
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" ref={missionRef} className="py-24 relative overflow-hidden">
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
              <p className="text-muted-foreground leading-relaxed mb-8">
                {language === 'fr'
                  ? "Notre mission : vous accompagner à reprendre le contrôle de votre corps, à perdre du poids durablement et à atteindre vos objectifs physiques sans blessure, grâce à un suivi structuré, exigeant et bienveillant."
                  : "Our mission: to help you regain control of your body, lose weight sustainably and achieve your physical goals without injury, through structured, demanding and caring support."
                }
              </p>
              <div className="flex gap-4">
                <a href="/formules">
                  <Button variant="gold" className="group">
                    {language === 'fr' ? 'Les Formules' : 'Programs'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="/#contact">
                  <Button variant="goldOutline">
                    {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                  </Button>
                </a>
              </div>
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
      <section ref={origineRef} className="py-24 bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={origineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block text-center">
              {language === 'fr' ? 'Origine' : 'Origin'}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center">
              {language === 'fr' ? 'Une méthode née du' : 'A method born from the'}{' '}
              <span className="text-gradient">{language === 'fr' ? 'terrain' : 'field'}</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={origineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
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
              >
                {language === 'fr'
                  ? "Originaire de l'océan Indien, Noa-liam a grandi entre montagnes, mer et terrains de rugby, au contact de la rigueur, du collectif et du dépassement. Plusieurs fois champion de La Réunion avec son équipe, il s'est ensuite orienté vers l'haltérophilie et la préparation physique."
                  : "Originally from the Indian Ocean, Noa-liam grew up between mountains, sea and rugby fields, in contact with rigor, teamwork and surpassing oneself. Several times champion of Réunion Island with his team, he then turned to weightlifting and physical preparation."
                }
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={origineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {language === 'fr'
                  ? "Après avoir passé son BPJEPS à 18 ans, puis une première année en Licence STAPS à 19 ans, il a choisi la voie du DJEPS dans les métiers de la force et de la coordination de projet sportif : une formation plus concrète, centrée sur la performance et l'entraînement."
                  : "After passing his BPJEPS at 18, then a first year in a STAPS degree at 19, he chose the DJEPS path in strength professions and sports project coordination: a more concrete training, focused on performance and training."
                }
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={origineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-card/50 rounded-xl p-6 border border-border"
              >
                <p className="font-medium text-foreground mb-4">
                  {language === 'fr' ? "Depuis, il a accompagné :" : "Since then, he has supported:"}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">•</span>
                    <span>{language === 'fr' ? "Des particuliers souhaitant transformer leur silhouette" : "Individuals wishing to transform their figure"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">•</span>
                    <span>{language === 'fr' ? "Différentes entreprises (Orange, La Foir'Fouille) dans le cadre d'ateliers Sport-Santé reconnus par la Sécurité sociale" : "Various companies (Orange, La Foir'Fouille) as part of Sport-Health workshops recognized by Social Security"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-1">•</span>
                    <span>{language === 'fr' ? "Des athlètes, dont Cécile, qu'il a préparée jusqu'au Championnat de France de force athlétique" : "Athletes, including Cécile, whom he prepared up to the French Powerlifting Championship"}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Force Section */}
      <section ref={forceRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={forceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {language === 'fr' 
                ? "Pourquoi les sports de force sont faits pour tout le monde?"
                : "Why are strength sports for everyone?"
              }
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {language === 'fr'
                ? "La force n'est pas réservée aux athlètes — c'est la base de la santé. Chez NLC Coaching, nous croyons que les méthodes issues des métiers de la force sont l'avenir du coaching moderne."
                : "Strength is not reserved for athletes — it's the foundation of health. At NLC Coaching, we believe that methods from strength professions are the future of modern coaching."
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={forceInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card/50 border border-border rounded-xl p-6 hover:border-gold/50 transition-colors group"
              >
                <benefit.icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-lg font-semibold">{benefit.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-24 bg-card/30 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              {language === 'fr' ? 'Notre Philosophie' : 'Our Philosophy'}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {language === 'fr' ? 'Performance, rigueur,' : 'Performance, rigor,'}{' '}
              <span className="text-gradient">{language === 'fr' ? 'bienveillance.' : 'caring.'}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {language === 'fr'
                ? "Chez NLC Coaching, nous allions les principes du sport de haut niveau à une approche humaine et accessible. Pas de promesses miracles, pas de discours creux : une méthode claire, personnalisée et mesurable."
                : "At NLC Coaching, we combine high-level sport principles with a human and accessible approach. No miracle promises, no hollow speeches: a clear, personalized and measurable method."
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:border-gold/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-display font-bold text-gold">{index + 1}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section ref={locationRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={locationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <MapPin className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {language === 'fr' ? 'Où nous trouver?' : 'Where to find us?'}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {language === 'fr'
                ? "Basés à Wasquehal, nous intervenons sur l'ensemble de la métropole lilloise : Lille, Marcq-en-Barœul, Mouvaux, Croix, Bondues, Villeneuve-d'Ascq, Roubaix et alentours. Coaching en ligne également disponible."
                : "Based in Wasquehal, we operate throughout the Lille metropolitan area: Lille, Marcq-en-Barœul, Mouvaux, Croix, Bondues, Villeneuve-d'Ascq, Roubaix and surroundings. Online coaching also available."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/formules">
                <Button variant="gold" size="lg" className="group">
                  {language === 'fr' ? 'Les Formules' : 'Programs'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/#contact">
                <Button variant="goldOutline" size="lg">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Generation Section */}
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
              <a href="/formules">
                <Button variant="gold" size="lg" className="group">
                  {language === 'fr' ? 'Les Formules' : 'Programs'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="/#contact">
                <Button variant="goldOutline" size="lg">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default APropos;
