import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET_TEXT = 'SHIELD SHINE CODE';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const LoadingScreen = ({ onComplete, duration = 3000 }: LoadingScreenProps) => {
  const [displayText, setDisplayText] = useState<string[]>(
    Array(TARGET_TEXT.length).fill('')
  );
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isGlitching, setIsGlitching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Decoding effect
  useEffect(() => {
    const revealInterval = duration / TARGET_TEXT.length;
    let currentIndex = 0;

    const revealTimer = setInterval(() => {
      if (currentIndex < TARGET_TEXT.length) {
        setRevealedIndices(prev => new Set([...prev, currentIndex]));
        currentIndex++;
      } else {
        clearInterval(revealTimer);
        setTimeout(() => {
          setIsComplete(true);
          onComplete?.();
        }, 500);
      }
    }, revealInterval);

    return () => clearInterval(revealTimer);
  }, [duration, onComplete]);

  // Shuffle unrevealed characters
  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setDisplayText(prev => 
        prev.map((_, index) => {
          if (revealedIndices.has(index)) {
            return TARGET_TEXT[index];
          }
          if (TARGET_TEXT[index] === ' ') {
            return ' ';
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );
    }, 50);

    return () => clearInterval(shuffleInterval);
  }, [revealedIndices]);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 500);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute w-full h-[2px] bg-green-500/10 animate-scanline"
              style={{
                animation: 'scanline 3s linear infinite'
              }}
            />
          </div>

          {/* Main text */}
          <div className="relative">
            <motion.div
              className={`text-3xl sm:text-5xl md:text-6xl font-mono font-bold tracking-wider ${
                isGlitching ? 'glitch-loading' : ''
              }`}
              style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              {displayText.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: revealedIndices.has(index) ? 1 : 0.5,
                    color: revealedIndices.has(index) ? '#22c55e' : '#4ade80'
                  }}
                  className={`inline-block ${char === ' ' ? 'w-4' : ''}`}
                  style={{
                    textShadow: revealedIndices.has(index) 
                      ? '0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.4)' 
                      : 'none'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Glitch layers */}
            {isGlitching && (
              <>
                <div 
                  className="absolute inset-0 text-3xl sm:text-5xl md:text-6xl font-mono font-bold tracking-wider text-red-500/50"
                  style={{ 
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    transform: 'translateX(-2px)',
                    clipPath: 'inset(20% 0 30% 0)'
                  }}
                >
                  {displayText.join('')}
                </div>
                <div 
                  className="absolute inset-0 text-3xl sm:text-5xl md:text-6xl font-mono font-bold tracking-wider text-cyan-500/50"
                  style={{ 
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    transform: 'translateX(2px)',
                    clipPath: 'inset(50% 0 10% 0)'
                  }}
                >
                  {displayText.join('')}
                </div>
              </>
            )}
          </div>

          {/* Loading indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-green-500/30 font-mono text-xs">
            [INITIALIZING]
          </div>
          <div className="absolute bottom-4 right-4 text-green-500/30 font-mono text-xs">
            v1.0.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
