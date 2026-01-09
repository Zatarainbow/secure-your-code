const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">O</span>
            </div>
            <span className="font-semibold">Obfuscator</span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            © 2024 Obfuscator. Bảo vệ mã nguồn của bạn.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-foreground transition-colors">Bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
