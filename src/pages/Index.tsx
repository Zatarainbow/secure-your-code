import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CodeComparison from "@/components/CodeComparison";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen 
        onComplete={() => setIsLoading(false)} 
        duration={3000} 
      />
      {!isLoading && (
        <div className="min-h-screen bg-background noise animate-fade-in">
          <Navbar />
          <main>
            <Hero />
            <CodeComparison />
            <Features />
            <CTA />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
