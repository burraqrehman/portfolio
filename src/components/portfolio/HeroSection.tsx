import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Brain, Cpu, Rocket, User, MessageCircle, Smartphone, Code } from "lucide-react";
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
          color: ['#0ea5e9', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)],
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
      {/* AI Model Function Background */}
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
                <span className="text-muted-foreground ml-2 text-xs">advanced_ai_model.py</span>
              </div>
              
              <motion.div
                className="text-secondary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-accent">import</span> <span className="text-primary">tensorflow</span> <span className="text-accent">as</span> <span className="text-primary">tf</span>
              </motion.div>
              
              <motion.div
                className="text-secondary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                <span className="text-accent">from</span> <span className="text-primary">tensorflow.keras</span> <span className="text-accent">import</span> <span className="text-primary">layers, models</span>
              </motion.div>
              
              <motion.div
                className="text-secondary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              >
                <span className="text-accent">import</span> <span className="text-primary">numpy</span> <span className="text-accent">as</span> <span className="text-primary">np</span>
              </motion.div>
              
              <div className="mt-4"></div>
              
              <motion.div
                className="text-secondary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                <span className="text-accent">def</span> <span className="text-primary">create_neural_network</span><span className="text-muted-foreground">(</span><span className="text-accent">input_shape</span><span className="text-muted-foreground">,</span> <span className="text-accent">num_classes</span><span className="text-muted-foreground">):</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >
                <span className="text-primary">model</span> <span className="text-muted-foreground">=</span> <span className="text-primary">models</span><span className="text-muted-foreground">.</span><span className="text-primary">Sequential</span><span className="text-muted-foreground">([</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <span className="text-primary">layers</span><span className="text-muted-foreground">.</span><span className="text-primary">Dense</span><span className="text-muted-foreground">(</span><span className="text-accent">512</span><span className="text-muted-foreground">,</span> <span className="text-accent">activation</span><span className="text-muted-foreground">=</span><span className="text-secondary">'relu'</span><span className="text-muted-foreground">,</span> <span className="text-accent">input_shape</span><span className="text-muted-foreground">=</span><span className="text-accent">input_shape</span><span className="text-muted-foreground">),</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
              >
                <span className="text-primary">layers</span><span className="text-muted-foreground">.</span><span className="text-primary">Dropout</span><span className="text-muted-foreground">(</span><span className="text-accent">0.3</span><span className="text-muted-foreground">),</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
              >
                <span className="text-primary">layers</span><span className="text-muted-foreground">.</span><span className="text-primary">Dense</span><span className="text-muted-foreground">(</span><span className="text-accent">256</span><span className="text-muted-foreground">,</span> <span className="text-accent">activation</span><span className="text-muted-foreground">=</span><span className="text-secondary">'relu'</span><span className="text-muted-foreground">),</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
              >
                <span className="text-primary">layers</span><span className="text-muted-foreground">.</span><span className="text-primary">BatchNormalization</span><span className="text-muted-foreground">(),</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
              >
                <span className="text-primary">layers</span><span className="text-muted-foreground">.</span><span className="text-primary">Dense</span><span className="text-muted-foreground">(</span><span className="text-accent">128</span><span className="text-muted-foreground">,</span> <span className="text-accent">activation</span><span className="text-muted-foreground">=</span><span className="text-secondary">'relu'</span><span className="text-muted-foreground">),</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              >
                <span className="text-primary">layers</span><span className="text-muted-foreground">.</span><span className="text-primary">Dropout</span><span className="text-muted-foreground">(</span><span className="text-accent">0.2</span><span className="text-muted-foreground">),</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2.2 }}
              >
                <span className="text-primary">layers</span><span className="text-muted-foreground">.</span><span className="text-primary">Dense</span><span className="text-muted-foreground">(</span><span className="text-accent">num_classes</span><span className="text-muted-foreground">,</span> <span className="text-accent">activation</span><span className="text-muted-foreground">=</span><span className="text-secondary">'softmax'</span><span className="text-muted-foreground">)</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2.4 }}
              >
                <span className="text-muted-foreground">])</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2.6 }}
              >
                <span className="text-accent">return</span> <span className="text-accent">model</span>
              </motion.div>
              
              <div className="mt-4"></div>
              
              <motion.div
                className="text-secondary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2.8 }}
              >
                <span className="text-accent">def</span> <span className="text-primary">train_model</span><span className="text-muted-foreground">(</span><span className="text-accent">model</span><span className="text-muted-foreground">,</span> <span className="text-accent">X_train</span><span className="text-muted-foreground">,</span> <span className="text-accent">y_train</span><span className="text-muted-foreground">,</span> <span className="text-accent">X_val</span><span className="text-muted-foreground">,</span> <span className="text-accent">y_val</span><span className="text-muted-foreground">):</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3 }}
              >
                <span className="text-accent">model</span><span className="text-muted-foreground">.</span><span className="text-primary">compile</span><span className="text-muted-foreground">(</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.2 }}
              >
                <span className="text-accent">optimizer</span><span className="text-muted-foreground">=</span><span className="text-primary">tf</span><span className="text-muted-foreground">.</span><span className="text-primary">keras</span><span className="text-muted-foreground">.</span><span className="text-primary">optimizers</span><span className="text-muted-foreground">.</span><span className="text-primary">Adam</span><span className="text-muted-foreground">(</span><span className="text-accent">learning_rate</span><span className="text-muted-foreground">=</span><span className="text-accent">0.001</span><span className="text-muted-foreground">),</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.4 }}
              >
                <span className="text-accent">loss</span><span className="text-muted-foreground">=</span><span className="text-secondary">'categorical_crossentropy'</span><span className="text-muted-foreground">,</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.6 }}
              >
                <span className="text-accent">metrics</span><span className="text-muted-foreground">=[</span><span className="text-secondary">'accuracy'</span><span className="text-muted-foreground">,</span> <span className="text-secondary">'precision'</span><span className="text-muted-foreground">,</span> <span className="text-secondary">'recall'</span><span className="text-muted-foreground">]</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.8 }}
              >
                <span className="text-muted-foreground">)</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-4 mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 4 }}
              >
                <span className="text-accent">history</span> <span className="text-muted-foreground">=</span> <span className="text-accent">model</span><span className="text-muted-foreground">.</span><span className="text-primary">fit</span><span className="text-muted-foreground">(</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 4.2 }}
              >
                <span className="text-accent">X_train</span><span className="text-muted-foreground">,</span> <span className="text-accent">y_train</span><span className="text-muted-foreground">,</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 4.4 }}
              >
                <span className="text-accent">validation_data</span><span className="text-muted-foreground">=(</span><span className="text-accent">X_val</span><span className="text-muted-foreground">,</span> <span className="text-accent">y_val</span><span className="text-muted-foreground">),</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 4.6 }}
              >
                <span className="text-accent">epochs</span><span className="text-muted-foreground">=</span><span className="text-accent">100</span><span className="text-muted-foreground">,</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 4.8 }}
              >
                <span className="text-accent">batch_size</span><span className="text-muted-foreground">=</span><span className="text-accent">32</span><span className="text-muted-foreground">,</span>
              </motion.div>
              
              <motion.div
                className="text-secondary ml-8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 5 }}
              >
                <span className="text-accent">verbose</span><span className="text-muted-foreground">=</span><span className="text-accent">1</span>
        </motion.div>
              
        <motion.div
                className="text-secondary ml-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 5.2 }}
              >
                <span className="text-muted-foreground">)</span>
        </motion.div>
              
        <motion.div
                className="text-secondary ml-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 5.4 }}
              >
                <span className="text-accent">return</span> <span className="text-accent">history</span>
              </motion.div>
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
          <Brain className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-accent" />
          <Cpu className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-foreground leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          Hi I am <span className="text-shimmer">Mahad Khalid</span>
        </motion.h1>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed px-4">
            Crafting intelligent, future-ready solutions with <span className="text-primary font-semibold">Generative AI</span>, full-stack Web development, and React Native <span className="text-primary font-semibold">mobile apps</span>. I build scalable AI-powered platforms, modern digital experiences, and explore emerging <span className="text-primary font-semibold">Web3</span> and blockchain technologies to deliver secure, innovative products turning complex challenges into high-impact solutions, one algorithm, model, and line of code at a time.
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
              Get Advice
            </motion.button>

            <motion.button
              onClick={scrollToProjects}
              className="px-4 py-2 bg-transparent border border-muted-foreground/30 text-muted-foreground rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone className="w-4 h-4 inline mr-2" />
              Get Apps
            </motion.button>

            <motion.button
              onClick={scrollToProjects}
              className="px-4 py-2 bg-transparent border border-muted-foreground/30 text-muted-foreground rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Get Software
            </motion.button>
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