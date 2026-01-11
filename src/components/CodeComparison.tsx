import { motion } from "framer-motion";
import { Code, Shield, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

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

const afterCode = `// Đã obfuscate - Không thể đọc
var _0x4a2f=['\\x70\\x72\\x69',
'\\x71\\x74\\x79'];(function(
_0x2d8f05,_0x4a2f6a){var 
_0x52fbf3=_0x2d8f05();while
(!![]){try{var _0x3b8d22=
-parseInt(_0x52fb('0x0'))/
0x1*(-parseInt(_0x52fb('0x1
'))/0x2);if(_0x3b8d22===
_0x4a2f6a)break;else _0x52
fbf3['push'](_0x52fbf3[
'shift']());}catch(_0x1d4e
){_0x52fbf3['push'](_0x52
fbf3['shift']());}}}(_0x4a
2f,0x7e3a2));`;

const CodeComparison = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Xem sự <span className="gradient-text">khác biệt</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            So sánh code trước và sau khi được obfuscate
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Before Code */}
          <ScrollReveal direction="left" delay={0.1}>
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-red-500/30 bg-gradient-to-br from-background to-card h-full"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border-b border-red-500/20">
                <Code className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-400">Chưa Obfuscate</span>
                <div className="ml-auto flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>
              
              {/* Code content */}
              <div className="p-6 overflow-auto max-h-[400px] code-block">
                <pre className="text-sm md:text-base text-red-300/90 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                  {beforeCode}
                </pre>
              </div>

              {/* Warning badge */}
              <div className="absolute bottom-4 right-4">
                <motion.div
                  className="px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-xs text-red-400 font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚠️ Dễ bị sao chép
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Arrow in the middle for desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* After Code */}
          <ScrollReveal direction="right" delay={0.2}>
            <motion.div
              className="relative rounded-2xl overflow-hidden border border-green-500/30 bg-gradient-to-br from-background to-card h-full"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border-b border-green-500/20">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-400">Đã Obfuscate</span>
                <div className="ml-auto flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>
              
              {/* Code content */}
              <div className="p-6 overflow-auto max-h-[400px] code-block">
                <pre className="text-sm md:text-base text-green-300/90 whitespace-pre-wrap leading-relaxed break-all" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                  {afterCode}
                </pre>
              </div>

              {/* Success badge */}
              <div className="absolute bottom-4 right-4">
                <motion.div
                  className="px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-xs text-green-400 font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  ✓ Được bảo vệ
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Mobile arrow */}
        <div className="flex md:hidden justify-center my-4">
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center rotate-90"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodeComparison;
