import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImage from "@/assets/nlc-logo-new.png";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isVisible, onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const duration = 1200;
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
          className="fixed inset-0 z-[100] bg-gradient-to-b from-neutral-950 via-black to-neutral-950 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle scan lines effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />

          {/* Ambient glow - green accent */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px]"
            style={{ backgroundColor: 'rgba(34, 139, 34, 0.12)' }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut",
              repeat: Infinity
            }}
          />

          {/* Main content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Logo with reveal animation */}
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            >
              {/* Subtle glow behind logo */}
              <motion.div
                className="absolute inset-0 blur-2xl opacity-30"
                style={{ 
                  background: 'radial-gradient(ellipse at center, rgba(34, 139, 34, 0.4) 0%, transparent 70%)',
                }}
                animate={{ 
                  opacity: [0.2, 0.35, 0.2],
                }}
                transition={{ 
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
              
              <motion.img
                src={logoImage}
                alt="NL Coaching Logo"
                className="w-[280px] h-auto md:w-[380px] lg:w-[420px] relative z-10"
                animate={{ 
                  y: [0, -4, 0],
                }}
                transition={{ 
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Minimal progress indicator - just a line */}
            <motion.div 
              className="w-32 md:w-40 mt-12"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="relative h-[1px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-green-600/60 to-green-500/80"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            onClick={onComplete}
            className="absolute bottom-8 text-white/15 hover:text-white/40 text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;