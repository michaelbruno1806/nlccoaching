import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImage from "@/assets/logo_liam.png";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isVisible, onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const duration = 3500;
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
          className="fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Soft ambient glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 0.9, 1],
              opacity: [0, 0.3, 0.2, 0.25]
            }}
            transition={{ 
              duration: 4, 
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.4, 0.7, 1]
            }}
          />

          {/* Main content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2 
            }}
          >
            {/* Logo container with subtle breathing */}
            <div className="relative">
              {/* Soft glow behind logo */}
              <motion.div
                className="absolute inset-0 bg-primary/15 rounded-full blur-[60px]"
                style={{ transform: 'scale(2)' }}
                animate={{ 
                  opacity: [0.15, 0.3, 0.15],
                  scale: [1.8, 2.2, 1.8]
                }}
                transition={{ 
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
              
              {/* Logo image with smooth reveal */}
              <motion.img
                src={logoImage}
                alt="NL Coaching Logo"
                className="w-[240px] h-auto md:w-[320px] relative z-10"
                initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4
                }}
              />
            </div>

            {/* Elegant progress bar */}
            <motion.div 
              className="w-48 md:w-64 mt-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1, 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "linear" }}
                />
              </div>
              
              <motion.div 
                className="flex justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <span className="text-xs text-white/40 tracking-[0.3em] uppercase font-light">
                  Loading
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            onClick={onComplete}
            className="absolute bottom-10 text-white/30 hover:text-white/60 text-xs tracking-[0.2em] uppercase transition-colors duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
