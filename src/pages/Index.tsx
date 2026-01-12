import { useState, lazy, Suspense, memo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load heavy components for better initial load performance
const CodeComparison = lazy(() => import("@/components/CodeComparison"));
const Features = lazy(() => import("@/components/Features"));
const CTA = lazy(() => import("@/components/CTA"));

// Minimal loading fallback that matches the design
const SectionFallback = memo(() => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
));

SectionFallback.displayName = "SectionFallback";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <div className="min-h-screen bg-background noise animate-fade-in">
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={<SectionFallback />}>
              <CodeComparison />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Features />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <CTA />
            </Suspense>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
