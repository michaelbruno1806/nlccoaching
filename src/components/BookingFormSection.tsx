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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isFrench ? "Réserver votre suivi" : "Book your session"}
            </h2>
            <p className="text-muted-foreground">
              {isFrench
                ? "Remplissez le formulaire ci-dessous pour commencer"
                : "Fill out the form below to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isFrench ? "Nom" : "Name"}
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isFrench ? "Votre nom" : "Your name"}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={isFrench ? "Votre email" : "Your email"}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {isFrench ? "Téléphone" : "Phone"}
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={isFrench ? "Votre numéro" : "Your phone number"}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isFrench ? "Objectif" : "Objective"}
                </label>
                <select
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">{isFrench ? "Sélectionner" : "Select"}</option>
                  {objectives.map((obj) => (
                    <option key={obj} value={obj}>{obj}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {isFrench ? "Profil" : "Profile"}
                </label>
                <select
                  value={formData.profile}
                  onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">{isFrench ? "Sélectionner" : "Select"}</option>
                  {profiles.map((profile) => (
                    <option key={profile} value={profile}>{profile}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={isFrench ? "Décrivez vos objectifs..." : "Describe your goals..."}
                rows={4}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                {isFrench ? "J'accepte les conditions" : "I accept the terms"}
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" size="lg" className="flex-1 gap-2">
                <Send className="w-4 h-4" />
                {isFrench ? "Envoyer" : "Send"}
              </Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button" variant="outline" size="lg" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingFormSection;
