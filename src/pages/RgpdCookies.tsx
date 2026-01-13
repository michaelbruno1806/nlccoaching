import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RgpdCookies = () => {
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
              <span className="text-gradient">RGPD</span>{" "}
              <span className="text-foreground">& Cookies</span>
            </h1>
            <p className="text-muted-foreground">
              {isFrench ? "Dernière mise à jour : 30 Novembre 2025" : "Last updated: November 30, 2025"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  1. Présentation de l'entreprise
                </h2>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">NLC Coaching</strong>
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2">
                  <li><strong className="text-foreground">Entrepreneur individuel :</strong> Noa-Liam Politino</li>
                  <li><strong className="text-foreground">Adresse :</strong> 10 rue Adolphe Defrenne, 59160 Lomme, France</li>
                  <li><strong className="text-foreground">SIRET :</strong> 933 336 794 00013</li>
                  <li><strong className="text-foreground">Email :</strong> politinonoaliam@gmail.com</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  NLC Coaching s'engage à protéger la vie privée de ses utilisateurs et à respecter la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD) et la loi Informatique et Libertés.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  2. Données collectées
                </h2>
                <h3 className="text-lg font-semibold text-foreground mb-2">Données fournies volontairement :</h3>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside mb-4">
                  <li>Nom, prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Informations transmises via formulaires (contact, réservation, coaching)</li>
                </ul>
                <h3 className="text-lg font-semibold text-foreground mb-2">Données collectées automatiquement :</h3>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Cookies</li>
                  <li>Données de navigation</li>
                  <li>Adresse IP</li>
                  <li>Type d'appareil et navigateur</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  3. Finalités du traitement
                </h2>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Répondre à vos demandes de contact ou d'information</li>
                  <li>Gérer vos réservations de séances</li>
                  <li>Planifier vos coachings et assurer le suivi</li>
                  <li>Améliorer la qualité du service</li>
                  <li>Assurer le fonctionnement technique du site</li>
                  <li>Produire des statistiques anonymes de fréquentation</li>
                  <li>Vous envoyer des informations ou offres (avec votre consentement)</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Aucune donnée personnelle n'est vendue, cédée ou partagée à des tiers à des fins commerciales.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  4. Base légale du traitement
                </h2>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong className="text-foreground">Votre consentement</strong> (cookies, newsletters, formulaires)</li>
                  <li><strong className="text-foreground">L'exécution d'un contrat</strong> (réservation de séances, coaching)</li>
                  <li><strong className="text-foreground">L'intérêt légitime</strong> (amélioration du site, sécurité)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  5. Durée de conservation
                </h2>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Données de contact : 24 mois</li>
                  <li>Données clients (coaching) : durée légale comptable + archivage</li>
                  <li>Cookies : de 6 à 13 mois selon le type</li>
                  <li>Statistiques anonymes : durée illimitée</li>
                  <li>Données de facturation : obligations légales (10 ans)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  6. Vos droits
                </h2>
                <p className="text-muted-foreground mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Droit d'accès</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit d'opposition</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit de retirer votre consentement à tout moment</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Pour exercer vos droits : <strong className="text-primary">politinonoaliam@gmail.com</strong>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  7. Sécurité des données
                </h2>
                <p className="text-muted-foreground">
                  NLC Coaching met en place toutes les mesures techniques nécessaires pour protéger vos données contre l'accès non autorisé, l'altération, la perte et la divulgation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  8. Utilisation des cookies
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Cookies fonctionnels (obligatoires)</h3>
                    <p className="text-muted-foreground">Permettent le bon fonctionnement du site.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Cookies statistiques</h3>
                    <p className="text-muted-foreground">Utilisés uniquement pour produire des données anonymes.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Cookies marketing</h3>
                    <p className="text-muted-foreground">Permettent de proposer des contenus personnalisés. Uniquement activés si vous donnez votre consentement.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  9. Contact
                </h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant la protection des données : <strong className="text-primary">politinonoaliam@gmail.com</strong>
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

export default RgpdCookies;
