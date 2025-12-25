import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImage from "@/assets/nlc-logo-arms.png";

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
          {/* Animated background pulse */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[200px]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              repeat: Infinity
            }}
          />

          {/* Main content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2 
            }}
          >
            {/* Logo container with power animation */}
            <div className="relative">
              {/* Energy ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/50"
                style={{ transform: 'scale(1.5)' }}
                animate={{ 
                  scale: [1.5, 2, 1.5],
                  opacity: [0.5, 0, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full blur-[80px]"
                style={{ transform: 'scale(2)' }}
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1.8, 2.2, 1.8]
                }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
              
              {/* Logo with flex animation */}
              <motion.img
                src={logoImage}
                alt="NLC Coaching Logo"
                className="w-[280px] h-auto md:w-[400px] relative z-10"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: 1
                }}
                transition={{ 
                  scale: {
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 0.5
                  },
                  opacity: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
              />
            </div>

            {/* Elegant progress bar */}
            <motion.div 
              className="w-48 md:w-64 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8, 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="relative h-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-80, 256] }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              </div>
              
              <motion.div 
                className="flex justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <motion.span 
                  className="text-xs text-primary/80 tracking-[0.3em] uppercase font-semibold"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            onClick={onComplete}
            className="absolute bottom-10 text-white/30 hover:text-primary text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
