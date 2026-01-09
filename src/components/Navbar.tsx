import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: "Tính năng", href: "#products" },
    { name: "Hướng dẫn", href: "#docs" },
    { name: "Liên hệ", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Main navbar */}
      <div className="glass border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm md:text-lg">O</span>
              </div>
              <span className="font-semibold text-base md:text-lg">Obfuscator</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <div className="glass rounded-full py-1 gap-1 px-1 flex items-center">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/50"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                Bắt đầu
              </Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass border-t border-border/50 animate-fadeIn">
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-border/50">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Bắt đầu
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
