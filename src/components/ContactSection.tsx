import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
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
    label: "Localisation",
    value: "Paris, France",
    href: "#",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message envoyé avec succès!", {
        description: "Nous vous répondrons dans les plus brefs délais.",
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
            Prêt à <span className="text-gradient">transformer</span> votre vie?
          </h2>
          <p className="text-muted-foreground text-lg">
            Contactez-nous pour discuter de vos objectifs et découvrir comment
            nous pouvons vous accompagner vers l'excellence.
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
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-gold/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
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
                Séance découverte
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Réservez votre première séance gratuite et découvrez notre
                approche unique.
              </p>
              <Button variant="gold" size="sm">
                Réserver maintenant
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
                    Prénom
                  </label>
                  <Input
                    placeholder="Votre prénom"
                    className="bg-card border-border focus:border-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Nom
                  </label>
                  <Input
                    placeholder="Votre nom"
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
                  placeholder="votre@email.com"
                  className="bg-card border-border focus:border-gold"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Téléphone
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
                  placeholder="Parlez-nous de vos objectifs..."
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
                  "Envoi en cours..."
                ) : (
                  <>
                    Envoyer le message
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
