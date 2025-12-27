import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/hooks/useSiteContent";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();
  const { getContent } = useSiteContent();

  // Get contact info from database or use defaults
  const phoneNumber = getContent("contact_phone") || "+33 6 12 34 56 78";
  const emailAddress = getContent("contact_email") || "contact@nlccoaching.com";
  const location = getContent("contact_location") || "Wasquehal, France";
  const whatsappNumber = getContent("contact_whatsapp") || "23058035450";

  const WHATSAPP_MESSAGE = language === "fr" 
    ? "Bonjour! Je suis intéressé(e) par vos services de coaching NLC."
    : "Hello! I'm interested in your NLC coaching services.";

  const contactInfo = [
    {
      icon: Phone,
      label: t("Téléphone", "Phone"),
      value: phoneNumber,
      href: `tel:${phoneNumber.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: emailAddress,
      href: `mailto:${emailAddress}`,
    },
    {
      icon: MapPin,
      label: t("Localisation", "Location"),
      value: location,
      href: "#",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: t("Discuter maintenant", "Chat now"),
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
      isWhatsApp: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t("Message envoyé avec succès!", "Message sent successfully!"), {
        description: t("Nous vous répondrons dans les plus brefs délais.", "We will get back to you as soon as possible."),
      });
    }, 1500);
  };

  // Get discovery session content
  const discoveryTitle = getContent("discovery_title") || t("Séance découverte", "Discovery Session");
  const discoveryDescription = getContent("discovery_description") || t(
    "Réservez votre première séance gratuite et découvrez notre approche unique.",
    "Book your first free session and discover our unique approach."
  );
  const discoveryButton = getContent("discovery_button") || t("Réserver maintenant", "Book now");

  // Get section header content
  const sectionTitle = getContent("contact_title") || t("Prêt à transformer votre vie?", "Ready to transform your life?");
  const sectionSubtitle = getContent("contact_subtitle") || t(
    "Contactez-nous pour discuter de vos objectifs et découvrir comment nous pouvons vous accompagner vers l'excellence.",
    "Contact us to discuss your goals and discover how we can guide you towards excellence."
  );

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden bg-card"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {sectionTitle.includes("transform") || sectionTitle.includes("transformer") ? (
              <>
                {t("Prêt à", "Ready to")} <span className="text-gradient">{t("transformer", "transform")}</span> {t("votre vie?", "your life?")}
              </>
            ) : (
              sectionTitle
            )}
          </h2>
          <p className="text-muted-foreground text-lg">
            {sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={item.isWhatsApp ? (e) => {
                  e.preventDefault();
                  window.location.href = item.href;
                } : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl bg-background border transition-all duration-300 group ${
                  item.isWhatsApp 
                    ? "border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/10" 
                    : "border-border hover:border-gold/50"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  item.isWhatsApp 
                    ? "bg-[#25D366]/20 group-hover:bg-[#25D366]/30" 
                    : "bg-gold/10 group-hover:bg-gold/20"
                }`}>
                  <item.icon className={`w-5 h-5 ${item.isWhatsApp ? "text-[#25D366]" : "text-gold"}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className={`font-medium ${item.isWhatsApp ? "text-[#25D366]" : "text-foreground"}`}>
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 rounded-xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/30"
            >
              <h4 className="font-display text-xl font-bold mb-2">
                {discoveryTitle}
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                {discoveryDescription}
              </p>
              <Button variant="gold" size="sm">
                {discoveryButton}
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-background border border-border"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    {t("Prénom", "First Name")}
                  </label>
                  <Input
                    placeholder={t("Votre prénom", "Your first name")}
                    className="bg-card border-border focus:border-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    {t("Nom", "Last Name")}
                  </label>
                  <Input
                    placeholder={t("Votre nom", "Your last name")}
                    className="bg-card border-border focus:border-gold"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder={t("votre@email.com", "your@email.com")}
                  className="bg-card border-border focus:border-gold"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  {t("Téléphone", "Phone")}
                </label>
                <Input
                  type="tel"
                  placeholder="+33 6 00 00 00 00"
                  className="bg-card border-border focus:border-gold"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Message
                </label>
                <Textarea
                  placeholder={t("Parlez-nous de vos objectifs...", "Tell us about your goals...")}
                  rows={5}
                  className="bg-card border-border focus:border-gold resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  t("Envoi en cours...", "Sending...")
                ) : (
                  <>
                    {t("Envoyer le message", "Send message")}
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-block text-gold uppercase tracking-[0.4em] text-xs font-semibold mb-4 px-4 py-2 border border-gold/20 rounded-full bg-gold/5">
              {t("Localisation", "Location")}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t("Où nous", "Where to")}{' '}
              <span className="text-gradient">{t("trouver?", "find us?")}</span>
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              {t(
                "Basés à Wasquehal, nous intervenons sur l'ensemble de la métropole lilloise : Lille, Marcq-en-Barœul, Mouvaux, Croix, Bondues, Villeneuve-d'Ascq, Roubaix et alentours. Coaching en ligne également disponible.",
                "Based in Wasquehal, we operate throughout the Lille metropolitan area: Lille, Marcq-en-Barœul, Mouvaux, Croix, Bondues, Villeneuve-d'Ascq, Roubaix and surroundings. Online coaching also available."
              )}
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl shadow-black/30">
            {/* Map glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20230.77889442888!2d3.1095!3d50.6692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c32917b09f1b71%3A0x40af13e81644930!2s59290%20Wasquehal%2C%20France!5e0!3m2!1sfr!2sfr!4v1703700000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("NLC Coaching Location - Wasquehal", "NLC Coaching Location - Wasquehal")}
                className="absolute inset-0"
              />
              {/* Gold overlay for brand consistency */}
              <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
            </div>
            
            {/* Location card overlay */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/90 backdrop-blur-md rounded-xl p-4 md:p-6 border border-gold/30 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="font-display font-semibold text-foreground">NLC Coaching</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Wasquehal, Métropole Lilloise
              </p>
              <a 
                href="https://maps.app.goo.gl/9d3YMTNV6dFYU9EHA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-sm mt-3 hover:underline"
              >
                {t("Ouvrir dans Google Maps", "Open in Google Maps")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
