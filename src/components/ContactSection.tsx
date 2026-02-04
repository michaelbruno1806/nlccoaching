import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Phone, Mail, MapPin, MessageCircle, ArrowRight, User, Target, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    objective: "",
    profile: "",
    message: ""
  });
  const { t, language } = useLanguage();
  const { getContent } = useSiteContent();

  // Get contact info from database or use defaults
  const phoneNumber = getContent("contact_phone") || "+33 6 16 22 40 37";
  const emailAddress = getContent("contact_email") || "contact.nlccoaching@gmail.com";
  const location = getContent("contact_location") || "Lille, France";
  const whatsappNumber = getContent("contact_whatsapp") || "33616224037";

  const WHATSAPP_MESSAGE = language === "fr" 
    ? "Bonjour, j'étais sur votre site internet. Je suis intéressé(e) par vos services de coaching !"
    : "Hello, I was on your website. I'm interested in your coaching services!";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast.error(t("Veuillez accepter les conditions générales de vente", "Please accept the terms and conditions"));
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error(t("Veuillez remplir tous les champs obligatoires", "Please fill in all required fields"));
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          objective: formData.objective,
          profile: formData.profile,
          message: formData.message,
          language
        }
      });

      if (error) throw error;

      toast.success(t("Message envoyé avec succès!", "Message sent successfully!"), {
        description: t("Nous vous répondrons dans les plus brefs délais.", "We will get back to you as soon as possible."),
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        objective: "",
        profile: "",
        message: ""
      });
      setAcceptedTerms(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t("Erreur lors de l'envoi du message", "Error sending message"), {
        description: t("Veuillez réessayer plus tard.", "Please try again later."),
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <p className="text-white text-lg">
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
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {t("Nom complet", "Full Name")}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t("Votre nom", "Your name")}
                      className="bg-card border-border focus:border-gold pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("Votre email", "Your email")}
                      className="bg-card border-border focus:border-gold pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  {t("Téléphone", "Phone")}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t("Votre numéro", "Your number")}
                    className="bg-card border-border focus:border-gold pl-10"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {t("Objectif", "Objective")}
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={formData.objective} onValueChange={(value) => setFormData({ ...formData, objective: value })}>
                      <SelectTrigger className="bg-card border-border focus:border-gold pl-10">
                        <SelectValue placeholder={t("Sélectionner", "Select")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perte-poids">{t("Perte de poids", "Weight loss")}</SelectItem>
                        <SelectItem value="prise-masse">{t("Prise de masse", "Muscle gain")}</SelectItem>
                        <SelectItem value="remise-forme">{t("Remise en forme", "Fitness")}</SelectItem>
                        <SelectItem value="performance">{t("Performance sportive", "Athletic performance")}</SelectItem>
                        <SelectItem value="sante">{t("Santé & Bien-être", "Health & Wellness")}</SelectItem>
                        <SelectItem value="autre">{t("Autre", "Other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    {t("Profil", "Profile")}
                  </label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={formData.profile} onValueChange={(value) => setFormData({ ...formData, profile: value })}>
                      <SelectTrigger className="bg-card border-border focus:border-gold pl-10">
                        <SelectValue placeholder={t("Sélectionner", "Select")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debutant">{t("Débutant", "Beginner")}</SelectItem>
                        <SelectItem value="intermediaire">{t("Intermédiaire", "Intermediate")}</SelectItem>
                        <SelectItem value="avance">{t("Avancé", "Advanced")}</SelectItem>
                        <SelectItem value="sportif">{t("Sportif confirmé", "Experienced athlete")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("Décrivez vos objectifs et attentes...", "Describe your goals and expectations...")}
                  rows={5}
                  className="bg-card border-border focus:border-gold resize-none"
                  required
                />
              </div>

              <div className="flex items-center space-x-3 mb-8">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  {t("J'accepte les", "I accept the")}{" "}
                  <Link to="/conditions-vente" className="text-primary hover:underline">
                    {t("conditions générales de vente", "terms and conditions")}
                  </Link>
                </label>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t("Envoi en cours...", "Sending...")
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t("Envoyer ma demande", "Send my request")}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-border hover:border-[#25D366] hover:text-[#25D366]"
                  onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
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
            <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">
              {t(
                "Basés à Lille, nous intervenons sur l'ensemble de la métropole lilloise : Marcq-en-Barœul, Mouvaux, Croix, Bondues, Villeneuve-d'Ascq, Roubaix, Wasquehal et alentours. Coaching en ligne également disponible.",
                "Based in Lille, we operate throughout the Lille metropolitan area: Marcq-en-Barœul, Mouvaux, Croix, Bondues, Villeneuve-d'Ascq, Roubaix, Wasquehal and surroundings. Online coaching also available."
              )}
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl shadow-black/30">
            {/* Map glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27106.99954957058!2d3.054048!3d50.6198166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d59f46ded225%3A0x1c0af141f1250860!2s59000%20Lille%2C%20France!5e1!3m2!1sen!2smu!4v1767680563895!5m2!1sen!2smu"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("NLC Coaching Location - Lille", "NLC Coaching Location - Lille")}
                className="absolute inset-0"
              />
              {/* Gold overlay for brand consistency */}
              <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
            </div>
            
            {/* Location card overlay */}
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 md:max-w-xs bg-black/90 backdrop-blur-md rounded-lg p-3 border border-gold/30 shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="font-display font-semibold text-foreground text-sm">NLC Coaching</span>
              </div>
              <p className="text-muted-foreground text-xs mb-2">
                Lille, Métropole Lilloise
              </p>
              <a 
                href="https://maps.app.goo.gl/9d3YMTNV6dFYU9EHA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold text-xs hover:underline"
              >
                {t("Ouvrir dans Google Maps", "Open in Google Maps")}
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
