import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import nlcLogo from "@/assets/nlc-logo.png";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/noaliam_coaching/", label: "Instagram" },
];

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: t("Accueil", "Home"), href: "/" },
        { label: t("À Propos", "About"), href: "/a-propos" },
        { label: t("Formules", "Programs"), href: "/formules" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: t("Suivi Personnalisé", "Personalized Follow-up"), href: "/suivi-personnalise" },
        { label: t("Coaching Individuel", "Individual Coaching"), href: "/coaching-individuel" },
        { label: t("Small Groupes", "Small Groups"), href: "/small-groupes" },
        { label: t("Carnets de Séances", "Session Packages"), href: "/carnets-seances" },
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
        <div className="mt-8 pt-6 border-t border-border/30 flex justify-center">
          <a 
            href="#" 
            className="group flex items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors duration-300"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">Powered by</span>
            <span className="text-sm font-semibold">
              <span className="text-lime-500/60 group-hover:text-lime-500/80 transition-colors">MB</span>
              <span className="text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">18</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase">Solutions</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
