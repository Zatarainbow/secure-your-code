import baLogo from "@/assets/ba-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Main navbar */}
      <div className="bg-black border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <img src={baLogo} alt="Logo" className="w-10 h-10" />
              <span className="font-bold text-xl text-white">Trần Bảo Ngọc</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;