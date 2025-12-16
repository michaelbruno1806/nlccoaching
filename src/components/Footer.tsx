import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "#" },
      { label: "À Propos", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Programme Personnalisé", href: "#services" },
      { label: "Coaching Individuel", href: "#services" },
      { label: "Small Groupes", href: "#services" },
      { label: "Séance Découverte", href: "#contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions Légales", href: "#" },
      { label: "Politique de Confidentialité", href: "#" },
      { label: "CGV", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="py-20 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 w-96 h-48 bg-gold/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold">
                <span className="text-gradient">NLC</span>
                <span className="text-foreground ml-2">COACHING</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Transformer votre potentiel en performance. Coaching d'élite basé
              sur la science, la discipline et la performance humaine.
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
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-gold transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NLC Coaching. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground">
            Conçu avec passion pour la performance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
