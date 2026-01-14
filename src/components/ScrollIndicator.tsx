import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="flex flex-col items-center -space-y-4"
      >
        <ChevronDown className="w-8 h-8 text-gold/80" />
        <ChevronDown className="w-8 h-8 text-gold/50" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
