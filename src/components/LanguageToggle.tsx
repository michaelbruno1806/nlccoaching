import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center gap-1 bg-secondary/50 rounded-full p-1">
      {/* Animated background indicator */}
      <motion.div
        className="absolute h-[calc(100%-8px)] bg-primary rounded-full"
        initial={false}
        animate={{
          x: language === "fr" ? 4 : "calc(100% - 4px)",
          width: language === "fr" ? 32 : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
      
      <button
        onClick={() => setLanguage("fr")}
        className={`relative z-10 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
          language === "fr"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`relative z-10 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
          language === "en"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
