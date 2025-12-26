import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImage from "@/assets/nlc-logo-final.png";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isVisible, onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
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
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle ambient glow - lime green to match logo */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[150px]"
            style={{ backgroundColor: 'rgba(163, 230, 53, 0.08)' }}
            animate={{ 
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{ 
              duration: 3, 
              ease: "easeInOut",
              repeat: Infinity
            }}
          />

          {/* Main content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2 
            }}
          >
            {/* Logo container with solid background */}
            <motion.div
              className="bg-black rounded-2xl p-8 md:p-12"
              animate={{ 
                opacity: [0.95, 1, 0.95],
                scale: [1, 1.015, 1],
              }}
              transition={{ 
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <img
                src={logoImage}
                alt="NLC Concept Logo"
                className="w-[280px] h-auto md:w-[380px] lg:w-[450px]"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(163, 230, 53, 0.25))',
                }}
              />
            </motion.div>

            {/* Minimal progress bar */}
            <motion.div 
              className="w-40 md:w-56 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="relative h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ 
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, rgba(163, 230, 53, 0.4), rgba(163, 230, 53, 0.7))'
                  }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            onClick={onComplete}
            className="absolute bottom-10 text-white/10 hover:text-white/30 text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;