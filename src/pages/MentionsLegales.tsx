import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              {isFrench ? "Retour à l'accueil" : "Back to home"}
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">
                {isFrench ? "Mentions" : "Legal"}
              </span>{" "}
              <span className="text-foreground">
                {isFrench ? "Légales" : "Notice"}
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  1. Éditeur du site
                </h2>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">NLC Coaching</strong> — Entrepreneur individuel
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li><strong className="text-foreground">Nom :</strong> Noa-Liam Politino</li>
                  <li><strong className="text-foreground">Adresse :</strong> 10 rue Adolphe Defrenne, 59160 Lomme, France</li>
                  <li><strong className="text-foreground">SIRET :</strong> 933 336 794 00013</li>
                  <li><strong className="text-foreground">Email :</strong> politinonoaliam@gmail.com</li>
                  <li><strong className="text-foreground">Responsable de publication :</strong> Noa-Liam Politino</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  2. Hébergement
                </h2>
                <p className="text-muted-foreground">
                  Les informations concernant l'hébergeur seront communiquées sur demande.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  3. Activité
                </h2>
                <p className="text-muted-foreground">
                  Le site présente les services de coaching sportif proposés par NLC Coaching : coaching individuel, small groupes, carnets de séances, programmes personnalisés.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  4. Propriété intellectuelle
                </h2>
                <p className="text-muted-foreground">
                  Tous les contenus présents sur ce site (textes, images, vidéos, logos, graphismes, etc.) sont la propriété exclusive de NLC Coaching ou de leurs auteurs respectifs. Toute représentation, reproduction, modification ou diffusion totale ou partielle des contenus sans autorisation expresse est interdite.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  5. Données personnelles & Cookies
                </h2>
                <p className="text-muted-foreground">
                  Conformément à la législation applicable (RGPD, loi Informatique et Libertés, etc.) :
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2 list-disc list-inside">
                  <li>Les données personnelles collectées via le site (formulaires de contact, réservations, etc.) sont traitées avec confidentialité.</li>
                  <li>Une politique de gestion des cookies est mise en place, avec distinction entre les cookies fonctionnels, statistiques et marketing.</li>
                  <li>Les utilisateurs peuvent accepter ou refuser les cookies, consulter leurs préférences, et modifier leur consentement à tout moment.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  6. Responsabilité & Limitation
                </h2>
                <p className="text-muted-foreground">
                  NLC Coaching met tout en œuvre pour assurer l'exactitude et la mise à jour des informations présentes sur le site. Cependant, NLC Coaching ne peut garantir l'absence d'erreurs, ni la permanence de l'accès au site (maintenance, indisponibilité, etc.). En conséquence, NLC Coaching ne pourra être tenue responsable des dommages directs ou indirects résultant de l'accès, de l'usage, ou de l'impossibilité d'accéder au site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  7. Droit applicable & Litiges
                </h2>
                <p className="text-muted-foreground">
                  Les présentes mentions légales et le site sont soumis au droit français. En cas de litige, les tribunaux compétents seront ceux du ressort du siège de NLC Coaching, sauf disposition légale contraire.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
    </>
  );
};

export default MentionsLegales;
