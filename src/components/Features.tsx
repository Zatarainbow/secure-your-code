import { Shield, Code, Lock, Zap, Eye, FileCode } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Bảo vệ mã nguồn",
    description: "Mã hóa code Python và JavaScript chống sao chép, bảo vệ tài sản trí tuệ của bạn.",
  },
  {
    icon: Code,
    title: "Làm rối code",
    description: "Biến đổi code thành dạng khó đọc nhưng vẫn giữ nguyên chức năng hoạt động.",
  },
  {
    icon: Lock,
    title: "Mã hóa chuỗi",
    description: "Mã hóa tất cả chuỗi và hằng số trong code để tăng độ bảo mật.",
  },
  {
    icon: Zap,
    title: "Nhanh chóng",
    description: "Xử lý obfuscate nhanh chóng, không làm chậm hiệu suất ứng dụng.",
  },
  {
    icon: Eye,
    title: "Chống debug",
    description: "Thêm lớp bảo vệ chống lại việc debug và phân tích ngược code.",
  },
  {
    icon: FileCode,
    title: "Hỗ trợ đa file",
    description: "Xử lý nhiều file cùng lúc, giữ nguyên cấu trúc project.",
  },
];

const Features = () => {
  return (
    <section id="products" className="py-16 md:py-24 relative px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-[100px] md:blur-[150px]" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Tính năng{" "}
            <span className="gradient-text">Obfuscator</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Bảo vệ toàn diện cho mã nguồn Python và JavaScript
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
