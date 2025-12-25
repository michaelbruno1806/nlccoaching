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
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated background particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Animated background pulse */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px]"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.15, 0.3, 0.15],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut",
              repeat: Infinity
            }}
          />

          {/* Secondary glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px]"
            animate={{ 
              scale: [1.2, 0.8, 1.2],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{ 
              duration: 3, 
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.5
            }}
          />

          {/* Main content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2 
            }}
          >
            {/* Logo container with power animation */}
            <div className="relative">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                style={{ transform: 'scale(2.5)' }}
                animate={{ 
                  rotate: [0, 360],
                  borderColor: ['rgba(132, 204, 22, 0.2)', 'rgba(212, 175, 55, 0.3)', 'rgba(132, 204, 22, 0.2)']
                }}
                transition={{ 
                  rotate: { duration: 8, ease: "linear", repeat: Infinity },
                  borderColor: { duration: 2, repeat: Infinity }
                }}
              />

              {/* Inner rotating ring (opposite direction) */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30"
                style={{ transform: 'scale(1.8)' }}
                animate={{ 
                  rotate: [360, 0],
                  scale: [1.8, 2, 1.8]
                }}
                transition={{ 
                  rotate: { duration: 6, ease: "linear", repeat: Infinity },
                  scale: { duration: 2, ease: "easeInOut", repeat: Infinity }
                }}
              />

              {/* Energy ring burst */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/60"
                style={{ transform: 'scale(1.3)' }}
                animate={{ 
                  scale: [1.3, 2.5, 1.3],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{ 
                  duration: 2,
                  ease: "easeOut",
                  repeat: Infinity
                }}
              />

              {/* Pulsing dots around logo */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: 'center',
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8) * 180 - 4,
                    y: Math.sin((i * Math.PI * 2) / 8) * 100 - 4,
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    scale: { duration: 1, repeat: Infinity, delay: i * 0.1 },
                    opacity: { duration: 1, repeat: Infinity, delay: i * 0.1 },
                    x: { duration: 0.5, ease: "easeOut" },
                    y: { duration: 0.5, ease: "easeOut" },
                  }}
                />
              ))}
              
              {/* Main glow effect - synced with heartbeat */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-primary/40 via-primary/20 to-transparent rounded-full blur-[60px]"
                style={{ transform: 'scale(1.5)' }}
                animate={{ 
                  opacity: [0.4, 0.9, 0.5, 0.8, 0.4],
                  scale: [1.5, 1.9, 1.6, 1.85, 1.5]
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: Infinity,
                  repeatDelay: 0.3,
                  times: [0, 0.15, 0.3, 0.45, 1]
                }}
              />

              {/* Gold accent glow - synced with heartbeat */}
              <motion.div
                className="absolute inset-0 bg-gold/25 rounded-full blur-[50px]"
                style={{ transform: 'scale(1.3)' }}
                animate={{ 
                  opacity: [0.2, 0.6, 0.3, 0.55, 0.2],
                  scale: [1.3, 1.7, 1.4, 1.65, 1.3]
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: Infinity,
                  repeatDelay: 0.3,
                  times: [0, 0.15, 0.3, 0.45, 1]
                }}
              />
              
              {/* Logo with heartbeat pulse animation */}
              <motion.img
                src={logoImage}
                alt="NLC Coaching Logo"
                className="w-[280px] h-auto md:w-[400px] relative z-10 drop-shadow-[0_0_30px_rgba(132,204,22,0.5)]"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.15, 1.05, 1.12, 1],
                  opacity: 1,
                }}
                transition={{ 
                  scale: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    repeat: Infinity,
                    repeatDelay: 0.3,
                    times: [0, 0.15, 0.3, 0.45, 1]
                  },
                  opacity: {
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }}
              />
            </div>

            {/* Animated text */}
            <motion.div
              className="mt-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.p
                className="text-lg md:text-xl font-display text-primary/90 tracking-[0.4em] uppercase"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  letterSpacing: ['0.4em', '0.5em', '0.4em']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                NLC Coaching
              </motion.p>
            </motion.div>

            {/* Elegant progress bar */}
            <motion.div 
              className="w-56 md:w-72 mt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1, 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-gold to-primary rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: [-96, 288] }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.3
                  }}
                />
              </div>
              
              {/* Progress percentage */}
              <motion.div 
                className="flex justify-between items-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <motion.span 
                  className="text-xs text-primary/60 tracking-[0.2em] uppercase font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading
                </motion.span>
                <span className="text-xs text-gold/80 font-mono">
                  {Math.round(progress)}%
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Decorative corner elements */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          {/* Skip button */}
          <motion.button
            onClick={onComplete}
            className="absolute bottom-10 text-white/20 hover:text-gold text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:tracking-[0.4em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
