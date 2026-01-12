import { useEffect, useRef, memo, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorIndex: number;
  alpha: number;
}

// Pre-computed colors outside component for better performance
const COLORS = [
  "rgba(168, 85, 247, ", // primary purple
  "rgba(6, 182, 212, ",   // accent cyan
  "rgba(255, 255, 255, ", // white
];

const MAX_PARTICLES = 120;
const CONNECTION_DISTANCE = 150;
const MOUSE_INTERACTION_DISTANCE = 150;

const ParticleField = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const createParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(
      Math.floor((width * height) / 10000),
      MAX_PARTICLES
    );

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1,
        colorIndex: (Math.random() * COLORS.length) | 0,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
    return particles;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dimensionsRef.current = { width: canvas.width, height: canvas.height };
    particlesRef.current = createParticles(canvas.width, canvas.height);
  }, [createParticles]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    ctx.clearRect(0, 0, width, height);

    // Draw connections - only check pairs that are close enough (optimization)
    const particleCount = particles.length;
    const connectionDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

    for (let i = 0; i < particleCount; i++) {
      const pi = particles[i];
      for (let j = i + 1; j < particleCount; j++) {
        const pj = particles[j];
        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < connectionDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    const mouseDistSq = MOUSE_INTERACTION_DISTANCE * MOUSE_INTERACTION_DISTANCE;

    for (let i = 0; i < particleCount; i++) {
      const particle = particles[i];

      // Mouse interaction - particles repel from cursor
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < mouseDistSq && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (MOUSE_INTERACTION_DISTANCE - dist) / MOUSE_INTERACTION_DISTANCE;
        particle.vx -= (dx / dist) * force * 0.02;
        particle.vy -= (dy / dist) * force * 0.02;
      }

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      const color = COLORS[particle.colorIndex];

      // Draw particle with glow
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = color + particle.alpha + ")";
      ctx.fill();

      // Add glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color + (particle.alpha * 0.2) + ")";
      ctx.fill();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    resizeCanvas();
    animationFrameRef.current = requestAnimationFrame(animate);

    // Debounced resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };

    // Throttled mouse move handler
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) { // ~60fps throttle
        mouseRef.current = { x: e.clientX, y: e.clientY };
        lastMouseUpdate = now;
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [animate, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent", opacity: 0.7 }}
      aria-hidden="true"
    />
  );
});

ParticleField.displayName = "ParticleField";

export default ParticleField;
