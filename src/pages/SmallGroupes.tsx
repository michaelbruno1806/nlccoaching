import { motion } from "framer-motion";
import { ArrowLeft, Users, Heart, Zap, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import BookingFormSection from "@/components/BookingFormSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import serviceGroup from "@/assets/service-group.jpg";
import transformation1 from "@/assets/transformation-1.png";
import transformation2 from "@/assets/transformation-2.png";
import transformation3 from "@/assets/transformation-3.png";
import transformation4 from "@/assets/transformation-4.png";

const SmallGroupes = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  const benefits = [
    {
      icon: Users,
      title: isFrench ? "Maximum 6 Personnes" : "Maximum 6 People",
      description: isFrench 
        ? "Groupes limités pour garantir une attention réelle et un encadrement précis pour chacun."
        : "Limited groups to guarantee real attention and precise supervision for everyone."
    },
    {
      icon: Heart,
      title: isFrench ? "Ambiance Motivante" : "Motivating Atmosphere",
      description: isFrench 
        ? "Profite de l'énergie et du soutien du groupe pour rester motivé(e) séance après séance."
        : "Benefit from the energy and support of the group to stay motivated session after session."
    },
    {
      icon: Zap,
      title: isFrench ? "Exercices Adaptés" : "Adapted Exercises",
      description: isFrench 
        ? "Chaque exercice est adapté à ton niveau tout en conservant la qualité d'un accompagnement individuel."
        : "Each exercise is adapted to your level while maintaining the quality of individual coaching."
    },
    {
      icon: Trophy,
      title: isFrench ? "Convivialité & Performance" : "Friendliness & Performance",
      description: isFrench 
        ? "Le parfait équilibre entre convivialité, performance et encadrement sur mesure."
        : "The perfect balance between friendliness, performance and tailored supervision."
    },
  ];

  const transformations = [transformation1, transformation2, transformation3, transformation4];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={serviceGroup}
            alt="Small Groupes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        </div>

        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <Link to="/formules">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="ghost" className="mb-8 gap-2 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4" />
                {isFrench ? "Retour aux formules" : "Back to packages"}
              </Button>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-primary uppercase tracking-[0.4em] text-sm font-medium mb-6"
            >
              {isFrench ? "Groupes" : "Groups"}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient">SMALL</span>
              <br />
              <span className="text-foreground/90">GROUPES</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8"
            >
              {isFrench
                ? "L'énergie du groupe, la précision d'un coaching personnalisé, pour t'entraîner avec motivation et efficacité."
                : "The energy of the group, the precision of personalized coaching, to train with motivation and efficiency."}
            </motion.p>

            {/* Pricing Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="inline-block bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">30</span>
                <span className="text-xl text-muted-foreground">€ / {isFrench ? "personne" : "person"}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {isFrench ? "L'ÉNERGIE DU GROUPE" : "THE ENERGY OF THE GROUP"}
                <br />
                <span className="text-gradient">{isFrench ? "LA PRÉCISION DU COACHING" : "THE PRECISION OF COACHING"}</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {isFrench
                    ? "Le small groups te permet de t'entraîner dans une ambiance motivante, tout en profitant d'un suivi professionnel et personnalisé."
                    : "Small groups allow you to train in a motivating atmosphere, while benefiting from professional and personalized follow-up."}
                </p>
                <p>
                  {isFrench
                    ? "Les séances se déroulent en groupes de maximum 6 personnes, afin que chacun bénéficie d'une attention réelle, d'un encadrement précis et d'exercices adaptés à son niveau."
                    : "Sessions take place in groups of maximum 6 people, so that everyone benefits from real attention, precise supervision and exercises adapted to their level."}
                </p>
                <p>
                  {isFrench
                    ? "Tu profites de l'énergie et du soutien du groupe, tout en conservant la qualité d'un accompagnement individuel."
                    : "You benefit from the energy and support of the group, while maintaining the quality of individual coaching."}
                </p>
                <p>
                  {isFrench
                    ? "Que ton objectif soit de te remettre en forme, de progresser ou simplement de rester motivé(e), ce format t'offre le parfait équilibre entre convivialité, performance et encadrement sur mesure."
                    : "Whether your goal is to get back in shape, progress or simply stay motivated, this format offers you the perfect balance between friendliness, performance and tailored supervision."}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Small Groups Section */}
      <section className="py-16 bg-card/50 border-y border-border/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "POURQUOI CHOISIR" : "WHY CHOOSE"}
              <span className="text-gradient"> SMALL GROUPES ?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "01",
                title: isFrench ? "Motivation Collective" : "Collective Motivation",
                description: isFrench 
                  ? "L'énergie du groupe te pousse à te dépasser à chaque séance."
                  : "The energy of the group pushes you to surpass yourself in every session."
              },
              {
                number: "02",
                title: isFrench ? "Prix Avantageux" : "Competitive Price",
                description: isFrench 
                  ? "Profite d'un coaching de qualité à un tarif accessible."
                  : "Enjoy quality coaching at an accessible rate."
              },
              {
                number: "03",
                title: isFrench ? "Réseau & Soutien" : "Network & Support",
                description: isFrench 
                  ? "Crée des liens avec des personnes partageant les mêmes objectifs."
                  : "Build connections with people sharing the same goals."
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary/20 mb-4">{item.number}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <BookingFormSection serviceName={isFrench ? "le Small Groupes" : "Small Groups"} />

      {/* Testimonials/Transformations */}
      <section className="py-24 bg-card/50 border-y border-border/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "OPTIMISE TON PARCOURS DE" : "OPTIMIZE YOUR"}
              <br />
              <span className="text-gradient">PERFORMANCE</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isFrench
                ? "Nos clients partagent leur expérience, leur progression et la transformation qu'ils ont vécue à nos côtés."
                : "Our clients share their experience, progress and the transformation they experienced with us."}
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
            {[...transformations, ...transformations].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 md:w-80 snap-center"
              >
                <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                  <img
                    src={img}
                    alt={`Transformation ${(index % 4) + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-gold/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {isFrench ? "PRÊT À REJOINDRE LE GROUPE ?" : "READY TO JOIN THE GROUP?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {isFrench
                ? "Rejoins-nous et profite de l'énergie collective pour atteindre tes objectifs."
                : "Join us and benefit from the collective energy to achieve your goals."}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="text-lg px-8 py-6">
                  {isFrench ? "Réserver ma place" : "Reserve my spot"}
                </Button>
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/formules">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    {isFrench ? "Voir les formules" : "View packages"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
    </>
  );
};

export default SmallGroupes;
