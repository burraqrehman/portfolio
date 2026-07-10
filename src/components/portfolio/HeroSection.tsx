import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Rocket, User, MessageCircle, Download, Code, Server } from "lucide-react";
import { useEffect, useRef, useState } from "react";


// Interactive particle background component
const InteractiveParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
  }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      // Reduce particle count on mobile for better performance
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile
        ? Math.min(15, Math.floor((canvas.width * canvas.height) / 40000))
        : Math.min(35, Math.floor((canvas.width * canvas.height) / 20000));

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
          size: Math.random() * (isMobile ? 1.5 : 2) + 1,
          color: ['#059669', '#14b8a6', '#10b981'][Math.floor(Math.random() * 3)],
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections (reduced on mobile for performance)
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
          particlesRef.current.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (1 - distance / 100) * 0.15;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 1 }}
    />
  );
};

/** One animated line of the background Ruby snippet. */
const CodeLine = ({ delay, indent = 0, children }: { delay: number; indent?: number; children: React.ReactNode }) => (
  <motion.div
    className={`text-secondary ${indent === 1 ? "ml-4" : indent === 2 ? "ml-8" : indent === 3 ? "ml-12" : ""}`}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 2, repeat: Infinity, delay }}
  >
    {children}
  </motion.div>
);

