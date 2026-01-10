import { motion } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.png";
import testimonial3 from "@/assets/testimonial-3.png";
import testimonial4 from "@/assets/testimonial-4.png";

interface ClientMessage {
  image: string;
  text: string;
  author: string;
  highlight?: string;
}

const ClientMessages = () => {
  const { language } = useLanguage();
  const isFrench = language === "fr";

  const messages: ClientMessage[] = [
    {
      image: testimonial1,
      text: isFrench
        ? "J'ai les fesses en feu !! 😭 Depuis que j'ai commencé avec toi je ressent vraiment la différence sur mes séances, merci Nono 🙏"
        : "My glutes are on fire!! 😭 Since I started with you I really feel the difference in my sessions, thanks Nono 🙏",
      author: "Client NLC",
      highlight: isFrench ? "Résultats visibles" : "Visible results",
    },
    {
      image: testimonial2,
      text: isFrench
        ? "Merci Noa pour tes coachings, grâce à toi je fais du sport sans me blesser, ça me reboost et me donne la motivation de venir quoi qu'il arrive 🙏"
        : "Thanks Noa for your coaching, thanks to you I exercise without getting injured, it boosts me and gives me motivation to come no matter what 🙏",
      author: "Client NLC",
      highlight: isFrench ? "Sans blessure" : "Injury-free",
    },
    {
      image: testimonial3,
      text: isFrench ? "Merci vraiment noa-liam pour la séance ! 🙏" : "Really thank you noa-liam for the session! 🙏",
      author: "Client NLC",
      highlight: isFrench ? "Satisfaction" : "Satisfaction",
    },
    {
      image: testimonial4,
      text: isFrench
        ? "J'ai adoré le small Groups du jour haha. C'était top tout le monde m'a encouragé j'ai hâte de la prochaine séance !"
        : "I loved today's small groups haha. It was great, everyone encouraged me, I can't wait for the next session!",
      author: "Client NLC",
      highlight: isFrench ? "Esprit d'équipe" : "Team spirit",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-6 px-4 py-2 border border-gold/20 rounded-full bg-gold/5"
          >
            <MessageCircle className="w-4 h-4" />
            {isFrench ? "Messages Clients" : "Client Messages"}
          </motion.span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {isFrench ? "Ce que nos clients" : "What our clients"}{" "}
            <span className="text-gradient">{isFrench ? "nous disent" : "tell us"}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold/50 to-gold mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isFrench
              ? "Des retours authentiques de nos clients après leurs séances"
              : "Authentic feedback from our clients after their sessions"}
          </p>
        </motion.div>

        {/* Messages Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-card via-card/90 to-card/70 rounded-2xl border border-border/50 overflow-hidden hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold/5">
                {/* Highlight badge */}
                {message.highlight && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium">
                      <Star className="w-3 h-3" fill="currentColor" />
                      {message.highlight}
                    </span>
                  </div>
                )}

                {/* Screenshot image */}
                <div className="p-6 pb-0">
                  <div className="relative rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm">
                    <img
                      src={message.image}
                      alt={`Client testimonial ${index + 1}`}
                      className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{message.author}</p>
                      <p className="text-muted-foreground text-xs">{isFrench ? "Message direct" : "Direct message"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "100%", label: isFrench ? "Clients satisfaits" : "Satisfied clients" },
            { value: "350+", label: isFrench ? "Transformations" : "Transformations" },
            { value: "5★", label: isFrench ? "Note moyenne" : "Average rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-gold mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientMessages;
