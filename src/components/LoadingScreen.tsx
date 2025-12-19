import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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
            {/* SVG Logo with After Effects-style animations */}
            <svg 
              viewBox="0 0 400 300" 
              className="w-[320px] h-[240px] md:w-[450px] md:h-[340px]"
            >
              <defs>
                <filter id="logoGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="strongGlow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="lightningGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2d5a3d" />
                  <stop offset="100%" stopColor="#3d7a4d" />
                </linearGradient>
                <linearGradient id="lightningGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5cb85c" />
                  <stop offset="100%" stopColor="#7dd87d" />
                </linearGradient>
                <clipPath id="revealClip">
                  <motion.rect
                    x="0"
                    y="0"
                    width="400"
                    height="300"
                    initial={{ width: 0 }}
                    animate={{ width: 400 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                  />
                </clipPath>
              </defs>

              {/* Flash effect on lightning entry */}
              <motion.rect
                x="0"
                y="0"
                width="400"
                height="300"
                fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
              />

              {/* Lightning Bolt 1 - Dark Green (Back) */}
              <motion.g
                initial={{ x: 100, y: -80, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1] // Spring-like bounce
                }}
              >
                <motion.path
                  d="M245 40 L220 75 L240 75 L210 120 L260 65 L235 65 L265 30 Z"
                  fill="url(#lightningGrad1)"
                  filter="url(#logoGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                />
                {/* Lightning spark effects */}
                <motion.circle
                  cx="210"
                  cy="120"
                  r="8"
                  fill="#3d7a4d"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
              </motion.g>

              {/* Lightning Bolt 2 - Lime Green (Front) */}
              <motion.g
                initial={{ x: 80, y: -100, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.5, 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                <motion.path
                  d="M275 25 L245 70 L270 70 L235 125 L295 55 L265 55 L300 15 Z"
                  fill="url(#lightningGrad2)"
                  filter="url(#logoGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />
                {/* Lightning spark effects */}
                <motion.circle
                  cx="235"
                  cy="125"
                  r="10"
                  fill="#7dd87d"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 2.5, 0], opacity: [0, 1, 0] }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                />
              </motion.g>

              {/* Dumbbell - Assembles from parts */}
              <g>
                {/* Left weight plate (outer) */}
                <motion.ellipse
                  cx="115"
                  cy="115"
                  rx="28"
                  ry="45"
                  fill="white"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                  initial={{ x: -150, opacity: 0, rotateY: 90 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                />
                {/* Left weight plate (inner circle) */}
                <motion.ellipse
                  cx="115"
                  cy="115"
                  rx="18"
                  ry="30"
                  fill="none"
                  stroke="#c0c0c0"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                />

                {/* Right weight plate (outer) */}
                <motion.ellipse
                  cx="285"
                  cy="115"
                  rx="28"
                  ry="45"
                  fill="white"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                  initial={{ x: 150, opacity: 0, rotateY: -90 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                />
                {/* Right weight plate (inner circle) */}
                <motion.ellipse
                  cx="285"
                  cy="115"
                  rx="18"
                  ry="30"
                  fill="none"
                  stroke="#c0c0c0"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                />

                {/* Center bar */}
                <motion.rect
                  x="135"
                  y="110"
                  width="130"
                  height="10"
                  rx="5"
                  fill="white"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
                  style={{ transformOrigin: "center" }}
                />

                {/* Bar grip texture lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.line
                    key={`grip-${i}`}
                    x1={175 + i * 12}
                    y1="110"
                    x2={175 + i * 12}
                    y2="120"
                    stroke="#d0d0d0"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 + i * 0.05, duration: 0.2 }}
                  />
                ))}
              </g>

              {/* Dumbbell shine effect */}
              <motion.ellipse
                cx="200"
                cy="90"
                rx="60"
                ry="10"
                fill="white"
                fillOpacity="0.3"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: [0, 0.5, 0], y: [50, -20, -50] }}
                transition={{ delay: 1.3, duration: 0.8 }}
              />

              {/* NL COACHING Text - Brush stroke reveal */}
              <motion.g
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
              >
                {/* Text shadow/glow */}
                <motion.text
                  x="200"
                  y="220"
                  textAnchor="middle"
                  fill="hsl(var(--primary))"
                  fillOpacity="0.3"
                  fontSize="48"
                  fontFamily="'Brush Script MT', cursive"
                  fontWeight="bold"
                  filter="url(#strongGlow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  NL COACHING
                </motion.text>
                
                {/* Main text with stagger effect */}
                {"NL COACHING".split("").map((char, i) => (
                  <motion.text
                    key={`char-${i}`}
                    x={95 + i * 19}
                    y="220"
                    fill="hsl(var(--primary))"
                    fontSize="48"
                    fontFamily="'Brush Script MT', cursive"
                    fontWeight="bold"
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 1.7 + i * 0.05, 
                      duration: 0.3,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    {char}
                  </motion.text>
                ))}
              </motion.g>

              {/* Underline brush stroke */}
              <motion.path
                d="M100 235 Q200 240 300 235"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
              />

              {/* Energy particles around logo */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 120;
                const cx = 200 + Math.cos(angle) * radius;
                const cy = 130 + Math.sin(angle) * radius;
                return (
                  <motion.circle
                    key={`energy-${i}`}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="hsl(var(--primary))"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0],
                      cx: cx + Math.cos(angle) * 30,
                      cy: cy + Math.sin(angle) * 30,
                    }}
                    transition={{ 
                      delay: 2.0 + i * 0.1, 
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                );
              })}
            </svg>

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
