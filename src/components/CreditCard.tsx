import { Wifi } from "lucide-react";

const CreditCard = () => {
  return (
    <div className="relative float">
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl opacity-50" />
      
      {/* Credit card */}
      <div className="relative w-80 h-48 rounded-2xl bg-gradient-to-br from-secondary via-card to-secondary border border-border/50 p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500">
        {/* Card chip and NFC */}
        <div className="flex justify-between items-start mb-8">
          <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
            <div className="w-8 h-6 rounded-sm border border-amber-600/50 bg-gradient-to-br from-amber-200 to-amber-400" />
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-muted-foreground rotate-90" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">EV</span>
            </div>
          </div>
        </div>

        {/* Card number */}
        <div className="font-mono text-xl tracking-wider text-foreground mb-6">
          5577 0000 5577 0004
        </div>

        {/* Card holder and expiry */}
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Card Holder</p>
            <p className="text-foreground font-medium">Chris Smith</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Expiry</p>
            <p className="text-foreground font-medium">04/28</p>
          </div>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
      </div>
    </div>
  );
};

export default CreditCard;
