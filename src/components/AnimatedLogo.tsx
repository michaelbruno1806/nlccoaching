import { motion } from "framer-motion";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AnimatedLogo = ({ className = "", size = "md" }: AnimatedLogoProps) => {
  const sizes = {
    sm: { icon: 28, text: "text-sm", spacing: "gap-2" },
    md: { icon: 36, text: "text-lg", spacing: "gap-2" },
    lg: { icon: 48, text: "text-2xl", spacing: "gap-3" },
  };

  const { icon, text, spacing } = sizes[size];

  return (
    <motion.div
      className={`flex items-center ${spacing} ${className} cursor-pointer group`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      {/* Simple animated icon */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pulsing circle */}
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            fill="hsl(var(--primary))"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* N Letter */}
          <path
            d="M13 28V12L27 28V12"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Glow effect - brighter on hover */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10 transition-all duration-300 group-hover:bg-primary/40 group-hover:blur-xl group-hover:scale-150" />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-wider ${text} text-gradient`}>
          NLC
        </span>
        <span className="text-foreground/80 font-medium tracking-[0.2em] text-[0.6rem] uppercase">
          COACHING
        </span>
      </div>
    </motion.div>
  );
};

export default AnimatedLogo;
