import { motion } from "framer-motion";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AnimatedLogo = ({ className = "", size = "md" }: AnimatedLogoProps) => {
  const sizes = {
    sm: { icon: 32, text: "text-lg", subtext: "text-xs", spacing: "gap-3" },
    md: { icon: 44, text: "text-2xl", subtext: "text-sm", spacing: "gap-3" },
    lg: { icon: 56, text: "text-3xl", subtext: "text-base", spacing: "gap-4" },
  };

  const { icon, text, subtext, spacing } = sizes[size];

  return (
    <motion.div
      className={`flex items-center ${spacing} ${className} cursor-pointer group`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated icon with dumbbell-inspired design */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer rotating ring */}
          <motion.circle
            cx="25"
            cy="25"
            r="22"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="20 10"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "25px", originY: "25px" }}
          />

          {/* Inner pulsing circle */}
          <motion.circle
            cx="25"
            cy="25"
            r="18"
            fill="hsl(var(--primary))"
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* N Letter with draw animation */}
          <motion.path
            d="M16 32V18L34 32V18"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Energy lightning bolts */}
          <motion.path
            d="M38 8L35 14L40 13L36 20"
            stroke="hsl(var(--gold))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.path
            d="M10 30L13 36L8 35L12 42"
            stroke="hsl(var(--gold))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          />
        </svg>

        {/* Multiple glow layers */}
        <motion.div 
          className="absolute inset-0 bg-primary/30 rounded-full blur-lg -z-10"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-primary/20 rounded-full blur-xl -z-20"
          animate={{ 
            scale: [1.2, 1.6, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
      </div>

      {/* Text with stagger animation */}
      <div className="flex flex-col leading-none">
        <motion.div 
          className="flex overflow-hidden"
          initial="hidden"
          animate="visible"
        >
          {"NLC".split("").map((letter, index) => (
            <motion.span
              key={index}
              className={`font-display font-bold tracking-wider ${text} text-gradient`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                ease: "easeOut"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        <motion.span 
          className={`text-primary font-semibold tracking-[0.3em] ${subtext} uppercase mt-1`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          COACHING
        </motion.span>
      </div>
    </motion.div>
  );
};

export default AnimatedLogo;
