import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Cpu, Zap } from "lucide-react";

export const Footer = () => {
  const footerRef = useRef(null);

  // Subtle parallax for the footer background
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [30, -20]);

  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-background relative overflow-hidden" ref={footerRef}>
      {/* Subtle parallax background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -bottom-10 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY }}
        />
        <motion.div
          className="absolute -bottom-10 right-1/4 w-48 h-48 bg-accent/3 rounded-full blur-3xl will-change-transform"
          style={{ y: bgY }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* AI Icons */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cpu className="w-6 h-6 text-accent" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>

          {/* Main Footer Text */}
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            © 2026 <span className="text-shimmer">Burraq Ur Rehman</span>
          </motion.p>

          {/* Bottom Message */}
          <motion.p
            className="text-xs text-muted-foreground/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Building robust web applications, one commit at a time
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};
