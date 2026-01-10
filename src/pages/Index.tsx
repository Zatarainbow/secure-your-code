import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const beforeCode = `// Mã nguồn gốc - Dễ đọc
function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price * item.qty;
  }
  return total;
}

const API_KEY = "sk-secret-123";
const users = ["admin", "user"];

export { calculateTotal, API_KEY };`;

const afterCode = `// Đã obfuscate - Không thể đọc được
var _0x4a2f=['\\x70\\x72\\x69\\x63\\x65',
'\\x71\\x74\\x79'];(function(_0x2d8f05,
_0x4a2f6a){var _0x52fbf3=_0x2d8f05();
while(!![]){try{var _0x3b8d22=
-parseInt(_0x52fb('0x0'))/0x1*(
-parseInt(_0x52fb('0x1'))/0x2);
if(_0x3b8d22===_0x4a2f6a)break;else
_0x52fbf3['push'](_0x52fbf3['shift']
());}catch(_0x1d4e27){_0x52fbf3
['push'](_0x52fbf3['shift']());}}}(
_0x4a2f,0x7e3a2));var _0x8f2b=
[_0x52fb('0x3'),_0x52fb('0x4')];`;

const Index = () => {
  return (
    <div className="min-h-screen bg-background noise">
      <Navbar />
      <main>
        <Hero />
        <BeforeAfterSlider 
          beforeCode={beforeCode}
          afterCode={afterCode}
        />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
