import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-secondary/50 rounded-full p-1 gap-1">
      <button
        onClick={() => setLanguage("fr")}
        className="relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 flex items-center gap-1.5"
      >
        {language === "fr" && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">🇫🇷</span>
        <span className={`relative z-10 ${language === "fr" ? "text-primary-foreground" : "text-muted-foreground"}`}>
          FR
        </span>
      </button>
      
      <button
        onClick={() => setLanguage("en")}
        className="relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 flex items-center gap-1.5"
      >
        {language === "en" && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">🇬🇧</span>
        <span className={`relative z-10 ${language === "en" ? "text-primary-foreground" : "text-muted-foreground"}`}>
          EN
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;