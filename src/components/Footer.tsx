import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import nlcLogo from "@/assets/nlc-coaching-logo.png";

const INSTAGRAM_URL = "https://www.instagram.com/nlc.coaching?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: t("Accueil", "Home"), href: "/" },
        { label: t("À Propos", "About"), href: "/a-propos" },
        { label: t("Formules", "Programs"), href: "/formules" },
        { label: t("Avis Clients", "Client Reviews"), href: "/avis-clients" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: t("Suivi Personnalisé", "Personalized Follow-up"), href: "/suivi-personnalise" },
        { label: t("Coaching Individuel", "Individual Coaching"), href: "/coaching-individuel" },
        { label: t("Small Groups", "Small Groups"), href: "/small-groupes" },
        { label: t("Carnets de Séances", "Session Packages"), href: "/carnets-seances" },
      ],
    },
    {
      title: t("Légal", "Legal"),
      links: [
        { label: t("Mentions Légales", "Legal Notice"), href: "/mentions-legales" },
        { label: t("RGPD & Cookies", "Privacy & Cookies"), href: "/rgpd-cookies" },
        { label: t("CGV", "Terms"), href: "/conditions-vente" },
        { label: "Admin", href: "/admin/login" },
      ],
    },
  ];

  return (
    <footer className="py-20 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 w-96 h-48 bg-gold/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand - Centered Logo */}
          <div className="lg:col-span-2 flex flex-col items-center text-center">
            <a href="#" className="inline-block mb-6">
              <motion.img 
                src={nlcLogo} 
                alt="NLC Coaching" 
                className="h-48 md:h-64 w-auto max-w-full mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </a>
            <p className="text-white/90 mb-6 max-w-sm text-base text-center">
              {t(
                "Transformer votre potentiel en performance. Coaching d'élite basé sur la science, la discipline et la performance humaine.",
                "Transform your potential into performance. Elite coaching based on science, discipline, and human performance."
              )}
            </p>
            
            {/* Instagram Section */}
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4"
            >
              {/* Instagram Logo */}
              <motion.div 
                className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center shadow-lg"
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, -5, 5, 0],
                  boxShadow: "0 0 30px rgba(253, 29, 29, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 15,
                  rotate: { duration: 0.4 }
                }}
              >
                <Instagram className="w-7 h-7 text-white" />
                
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10" />
              </motion.div>
              
              {/* Text */}
              <p className="text-white/80 group-hover:text-gold text-sm text-center max-w-xs transition-colors duration-300">
                {t("Suis-nous sur Instagram pour des conseils exclusifs", "Follow us on Instagram for exclusive tips")}
              </p>
            </motion.a>
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
                        className="text-white/80 hover:text-gold transition-colors duration-300 text-base"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-gold transition-colors duration-300 text-base"
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
          <p className="text-base text-white/80">
            © {new Date().getFullYear()} NLC Coaching. {t("Tous droits réservés.", "All rights reserved.")}
          </p>
          <p className="text-base text-white/80">
            {t("Conçu avec passion pour la performance", "Designed with passion for performance")}
          </p>
        </div>

        {/* Powered by MB18 Solutions */}
        <div className="mt-8 pt-6 border-t border-border/30 flex justify-center">
          <a 
            href="#" 
            className="group flex items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors duration-300"
          >
            {/* Network Logo with Animation */}
            <motion.div 
              className="relative w-5 h-5 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              {/* Central node */}
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-lime-500/60 group-hover:bg-lime-500/90 transition-colors"
                animate={{ 
                  boxShadow: ["0 0 0px rgba(132, 204, 22, 0)", "0 0 6px rgba(132, 204, 22, 0.4)", "0 0 0px rgba(132, 204, 22, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Orbiting nodes */}
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-muted-foreground/40 group-hover:bg-muted-foreground/70 transition-colors"
                  style={{
                    left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 7}px - 2px)`,
                    top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 7}px - 2px)`,
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 20 20">
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <motion.line
                    key={i}
                    x1="10"
                    y1="10"
                    x2={10 + Math.cos((angle * Math.PI) / 180) * 7}
                    y2={10 + Math.sin((angle * Math.PI) / 180) * 7}
                    className="stroke-muted-foreground/20 group-hover:stroke-lime-500/30 transition-colors"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </svg>
            </motion.div>
            
            <span className="text-[10px] tracking-[0.15em] uppercase font-medium">Powered by</span>
            <span className="text-xs font-bold tracking-wide">
              <span className="text-lime-500/60 group-hover:text-lime-500/90 transition-colors">MB</span>
              <span className="text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors">18</span>
              <span className="text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors ml-0.5">SOLUTIONS</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
