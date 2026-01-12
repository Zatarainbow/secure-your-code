import { memo, useMemo } from "react";
import { Shield, Code, Lock, Zap, Eye, FileCode, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Bảo Vệ Mã Nguồn",
    description: "Mã hóa và làm rối code Python/JavaScript để ngăn chặn việc sao chép và đánh cắp mã nguồn.",
  },
  {
    icon: Code,
    title: "Obfuscate Thông Minh",
    description: "Thuật toán obfuscate tiên tiến giữ nguyên hiệu suất trong khi bảo vệ logic ứng dụng.",
  },
  {
    icon: Lock,
    title: "Mã Hóa String",
    description: "Tất cả chuỗi văn bản được mã hóa để ngăn chặn việc tìm kiếm và phân tích code.",
  },
  {
    icon: Zap,
    title: "Xử Lý Nhanh Chóng",
    description: "Obfuscate code trong vài giây với hiệu suất cao và không làm chậm ứng dụng.",
  },
  {
    icon: Eye,
    title: "Anti-Debug",
    description: "Tích hợp các kỹ thuật chống debug và phân tích ngược để bảo vệ tối đa.",
  },
  {
    icon: FileCode,
    title: "Hỗ Trợ Đa Ngôn Ngữ",
    description: "Hỗ trợ Python và JavaScript với các tùy chọn obfuscate phù hợp từng ngôn ngữ.",
  },
];

// Memoized feature card component
const FeatureCard = memo(({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  
  return (
    <motion.div
      className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 card-glow h-full relative overflow-hidden"
      whileHover={{ 
        scale: 1.02,
        y: -5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Hover spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(var(--primary), 0.1), transparent 40%)",
        }}
      />

      {/* Rotating border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-0 rounded-2xl bg-card" />
      </div>

      <div className="relative z-10">
        <motion.div 
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 border border-primary/20"
          whileHover={{ 
            rotate: [0, -10, 10, 0],
            scale: 1.1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-7 h-7 text-primary" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Bottom glow line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

FeatureCard.displayName = "FeatureCard";

const Features = memo(() => {
  // Memoize the feature cards to prevent recreation
  const featureCards = useMemo(() => 
    features.map((feature, index) => (
      <StaggerItem key={index}>
        <FeatureCard feature={feature} />
      </StaggerItem>
    )), 
  []);

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Bảo vệ code của bạn với{" "}
            <span className="gradient-text">công nghệ tiên tiến</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tất cả những gì bạn cần để bảo mật, tối ưu hóa và mở rộng ứng dụng của mình
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards}
        </StaggerContainer>
      </div>
    </section>
  );
});

Features.displayName = "Features";

export default Features;
