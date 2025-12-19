import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedLogo from "./AnimatedLogo";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isVisible, onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const duration = 3000;
      const interval = 30;
      const increment = 100 / (duration / interval);
      
      const progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return Math.min(prev + increment, 100);
        });
      }, interval);

      const timer = setTimeout(() => {
        onComplete();
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Gradient Waves Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10" />
            
            {/* Animated wave layers */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[60%]"
              viewBox="0 0 1440 600"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Wave 1 - slowest, back */}
              <motion.path
                fill="url(#waveGradient1)"
                animate={{
                  d: [
                    "M0,300 C360,200 720,400 1080,300 C1260,250 1380,350 1440,300 L1440,600 L0,600 Z",
                    "M0,350 C360,450 720,250 1080,350 C1260,400 1380,300 1440,350 L1440,600 L0,600 Z",
                    "M0,300 C360,200 720,400 1080,300 C1260,250 1380,350 1440,300 L1440,600 L0,600 Z",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Wave 2 - medium speed, middle */}
              <motion.path
                fill="url(#waveGradient2)"
                animate={{
                  d: [
                    "M0,400 C240,300 480,500 720,400 C960,300 1200,450 1440,380 L1440,600 L0,600 Z",
                    "M0,350 C240,450 480,300 720,400 C960,500 1200,350 1440,420 L1440,600 L0,600 Z",
                    "M0,400 C240,300 480,500 720,400 C960,300 1200,450 1440,380 L1440,600 L0,600 Z",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Wave 3 - fastest, front */}
              <motion.path
                fill="url(#waveGradient3)"
                animate={{
                  d: [
                    "M0,450 C180,400 360,500 540,450 C720,400 900,480 1080,440 C1260,400 1380,470 1440,450 L1440,600 L0,600 Z",
                    "M0,480 C180,520 360,420 540,470 C720,520 900,440 1080,480 C1260,520 1380,450 1440,480 L1440,600 L0,600 Z",
                    "M0,450 C180,400 360,500 540,450 C720,400 900,480 1080,440 C1260,400 1380,470 1440,450 L1440,600 L0,600 Z",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>

            {/* Top gradient waves */}
            <svg
              className="absolute top-0 left-0 w-full h-[40%] rotate-180"
              viewBox="0 0 1440 400"
              preserveAspectRatio="none"
            >
              <motion.path
                fill="hsl(var(--primary))"
                fillOpacity="0.05"
                animate={{
                  d: [
                    "M0,200 C360,100 720,300 1080,200 C1260,150 1380,250 1440,200 L1440,400 L0,400 Z",
                    "M0,250 C360,350 720,150 1080,250 C1260,300 1380,200 1440,250 L1440,400 L0,400 Z",
                    "M0,200 C360,100 720,300 1080,200 C1260,150 1380,250 1440,200 L1440,400 L0,400 Z",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
            
            {/* Central glow */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Floating orbs */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
              animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-primary/15 rounded-full blur-2xl"
              animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${10 + i * 11}%`,
                  top: `${20 + (i % 4) * 18}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Video container with green border */}
          <motion.div 
            className="relative z-10 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-2xl overflow-hidden border-2 border-primary/40 shadow-2xl"
            style={{
              boxShadow: "0 0 40px hsl(var(--primary) / 0.3), 0 0 80px hsl(var(--primary) / 0.15)"
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/loading-intro.mp4" type="video/mp4" />
            </video>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
          </motion.div>

          {/* Animated Logo */}
          <motion.div 
            className="mt-8 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <AnimatedLogo size="lg" />
            
            {/* Dynamic Progress Bar */}
            <motion.div 
              className="w-64 md:w-80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Progress bar container */}
              <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm border border-primary/20">
                {/* Animated fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-80, 320] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                {/* Glow at progress tip */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full blur-md"
                  style={{ left: `calc(${progress}% - 8px)` }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
              
              {/* Progress percentage */}
              <div className="flex justify-between items-center mt-3">
                <motion.span 
                  className="text-xs text-muted-foreground tracking-wider uppercase"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading
                </motion.span>
                <span className="text-sm font-semibold text-primary tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Energy dots below progress */}
              <motion.div 
                className="flex justify-center gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-primary rounded-full"
                    animate={{ 
                      y: [0, -6, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: i * 0.1, 
                      ease: "easeInOut" 
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            onClick={onComplete}
            className="absolute bottom-8 text-muted-foreground hover:text-primary text-sm tracking-wide transition-colors flex items-center gap-2 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Skip
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="group-hover:text-primary"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
