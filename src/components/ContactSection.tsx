import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// WhatsApp configuration
const WHATSAPP_NUMBER = "33612345678"; // Replace with actual number

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  const WHATSAPP_MESSAGE = language === "fr" 
    ? "Bonjour! Je suis intéressé(e) par vos services de coaching NLC."
    : "Hello! I'm interested in your NLC coaching services.";

  const contactInfo = [
    {
      icon: Phone,
      label: t("Téléphone", "Phone"),
      value: "+33 6 12 34 56 78",
      href: "tel:+33612345678",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@nlccoaching.com",
      href: "mailto:contact@nlccoaching.com",
    },
    {
      icon: MapPin,
      label: t("Localisation", "Location"),
      value: "Paris, France",
      href: "#",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: t("Discuter maintenant", "Chat now"),
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
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
            {t("Prêt à", "Ready to")} <span className="text-gradient">{t("transformer", "transform")}</span> {t("votre vie?", "your life?")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(
              "Contactez-nous pour discuter de vos objectifs et découvrir comment nous pouvons vous accompagner vers l'excellence.",
              "Contact us to discuss your goals and discover how we can guide you towards excellence."
            )}
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
                target={item.isWhatsApp ? "_blank" : undefined}
                rel={item.isWhatsApp ? "noopener noreferrer" : undefined}
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
                {t("Séance découverte", "Discovery Session")}
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                {t(
                  "Réservez votre première séance gratuite et découvrez notre approche unique.",
                  "Book your first free session and discover our unique approach."
                )}
              </p>
              <Button variant="gold" size="sm">
                {t("Réserver maintenant", "Book now")}
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
      </div>
    </section>
  );
};

export default ContactSection;
