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
            
            {/* Instagram CTA Button */}
            <div className="flex justify-center">
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-xl text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
                <span>{t("Pour avoir des conseils suis-nous et abonne-toi !", "Follow us for tips and subscribe!")}</span>
              </motion.a>
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
