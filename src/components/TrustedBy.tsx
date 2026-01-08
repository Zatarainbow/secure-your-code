const logos = [
  "Rippling",
  "Cartrawler", 
  "Sorare",
  "Uniswap",
  "Sling",
  "SafetyWing",
  "Ramp",
  "Stitch",
  "XP",
  "Overwolf",
  "Duffel",
  "Humaans",
];

const TrustedBy = () => {
  return (
    <section className="py-16 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground text-sm mb-8">
          Global leaders trust Evervault to secure their most sensitive payment data
        </p>
        
        {/* Logo marquee */}
        <div className="relative">
          <div className="flex animate-[shimmer_20s_linear_infinite] gap-16">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 h-8 flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground transition-colors font-semibold text-lg"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
