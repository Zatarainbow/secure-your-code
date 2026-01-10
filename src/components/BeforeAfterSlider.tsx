import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Code, Shield, ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeCode: string;
  afterCode: string;
  title?: string;
}

const BeforeAfterSlider = ({ beforeCode, afterCode, title = "So sánh Trước/Sau" }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <ArrowLeftRight className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trải nghiệm ngay</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Kéo để thấy sự <span className="gradient-text">khác biệt</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Di chuyển thanh trượt để xem code trước và sau khi được obfuscate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden cursor-ew-resize border border-border/50 shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* Before Side */}
          <div className="absolute inset-0 bg-gradient-to-br from-background to-card">
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
              <Code className="w-4 h-4 text-red-400" />
              <span className="text-xs font-medium text-red-400">Code Gốc</span>
            </div>
            <div className="p-8 pt-16 h-full overflow-hidden">
              <pre className="text-sm md:text-base font-mono text-red-300/80 whitespace-pre-wrap leading-relaxed">
                {beforeCode}
              </pre>
            </div>
          </div>

          {/* After Side */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-card to-background"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-green-400">Đã Obfuscate</span>
            </div>
            <div className="p-8 pt-16 h-full overflow-hidden">
              <pre className="text-sm md:text-base font-mono text-green-300/80 whitespace-pre-wrap leading-relaxed break-all">
                {afterCode}
              </pre>
            </div>
          </div>

          {/* Slider Handle */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
            whileHover={{ scale: 1.2 }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary border-4 border-background shadow-lg flex items-center justify-center"
              animate={{
                boxShadow: isDragging
                  ? "0 0 30px rgba(var(--primary), 0.8)"
                  : "0 0 15px rgba(var(--primary), 0.4)",
              }}
            >
              <ArrowLeftRight className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          </motion.div>

          {/* Glow effect on slider line */}
          <div
            className="absolute top-0 bottom-0 w-8 pointer-events-none"
            style={{
              left: `calc(${sliderPosition}% - 16px)`,
              background: "linear-gradient(90deg, transparent, rgba(var(--primary), 0.3), transparent)",
            }}
          />
        </motion.div>

        {/* Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mt-6 text-sm"
        >
          👆 Kéo thanh trượt sang trái hoặc phải để so sánh
        </motion.p>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