export const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative ai-bg pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <InteractiveParticles />
      {/* Rails Service Object Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {/* Background animations */}
        <div className="absolute inset-0">
          {/* Floating orbs in background */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-16 h-16 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 15, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-12 h-12 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-secondary/5 to-primary/5 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, -12, 0],
              y: [0, 12, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-2/3 right-1/3 w-10 h-10 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-accent/5 to-secondary/5 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
              x: [0, 10, 0],
              y: [0, -8, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />

          {/* Floating tech icons - hidden on mobile for performance */}
          <motion.div
            className="absolute top-1/5 right-1/6 text-primary/20 hidden md:block"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-1/5 right-1/4 text-accent/20 hidden md:block"
            animate={{
              y: [0, 25, 0],
              rotate: [0, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </motion.div>
        </div>

        {/* Extended Code Block from top-left to bottom-left */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            className="absolute top-4 left-2 right-2 md:top-10 md:left-10 md:right-auto md:bottom-10 bg-black/20 backdrop-blur-sm rounded-lg p-3 md:p-6 border border-primary/20 max-w-3xl w-auto md:max-w-none hidden sm:block"
            initial={{ opacity: 0, scale: 0.8, x: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="text-xs md:text-xs font-mono text-primary space-y-1 overflow-x-auto">
              <div className="flex items-center gap-2 mb-2 md:mb-4">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground ml-2 text-xs">app/services/survey_translation_service.rb</span>
              </div>

              <CodeLine delay={0}>
                <span className="text-accent">class</span> <span className="text-primary">SurveyTranslationService</span>
              </CodeLine>
              <CodeLine delay={0.2} indent={1}>
                <span className="text-accent">include</span> <span className="text-primary">Sidekiq::Worker</span>
              </CodeLine>

              <div className="mt-4"></div>

              <CodeLine delay={0.4} indent={1}>
                <span className="text-accent">def</span> <span className="text-primary">initialize</span><span className="text-muted-foreground">(</span><span className="text-accent">survey</span><span className="text-muted-foreground">,</span> <span className="text-accent">locales</span><span className="text-muted-foreground">)</span>
              </CodeLine>
              <CodeLine delay={0.6} indent={2}>
                <span className="text-primary">@survey</span> <span className="text-muted-foreground">=</span> <span className="text-accent">survey</span>
              </CodeLine>
              <CodeLine delay={0.8} indent={2}>
                <span className="text-primary">@locales</span> <span className="text-muted-foreground">=</span> <span className="text-accent">locales</span>
              </CodeLine>
              <CodeLine delay={1} indent={1}>
                <span className="text-accent">end</span>
              </CodeLine>

              <div className="mt-4"></div>

              <CodeLine delay={1.2} indent={1}>
                <span className="text-accent">def</span> <span className="text-primary">call</span>
              </CodeLine>
              <CodeLine delay={1.4} indent={2}>
                <span className="text-primary">@locales</span><span className="text-muted-foreground">.</span><span className="text-primary">each</span> <span className="text-accent">do</span> <span className="text-muted-foreground">|</span><span className="text-accent">locale</span><span className="text-muted-foreground">|</span>
              </CodeLine>
              <CodeLine delay={1.6} indent={3}>
                <span className="text-primary">translate_questions</span><span className="text-muted-foreground">(</span><span className="text-accent">locale</span><span className="text-muted-foreground">)</span>
              </CodeLine>
              <CodeLine delay={1.8} indent={2}>
                <span className="text-accent">end</span>
              </CodeLine>
              <CodeLine delay={2} indent={1}>
                <span className="text-accent">end</span>
              </CodeLine>

              <div className="mt-4"></div>

              <CodeLine delay={2.2} indent={1}>
                <span className="text-accent">private</span>
              </CodeLine>

              <div className="mt-4"></div>

              <CodeLine delay={2.4} indent={1}>
                <span className="text-accent">def</span> <span className="text-primary">translate_questions</span><span className="text-muted-foreground">(</span><span className="text-accent">locale</span><span className="text-muted-foreground">)</span>
              </CodeLine>
              <CodeLine delay={2.6} indent={2}>
                <span className="text-primary">@survey</span><span className="text-muted-foreground">.</span><span className="text-primary">questions</span><span className="text-muted-foreground">.</span><span className="text-primary">find_each</span> <span className="text-accent">do</span> <span className="text-muted-foreground">|</span><span className="text-accent">question</span><span className="text-muted-foreground">|</span>
              </CodeLine>
              <CodeLine delay={2.8} indent={3}>
                <span className="text-accent">text</span> <span className="text-muted-foreground">=</span> <span className="text-primary">Translator</span><span className="text-muted-foreground">.</span><span className="text-primary">translate</span><span className="text-muted-foreground">(</span><span className="text-accent">question</span><span className="text-muted-foreground">.</span><span className="text-primary">text</span><span className="text-muted-foreground">,</span> <span className="text-accent">to:</span> <span className="text-accent">locale</span><span className="text-muted-foreground">)</span>
              </CodeLine>
              <CodeLine delay={3} indent={3}>
                <span className="text-accent">question</span><span className="text-muted-foreground">.</span><span className="text-primary">translations</span><span className="text-muted-foreground">.</span><span className="text-primary">create!</span><span className="text-muted-foreground">(</span><span className="text-accent">locale:</span> <span className="text-accent">locale</span><span className="text-muted-foreground">,</span> <span className="text-accent">text:</span> <span className="text-accent">text</span><span className="text-muted-foreground">)</span>
              </CodeLine>
              <CodeLine delay={3.2} indent={2}>
                <span className="text-accent">end</span>
              </CodeLine>
              <CodeLine delay={3.4} indent={1}>
                <span className="text-accent">end</span>
              </CodeLine>

              <div className="mt-4"></div>

              <CodeLine delay={3.6} indent={1}>
                <span className="text-accent">def</span> <span className="text-primary">archive_recording</span><span className="text-muted-foreground">(</span><span className="text-accent">call</span><span className="text-muted-foreground">)</span>
              </CodeLine>
              <CodeLine delay={3.8} indent={2}>
                <span className="text-accent">s3</span> <span className="text-muted-foreground">=</span> <span className="text-primary">Aws::S3::Resource</span><span className="text-muted-foreground">.</span><span className="text-primary">new</span><span className="text-muted-foreground">(</span><span className="text-accent">region:</span> <span className="text-secondary">'us-east-1'</span><span className="text-muted-foreground">)</span>
              </CodeLine>
              <CodeLine delay={4} indent={2}>
                <span className="text-accent">s3</span><span className="text-muted-foreground">.</span><span className="text-primary">bucket</span><span className="text-muted-foreground">(</span><span className="text-secondary">'recordings'</span><span className="text-muted-foreground">).</span><span className="text-primary">object</span><span className="text-muted-foreground">(</span><span className="text-accent">call</span><span className="text-muted-foreground">.</span><span className="text-primary">sid</span><span className="text-muted-foreground">).</span><span className="text-primary">upload_file</span><span className="text-muted-foreground">(</span><span className="text-accent">call</span><span className="text-muted-foreground">.</span><span className="text-primary">recording_path</span><span className="text-muted-foreground">)</span>
              </CodeLine>
              <CodeLine delay={4.2} indent={1}>
                <span className="text-accent">end</span>
              </CodeLine>
              <CodeLine delay={4.4}>
                <span className="text-accent">end</span>
              </CodeLine>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Main Content */}
      <motion.div
        className="text-center z-10 px-2 sm:px-4 max-w-5xl mx-auto relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Server className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-accent" />
          <Code className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-foreground leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          Hi I am <span className="text-shimmer">Burraq Ur Rehman</span>
        </motion.h1>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed px-4">
            Crafting robust, production-ready applications with <span className="text-primary font-semibold">Ruby on Rails</span>, full-stack web development, and modern <span className="text-primary font-semibold">React &amp; TypeScript</span> frontends. I build scalable SaaS platforms, REST APIs, and cloud-native solutions on <span className="text-primary font-semibold">AWS</span> — mentoring teams, optimizing performance, and turning complex business challenges into high-impact software, one commit at a time.
          </p>

          {/* Primary CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-4 h-4" />
              Explore
            </motion.button>

            <motion.button
              onClick={scrollToAbout}
              className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-4 h-4" />
              About Me
            </motion.button>
          </motion.div>

          {/* Secondary Action Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              onClick={scrollToContact}
              className="px-4 py-2 bg-transparent border border-muted-foreground/30 text-muted-foreground rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Get In Touch
            </motion.button>

            <motion.button
              onClick={scrollToProjects}
              className="px-4 py-2 bg-transparent border border-muted-foreground/30 text-muted-foreground rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-4 h-4 inline mr-2" />
              View Projects
            </motion.button>

            <motion.a
              href="/Burraq_Ur_Rehman_Resume.pdf"
              download="Burraq_Ur_Rehman_Resume.pdf"
              className="px-4 py-2 bg-transparent border border-muted-foreground/30 text-muted-foreground rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.div
          onClick={scrollToAbout}
          className="text-muted-foreground/50 hover:text-primary transition-colors duration-300 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown size={24} className="md:w-6 md:h-6" />
        </motion.div>
      </div>
    </section>
  );
};
