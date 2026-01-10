import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-[10%] w-32 h-32 bg-primary/20 rounded-full blur-[60px]"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-[10%] w-40 h-40 bg-accent/20 rounded-full blur-[80px]"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <ScrollReveal direction="up">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Bắt đầu miễn phí ngay hôm nay</span>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Bắt đầu bảo vệ</span> mã nguồn ngay hôm nay
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn lập trình viên đang sử dụng công cụ obfuscator của chúng tôi.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 group text-lg px-8 py-6 relative overflow-hidden">
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: ["−100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <Rocket className="mr-2 w-5 h-5" />
                Bắt đầu miễn phí
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" variant="outline" className="gradient-border text-lg px-8 py-6">
                Liên hệ tư vấn
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Trust indicators */}
        <ScrollReveal direction="fade" delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm">Không cần thẻ tín dụng</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-blue-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <span className="text-sm">Thiết lập trong 2 phút</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-purple-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <span className="text-sm">Hỗ trợ 24/7</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
