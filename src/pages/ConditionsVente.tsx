import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const ConditionsVente = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  return (
    <main className="min-h-screen bg-background">
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
                {isFrench ? "Conditions" : "Terms"}
              </span>{" "}
              <span className="text-foreground">
                {isFrench ? "de Vente" : "of Sale"}
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
            className="space-y-8"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  1. Objet
                </h2>
                <p className="text-muted-foreground">
                  Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les modalités de réservation, de paiement et de réalisation des prestations de coaching proposées par NLC Coaching. Toute commande implique l'adhésion pleine et entière du client aux présentes CGV.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  2. Prestations proposées
                </h2>
                <p className="text-muted-foreground mb-4">NLC Coaching propose :</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Coaching individuel</li>
                  <li>Coaching en small group (petits groupes)</li>
                  <li>Carnets de séances (5, 10 ou 12 séances)</li>
                  <li>Programmes personnalisés</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Chaque prestation est détaillée sur le site ou communiquée au client avant l'achat.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  3. Tarifs
                </h2>
                <p className="text-muted-foreground">
                  Les tarifs applicables sont ceux indiqués au moment de la commande. Tous les prix sont exprimés en euros et peuvent être modifiés à tout moment. Toute séance réservée est due selon le tarif en vigueur le jour de l'achat.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  4. Paiement
                </h2>
                <p className="text-muted-foreground">
                  Le paiement s'effectue en ligne via les moyens de paiement disponibles, ou directement auprès de NLC Coaching si mentionné. La réservation n'est confirmée qu'après validation du paiement complet.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  5. Conditions d'annulation et de report
                </h2>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Toute séance annulée ou reportée moins de 24h à l'avance est considérée comme due.</li>
                  <li>Toute absence non signalée est comptabilisée comme séance réalisée et non remboursable.</li>
                  <li>NLC Coaching se réserve le droit d'annuler ou reporter une séance en cas de nécessité. Dans ce cas, une nouvelle date sera proposée au client.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  6. Validité des carnets de séances
                </h2>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                  <li><strong className="text-foreground">5 séances</strong> → valable 2 mois</li>
                  <li><strong className="text-foreground">10 séances</strong> → valable 3 mois</li>
                  <li><strong className="text-foreground">12 séances</strong> → valable 4 mois</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  À l'expiration de cette période, les séances non utilisées sont considérées comme consommées, sans remboursement possible, afin de garantir la régularité de l'accompagnement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  7. Engagement du client
                </h2>
                <p className="text-muted-foreground mb-4">Le client s'engage à :</p>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Informer NLC Coaching de tout problème de santé, blessure ou contre-indication</li>
                  <li>Suivre les consignes de sécurité</li>
                  <li>Adopter un comportement respectueux et approprié durant les séances</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  NLC Coaching ne pourra être tenu responsable en cas d'information incomplète ou erronée fournie par le client.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  8. Responsabilité
                </h2>
                <p className="text-muted-foreground">
                  Les prestations proposées ne constituent pas un suivi médical. Le client reste responsable de sa santé et doit consulter un professionnel si nécessaire. NLC Coaching ne peut être tenu responsable des blessures résultant d'un non-respect des consignes ou d'un usage inapproprié des équipements.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  9. Confidentialité
                </h2>
                <p className="text-muted-foreground">
                  Les informations personnelles du client restent strictement confidentielles et ne sont utilisées que dans le cadre de la prestation sportive. Aucune donnée ne sera communiquée à des tiers sans accord préalable du client.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  10. Droit de rétractation
                </h2>
                <p className="text-muted-foreground">
                  Conformément à la législation en vigueur, le client bénéficie d'un droit de rétractation de 14 jours après l'achat, sauf si une première séance a déjà été réalisée ou si la prestation a commencé à sa demande expresse. Dans ces cas, aucun remboursement ne sera possible.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  11. Propriété intellectuelle
                </h2>
                <p className="text-muted-foreground">
                  Les programmes, contenus et supports fournis restent la propriété exclusive de NLC Coaching. Toute reproduction, diffusion ou exploitation sans autorisation est strictement interdite.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  12. Modification des CGV
                </h2>
                <p className="text-muted-foreground">
                  NLC Coaching se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  13. Litiges
                </h2>
                <p className="text-muted-foreground">
                  En cas de litige, une solution amiable sera recherchée en priorité. À défaut, le litige pourra être soumis aux tribunaux compétents.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ConditionsVente;
