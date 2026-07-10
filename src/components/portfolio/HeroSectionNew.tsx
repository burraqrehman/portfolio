import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

export const HeroSectionNew = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Content parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Multi-layer background parallax — different speeds for depth
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);   // slow orb
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -320]);   // faster orb
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -140]);   // slowest orb
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -80]);    // grid moves very slowly
  const orbScale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.9]);
  const orbScale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 0.85]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);

  // Scroll indicator fades away faster
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-background-secondary"
    >
      {/* Animated Background Elements with Multi-Layer Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Gradient Orb 1 — Slow Layer */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY1, scale: orbScale1, opacity: orbOpacity }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Gradient Orb 2 — Faster Layer */}
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY2, scale: orbScale2, opacity: orbOpacity }}
          animate={{
            x: [0, -80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Gradient Orb 3 — Subtle Accent (new) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY3, opacity: orbOpacity }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid Pattern — Very Slow Parallax */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] will-change-transform"
          style={{ y: gridY }}
        />

        {/* Decorative Dots — Parallax depth markers */}
        <motion.div
          className="absolute top-[15%] right-[20%] w-2 h-2 rounded-full bg-primary/30 will-change-transform"
          style={{ y: orbY2 }}
        />
        <motion.div
          className="absolute top-[70%] left-[15%] w-3 h-3 rounded-full bg-accent/20 will-change-transform"
          style={{ y: orbY1 }}
        />
        <motion.div
          className="absolute top-[40%] right-[10%] w-1.5 h-1.5 rounded-full bg-primary/25 will-change-transform"
          style={{ y: orbY3 }}
        />
      </div>

      {/* Main Content — Parallax on content container */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
      >
        {/* Name - Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="mb-4"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 120 }}
            >
              Burraq Ur Rehman
            </motion.span>
          </h1>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <span className="text-sm font-medium text-foreground">
            Full Stack Developer | Ruby on Rails
          </span>
        </motion.div>

        {/* Main Heading with Stagger Animation */}
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 100 }}
          >
            Building
          </motion.span>
          {" "}
          <motion.span
            className="inline-block text-primary"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, type: "spring", stiffness: 100 }}
          >
            Scalable
          </motion.span>
          {" "}
          <motion.span
            className="inline-block"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1, type: "spring", stiffness: 100 }}
          >
            Solutions
          </motion.span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Full-Stack Developer with 5+ years of experience delivering robust, production-ready applications.
          Specializing in Ruby on Rails, React, TypeScript, Node.js, and AWS cloud solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="btn-3d group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <Button
            onClick={scrollToContact}
            size="lg"
            variant="outline"
            className="group border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
          >
            <span className="flex items-center gap-2">
              Get In Touch
            </span>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="group border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
          >
            <a href="/Burraq_Ur_Rehman_Resume.pdf" download="Burraq_Ur_Rehman_Resume.pdf">
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                Download CV
              </span>
            </a>
          </Button>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-16"
        >
          {[
            {
              icon: Github,
              label: "GitHub",
              href: "https://github.com/burraqrehman",
              color: "hover:bg-gray-800/10 hover:border-gray-800/30"
            },
            {
              icon: Linkedin,
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/burraq-ur-rehman/",
              color: "hover:bg-blue-500/10 hover:border-blue-500/30"
            },
            {
              icon: Mail,
              label: "Email",
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=burrraqdeveloper@gmail.com&su=Hello+from+Portfolio&body=Hi+Burraq,+I+came+across+your+portfolio+and+would+like+to+connect!",
              color: "hover:bg-primary/10 hover:border-primary/30"
            },
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.3 + index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border shadow-sm transition-all cursor-pointer ${item.color}`}
              onClick={item.icon === Mail ? (e: React.MouseEvent) => {
                e.preventDefault();
                const win = window.open(item.href, '_blank');
                if (!win) window.location.href = "mailto:burrraqdeveloper@gmail.com?subject=Hello from Portfolio&body=Hi Burraq, I came across your portfolio and would like to connect!";
              } : undefined}
            >
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator — Fades out quickly on scroll */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
