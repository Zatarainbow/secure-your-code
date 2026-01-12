import { useEffect, useRef, memo, useCallback } from "react";

// Memoized component to prevent unnecessary re-renders
const MatrixRain = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dropsRef = useRef<number[]>([]);

  // Matrix characters - pre-computed outside render
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*(){}[]<>?/\\|~`+=";
  const charArray = chars.split("");
  const fontSize = 14;

  // Pre-computed colors for better performance
  const colors = [
    "rgba(168, 85, 247, ", // Primary purple
    "rgba(6, 182, 212, ",   // Accent cyan
    "rgba(255, 255, 255, ", // White
  ];

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columns = Math.floor(canvas.width / fontSize);
    dropsRef.current = new Array(columns).fill(1);
  }, [fontSize]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drops = dropsRef.current;
    const { width, height } = canvas;

    // Fade effect - semi-transparent black overlay
    ctx.fillStyle = "rgba(5, 5, 10, 0.05)";
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;

    const dropsLength = drops.length;
    for (let i = 0; i < dropsLength; i++) {
      // Random character - use bitwise for faster random
      const text = charArray[(Math.random() * charArray.length) | 0];

      // Color selection with pre-computed probabilities
      const colorChoice = Math.random();
      let color: string;
      let alpha: number;

      if (colorChoice < 0.85) {
        color = colors[0];
        alpha = Math.random() * 0.5 + 0.3;
      } else if (colorChoice < 0.95) {
        color = colors[1];
        alpha = Math.random() * 0.7 + 0.3;
      } else {
        color = colors[2];
        alpha = 1;
      }

      ctx.fillStyle = color + alpha + ")";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // Randomly reset drop to top
      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, [charArray, colors, fontSize]);

  useEffect(() => {
    resizeCanvas();

    // Use requestAnimationFrame with throttling for 60fps max
    let lastTime = 0;
    const frameInterval = 50; // ~20fps for matrix rain (matches original interval)

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        draw();
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Debounced resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [draw, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      aria-hidden="true"
    />
  );
});

MatrixRain.displayName = "MatrixRain";

export default MatrixRain;
