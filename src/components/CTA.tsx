import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
          <span className="gradient-text">Bắt đầu bảo vệ</span> mã nguồn ngay
        </h2>
        <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto">
          Tham gia cùng hàng nghìn lập trình viên đang sử dụng công cụ của chúng tôi.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 group w-full sm:w-auto">
            Bắt đầu miễn phí
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="gradient-border w-full sm:w-auto">
            Liên hệ tư vấn
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
