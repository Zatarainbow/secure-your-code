import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TERMINAL_LINES = [
  '> Initializing obfuscation engine...',
  '> Loading Python modules...',
  '> Compiling bytecode transformers...',
  '> Encrypting variable names...',
  '> Bypassing security...',
  '> System ready.',
];

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentLineIndex >= TERMINAL_LINES.length) {
      // All lines typed, wait then complete
      const timeout = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onComplete?.();
        }, 600);
      }, 800);
      return () => clearTimeout(timeout);
    }

    const currentLine = TERMINAL_LINES[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      // Type next character
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.slice(0, currentCharIndex + 1));
          } else {
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 25 + Math.random() * 35); // Random typing speed for realism
      return () => clearTimeout(timeout);
    } else {
      // Line complete, move to next line after a pause
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete ? (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          {/* Subtle scanline overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)',
            }}
          />

          {/* Terminal window */}
          <div className="w-full max-w-2xl px-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-green-500/20">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span 
                className="ml-4 text-green-500/50 text-sm"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                shield_shine_code.sh
              </span>
            </div>

            {/* Terminal content */}
            <div 
              className="space-y-2"
              style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            >
              {displayedLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-500 text-sm sm:text-base md:text-lg"
                  style={{
                    textShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
                  }}
                >
                  {line}
                  {index === currentLineIndex && currentCharIndex < TERMINAL_LINES[currentLineIndex]?.length && (
                    <span 
                      className={`inline-block w-2.5 h-5 ml-0.5 bg-green-500 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transform: 'translateY(-1px)' }}
                    />
                  )}
                </motion.div>
              ))}
              
              {/* Cursor on new line when waiting */}
              {currentLineIndex < TERMINAL_LINES.length && 
               displayedLines.length === currentLineIndex && (
                <div className="text-green-500">
                  <span 
                    className={`inline-block w-2.5 h-5 bg-green-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              )}

              {/* Final cursor after all lines */}
              {currentLineIndex >= TERMINAL_LINES.length && (
                <div className="text-green-500">
                  <span className="mr-1">&gt;</span>
                  <span 
                    className={`inline-block w-2.5 h-5 bg-green-500 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transform: 'translateY(-1px)' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Corner branding */}
          <div 
            className="absolute bottom-6 right-6 text-green-500/30 text-xs"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            SHIELD SHINE CODE v1.0.0
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
