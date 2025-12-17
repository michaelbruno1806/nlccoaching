import { motion } from "framer-motion";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AnimatedLogo = ({ className = "", size = "md" }: AnimatedLogoProps) => {
  const sizes = {
    sm: { width: 120, height: 40, text: "text-lg" },
    md: { width: 180, height: 50, text: "text-2xl" },
    lg: { width: 240, height: 70, text: "text-4xl" },
  };

  const { width, height, text } = sizes[size];

  return (
    <motion.div
      className={`relative flex items-center gap-3 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Icon */}
      <div className="relative">
        <svg
          width={height}
          height={height}
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Outer rotating ring */}
          <motion.circle
            cx="30"
            cy="30"
            r="28"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ originX: "30px", originY: "30px" }}
          />

          {/* Inner pulsing circle */}
          <motion.circle
            cx="30"
            cy="30"
            r="22"
            fill="url(#gradient2)"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* N Letter - stylized */}
          <motion.path
            d="M20 42V18L30 32L40 18V42"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />

          {/* Energy lines */}
          <motion.path
            d="M12 30H8"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: [0, 1, 0], x: [-5, 0, -5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.path
            d="M52 30H48"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: [0, 1, 0], x: [5, 0, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.path
            d="M30 8V12"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: [0, 1, 0], y: [-5, 0, -5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
          <motion.path
            d="M30 48V52"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 1, 0], y: [5, 0, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.5)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.8)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-primary/30 rounded-full blur-xl -z-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <motion.div className="flex items-baseline gap-1">
          {/* NLC with staggered animation */}
          <div className={`font-display font-bold tracking-wider ${text} flex`}>
            {["N", "L", "C"].map((letter, i) => (
              <motion.span
                key={letter}
                className="text-gradient inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* COACHING text */}
        <motion.div
          className="overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span
            className="text-foreground font-medium tracking-[0.3em] text-xs uppercase whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            COACHING
          </motion.span>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-5, 5, -5],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default AnimatedLogo;
