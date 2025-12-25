import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import nlcLogo from "@/assets/nlc-logo.png";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: t("Accueil", "Home"), href: "#" },
        { label: t("À Propos", "About"), href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: t("Programme Personnalisé", "Personalized Program"), href: "#services" },
        { label: t("Coaching Individuel", "Individual Coaching"), href: "#services" },
        { label: t("Small Groupes", "Small Groups"), href: "#services" },
        { label: t("Séance Découverte", "Discovery Session"), href: "#contact" },
      ],
    },
    {
      title: t("Légal", "Legal"),
      links: [
        { label: t("Mentions Légales", "Legal Notice"), href: "/mentions-legales" },
        { label: t("RGPD & Cookies", "Privacy & Cookies"), href: "/rgpd-cookies" },
        { label: t("CGV", "Terms"), href: "/conditions-vente" },
      ],
    },
  ];

  return (
    <footer className="py-20 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 w-96 h-48 bg-gold/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <motion.img 
                src={nlcLogo} 
                alt="NLC Coaching" 
                className="h-14 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t(
                "Transformer votre potentiel en performance. Coaching d'élite basé sur la science, la discipline et la performance humaine.",
                "Transform your potential into performance. Elite coaching based on science, discipline, and human performance."
              )}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-gold/50 hover:text-gold transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-bold text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-gold transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-gold transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NLC Coaching. {t("Tous droits réservés.", "All rights reserved.")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("Conçu avec passion pour la performance", "Designed with passion for performance")}
          </p>
        </div>

        {/* Powered by MB18 Solutions */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border/50 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p 
            className="text-xs text-muted-foreground/60 tracking-[0.3em] uppercase mb-4"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Powered by
          </motion.p>
          
          <div className="relative group cursor-pointer">
            {/* Multiple layered glow effects */}
            <motion.div 
              className="absolute -inset-8 bg-gradient-to-r from-lime-400/30 via-lime-500/40 to-lime-400/30 blur-2xl rounded-full -z-10"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                scale: [0.9, 1.15, 0.9],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -inset-6 bg-gradient-to-r from-lime-400/20 to-lime-300/20 blur-xl rounded-full -z-10"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Electric pulse rings */}
            <motion.div 
              className="absolute inset-0 border-2 border-lime-400/50 rounded-lg -z-10"
              animate={{ 
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.3, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute inset-0 border border-lime-300/30 rounded-lg -z-10"
              animate={{ 
                scale: [1, 1.8, 2.5],
                opacity: [0.6, 0.2, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />

            {/* Main logo container */}
            <motion.div 
              className="relative px-6 py-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Shimmer overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: [-100, 200] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              />
              
              <div className="flex items-baseline">
                {/* MB with animated gradient */}
                <motion.span 
                  className="text-4xl font-display font-black tracking-tight relative"
                  animate={{
                    textShadow: [
                      "0 0 10px #84ff00, 0 0 20px #84ff00, 0 0 40px #a3ff00",
                      "0 0 20px #84ff00, 0 0 40px #84ff00, 0 0 60px #a3ff00, 0 0 80px #c0ff00",
                      "0 0 10px #84ff00, 0 0 20px #84ff00, 0 0 40px #a3ff00"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: "linear-gradient(90deg, #84ff00, #a3ff00, #84ff00, #c0ff00)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradient-shift 3s ease infinite"
                  }}
                >
                  MB
                </motion.span>
                
                {/* 18 with contrasting style */}
                <motion.span 
                  className="text-4xl font-display font-black tracking-tight text-foreground ml-0.5"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(255,255,255,0.3)",
                      "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(132,255,0,0.3)",
                      "0 0 5px rgba(255,255,255,0.3)"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
                >
                  18
                </motion.span>
              </div>
              
              {/* Underline flash effect */}
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent"
                animate={{ 
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Corner sparkles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-lime-400 rounded-full"
                style={{
                  top: i < 2 ? -4 : 'auto',
                  bottom: i >= 2 ? -4 : 'auto',
                  left: i % 2 === 0 ? -4 : 'auto',
                  right: i % 2 === 1 ? -4 : 'auto',
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
          
          <motion.p 
            className="text-xs text-muted-foreground/60 tracking-[0.5em] uppercase mt-3"
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
              letterSpacing: ["0.5em", "0.6em", "0.5em"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Solutions
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
