import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import logoImage from "@/assets/logo_liam.png";

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
}

const LoadingScreen = ({ isVisible, onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }
  };

  useEffect(() => {
    if (isVisible) {
      const duration = 4000;
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

  // Particle positions for interactive cursor
  const particles = [
    { x: 20, y: 25 }, { x: 80, y: 25 }, { x: 15, y: 50 },
    { x: 85, y: 50 }, { x: 25, y: 75 }, { x: 75, y: 75 },
    { x: 50, y: 15 }, { x: 50, y: 85 }, { x: 35, y: 35 },
    { x: 65, y: 35 }, { x: 35, y: 65 }, { x: 65, y: 65 },
  ];

  const getNearbyParticles = () => {
    return particles.filter((pos) => {
      const dx = pos.x - mousePos.x;
      const dy = pos.y - mousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 20;
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-[100] bg-[#4a4a4a] flex flex-col items-center justify-center cursor-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Radial gradient background */}
            <div className="absolute inset-0 bg-gradient-radial from-[#5a5a5a] via-[#4a4a4a] to-[#3a3a3a]" />
            
            {/* Animated light beams */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[150%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ delay: 0.3, duration: 1.5 }}
            >
              <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rotate-[-30deg] blur-md" />
              <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent blur-md" />
              <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rotate-[30deg] blur-md" />
            </motion.div>
            
            {/* Central glow */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 0.4, 0.2] }}
              transition={{ delay: 0.2, duration: 2, ease: "easeOut" }}
            />

            {/* Interactive particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Cursor-following lines */}
              {getNearbyParticles().map((pos, index) => {
                const dx = pos.x - mousePos.x;
                const dy = pos.y - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const opacity = Math.max(0, 1 - distance / 20);
                return (
                  <motion.line
                    key={`cursor-line-${index}`}
                    x1={`${mousePos.x}%`}
                    y1={`${mousePos.y}%`}
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeOpacity={opacity * 0.6}
                    filter="url(#glow)"
                  />
                );
              })}
              
              {/* Floating particles */}
              {particles.map((pos, i) => (
                <motion.circle
                  key={`particle-${i}`}
                  r="3"
                  fill="hsl(var(--primary))"
                  fillOpacity="0.4"
                  filter="url(#glow)"
                  initial={{ cx: `${pos.x}%`, cy: `${pos.y}%`, opacity: 0 }}
                  animate={{ 
                    cx: `${pos.x}%`, 
                    cy: `${pos.y}%`,
                    opacity: [0, 0.6, 0.3],
                    scale: [0.5, 1.2, 1]
                  }}
                  transition={{ 
                    delay: 1 + i * 0.1, 
                    duration: 1.5,
                    opacity: { repeat: Infinity, duration: 2, repeatType: "reverse" }
                  }}
                />
              ))}
              
              {/* Cursor glow point */}
              <motion.circle
                cx={`${mousePos.x}%`}
                cy={`${mousePos.y}%`}
                r="6"
                fill="hsl(var(--primary))"
                fillOpacity="0.5"
                filter="url(#glow)"
              />
            </svg>
          </div>

          {/* Main Logo Animation Container */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Logo with After Effects-style animations */}
            <div className="relative">
              
              {/* Pulsing glow behind logo */}
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] scale-150"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0.2, 0.5, 0.2], 
                  scale: [1.3, 1.6, 1.3] 
                }}
                transition={{ 
                  delay: 0.4, 
                  duration: 2, 
                  ease: "easeInOut",
                  repeat: Infinity 
                }}
              />
              
              {/* Secondary pulsing ring */}
              <motion.div
                className="absolute inset-0 border-2 border-primary/30 rounded-full scale-[2]"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ 
                  opacity: [0, 0.4, 0], 
                  scale: [1.5, 2.2, 1.5] 
                }}
                transition={{ 
                  delay: 1, 
                  duration: 2.5, 
                  ease: "easeInOut",
                  repeat: Infinity 
                }}
              />
              
              {/* Main logo image */}
              <motion.img
                src={logoImage}
                alt="NL Coaching Logo"
                className="w-[280px] h-auto md:w-[400px] relative z-10 drop-shadow-2xl"
                initial={{ scale: 0, opacity: 0, rotateY: -180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ 
                  delay: 0.5, 
                  duration: 0.8, 
                  ease: [0.34, 1.56, 0.64, 1] // Spring-like bounce
                }}
              />
              
              {/* Shine sweep effect */}
              <motion.div
                className="absolute inset-0 z-20 overflow-hidden rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                  animate={{ x: [0, 800] }}
                  transition={{ delay: 1.3, duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
              
              {/* Energy particles around logo */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={`energy-${i}`}
                    className="absolute w-3 h-3 bg-primary rounded-full"
                    style={{ 
                      left: '50%', 
                      top: '50%',
                      boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))'
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ 
                      x: [0, x],
                      y: [0, y],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{ 
                      delay: 1.5 + i * 0.08, 
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2.5
                    }}
                  />
                );
              })}
            </div>

            {/* Progress Bar */}
            <motion.div 
              className="w-64 md:w-80 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-primary/20">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                <motion.div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-80, 320] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <motion.span 
                  className="text-xs text-white/60 tracking-wider uppercase"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading
                </motion.span>
                <span className="text-sm font-semibold text-primary tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Energy dots */}
              <motion.div 
                className="flex justify-center gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
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
            className="absolute bottom-8 text-white/50 hover:text-primary text-sm tracking-wide transition-colors flex items-center gap-2 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
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
