import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface BookingFormSectionProps {
  serviceName: string;
  whatsappMessage?: string;
}

const BookingFormSection = ({ serviceName, whatsappMessage }: BookingFormSectionProps) => {
  const { language } = useLanguage();
  const isFrench = language === "fr";
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    objective: "",
    profile: "",
    message: "",
    acceptTerms: false,
  });

  const objectives = isFrench
    ? ["Perte de poids", "Remise en forme", "Développement musculaire", "Amélioration de la force", "Réathlétisation"]
    : ["Weight loss", "Getting in shape", "Muscle development", "Strength improvement", "Athletic rehab"];

  const profiles = isFrench
    ? ["Particulier", "Sportif", "Professionnel", "Entreprise", "Étudiant", "Autre"]
    : ["Individual", "Athlete", "Professional", "Business", "Student", "Other"];

  const defaultWhatsappMessage = encodeURIComponent(
    isFrench 
      ? `Bonjour, je suis intéressé(e) par ${serviceName} et j'aimerais avoir plus d'informations.`
      : `Hello, I'm interested in ${serviceName} and would like more information.`
  );

  const whatsappUrl = `https://wa.me/23058035450?text=${whatsappMessage || defaultWhatsappMessage}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast({
        title: isFrench ? "Erreur" : "Error",
        description: isFrench ? "Veuillez accepter les conditions" : "Please accept the terms",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: isFrench ? "Message envoyé !" : "Message sent!",
      description: isFrench ? "Nous vous contacterons bientôt" : "We will contact you soon",
    });
  };

  return (
    <section id="contact" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {isFrench ? "Prendre rendez-vous" : "Book appointment"}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              {isFrench ? "Réserver votre suivi" : "Book your session"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {isFrench
                ? "Remplissez le formulaire ci-dessous pour commencer votre transformation"
                : "Fill out the form below to start your transformation"}
            </p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground/90 tracking-wide">
                    {isFrench ? "Nom complet" : "Full name"}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isFrench ? "Votre nom" : "Your name"}
                    className="h-12 bg-background border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground/90 tracking-wide">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isFrench ? "Votre email" : "Your email"}
                    className="h-12 bg-background border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground/90 tracking-wide">
                  {isFrench ? "Téléphone" : "Phone"}
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={isFrench ? "Votre numéro" : "Your phone number"}
                  className="h-12 bg-background border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground/90 tracking-wide">
                    {isFrench ? "Objectif" : "Objective"}
                  </label>
                  <select
                    value={formData.objective}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    className="w-full h-12 rounded-lg border border-border/50 bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-background text-muted-foreground">{isFrench ? "Sélectionner" : "Select"}</option>
                    {objectives.map((obj) => (
                      <option key={obj} value={obj} className="bg-background text-foreground">{obj}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground/90 tracking-wide">
                    {isFrench ? "Profil" : "Profile"}
                  </label>
                  <select
                    value={formData.profile}
                    onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                    className="w-full h-12 rounded-lg border border-border/50 bg-background px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-background text-muted-foreground">{isFrench ? "Sélectionner" : "Select"}</option>
                    {profiles.map((profile) => (
                      <option key={profile} value={profile} className="bg-background text-foreground">{profile}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground/90 tracking-wide">
                  Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isFrench ? "Décrivez vos objectifs et attentes..." : "Describe your goals and expectations..."}
                  rows={5}
                  className="bg-background border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                  className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  {isFrench ? "J'accepte les conditions générales de vente" : "I accept the terms and conditions"}
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="flex-1 h-14 gap-3 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  <Send className="w-5 h-5" />
                  {isFrench ? "Envoyer ma demande" : "Send my request"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg" 
                  className="h-14 gap-3 text-base font-medium border-border/50 hover:bg-card hover:border-primary/50"
                  onClick={() => window.location.href = whatsappUrl}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingFormSection;
