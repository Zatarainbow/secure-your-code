import { useEffect, useRef } from "react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Matrix characters - mix of code-like symbols
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*(){}[]<>?/\\|~`+=";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track Y position of each column
    const drops: number[] = Array(columns).fill(1);
    
    // Color variations
    const colors = [
      "rgba(168, 85, 247, ",  // Primary purple
      "rgba(6, 182, 212, ",   // Accent cyan
      "rgba(255, 255, 255, ", // White
    ];

    const draw = () => {
      // Fade effect - semi-transparent black overlay
      ctx.fillStyle = "rgba(5, 5, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Mostly purple, sometimes cyan or white
        const colorChoice = Math.random();
        let color: string;
        let alpha: number;
        
        if (colorChoice < 0.85) {
          color = colors[0]; // Purple
          alpha = Math.random() * 0.5 + 0.3;
        } else if (colorChoice < 0.95) {
          color = colors[1]; // Cyan
          alpha = Math.random() * 0.7 + 0.3;
        } else {
          color = colors[2]; // White (brightest, like leading drop)
          alpha = 1;
        }

        ctx.fillStyle = color + alpha + ")";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
