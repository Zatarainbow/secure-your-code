import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CreditCard from "./CreditCard";
import MatrixRain from "./MatrixRain";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px]" />
      
      {/* Matrix rain effect */}
      <MatrixRain />

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fadeIn">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              The weapon of choice for Pythonistas worldwide.         
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Obfuscator</span>{" "}
              <span className="text-foreground">​Python</span>
              <br />
              <span className="text-foreground">​</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              <span className="text-foreground/80 font-medium">Maximum</span> protection,{" "}
              <span className="text-foreground/80 font-medium">minimum</span> compliance burden
            </p>

            {/* Description */}
            <p className="text-muted-foreground max-w-lg leading-relaxed">
              Take control of your payments stack — easily tokenize cards, optimize margins, 
              comply with PCI, avoid gateway lock-in, or spin-up card issuing programs.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 group">
                Bắt đầu Obfuscate
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="gradient-border">
                View Documentation
              </Button>
            </div>
          </div>

          {/* Right content - Credit Card */}
          <div className="relative flex justify-center lg:justify-end">
            <CreditCard />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;