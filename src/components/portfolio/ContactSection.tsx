import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

/** Magnetic hover — element subtly follows the cursor when hovered. */
const MagneticWrap = ({ children, className = "", intensity = 0.3 }: { children: React.ReactNode; className?: string; intensity?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * intensity);
    y.set((e.clientY - rect.top - rect.height / 2) * intensity);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>
      {children}
    </motion.div>
  );
};

export const ContactSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const sectionRef = useRef(null);

  // Parallax for background blobs
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [100, -80]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [60, -120]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], [130, -50]);
  const blobX1 = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const blobX2 = useTransform(scrollYProgress, [0, 1], [20, -25]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const links = [
    {
      Icon: Mail,
      label: 'Email',
      value: 'burrraqdeveloper@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=burrraqdeveloper@gmail.com&su=Hello+from+Portfolio&body=Hi+Burraq,+I+came+across+your+portfolio+and+would+like+to+connect!',
      color: 'group-hover:bg-primary/20 group-hover:border-primary/40',
      iconColor: 'text-primary',
      external: true,
    },
    {
      Icon: Github,
      label: 'GitHub',
      value: '@burraqrehman',
      href: 'https://github.com/burraqrehman',
      color: 'group-hover:bg-gray-800/15 group-hover:border-gray-800/40',
      iconColor: 'text-gray-800 dark:text-white',
      external: true,
    },
    {
      Icon: Linkedin,
      label: 'LinkedIn',
      value: 'Burraq Ur Rehman',
      href: 'https://www.linkedin.com/in/burraq-ur-rehman/',
      color: 'group-hover:bg-blue-500/15 group-hover:border-blue-500/40',
      iconColor: 'text-blue-600',
      external: true,
    },
    {
      Icon: Phone,
      label: 'Phone',
      value: '+92 308 7042813',
      href: 'tel:+923087042813',
      color: 'group-hover:bg-emerald-500/15 group-hover:border-emerald-500/40',
      iconColor: 'text-emerald-600',
      external: false,
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background Blobs — now parallax-driven */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-[15%] w-80 h-80 bg-primary/8 rounded-full blur-3xl will-change-transform"
          style={{ y: blobY1, x: blobX1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-accent/8 rounded-full blur-3xl will-change-transform"
          style={{ y: blobY2, x: blobX2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl will-change-transform"
          style={{ y: blobY3 }}
        />
        {/* Subtle depth dots */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-2 h-2 rounded-full bg-primary/20 will-change-transform"
          style={{ y: blobY2 }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[5%] w-1.5 h-1.5 rounded-full bg-accent/25 will-change-transform"
          style={{ y: blobY1 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Main Card */}
          <motion.div
            variants={itemVariants}
            className="glass rounded-3xl p-8 md:p-12 lg:p-16 hover:shadow-glow transition-all duration-500 border border-border/50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side — Text */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Open to Opportunities</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Let's Build<br />
                  <span className="text-shimmer">Something Great</span>
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  Whether you have a project in mind, need a full-stack solution, or just want to connect — I'm always excited to hear about new ideas and collaborations.
                </p>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground">5+</span>
                    <span className="text-sm text-muted-foreground">Years Experience</span>
                  </div>
                  <div className="w-px h-10 bg-border"></div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground">&lt; 24h</span>
                    <span className="text-sm text-muted-foreground">Response Time</span>
                  </div>
                  <div className="w-px h-10 bg-border"></div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-foreground">Remote</span>
                    <span className="text-sm text-muted-foreground">Availability</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Side — Links */}
              <motion.div variants={itemVariants} className="space-y-4">
                {links.map(({ Icon, label, value, href, color, iconColor, external }) => (
                  <MagneticWrap key={label} intensity={0.15}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`group flex items-center justify-between p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${color}`}
                    onClick={Icon === Mail ? (e: React.MouseEvent) => {
                      e.preventDefault();
                      const win = window.open(href, '_blank');
                      if (!win) window.location.href = 'mailto:burrraqdeveloper@gmail.com?subject=Hello from Portfolio&body=Hi Burraq, I came across your portfolio and would like to connect!';
                    } : undefined}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-secondary/50 group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-base">{label}</p>
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                  </MagneticWrap>
                ))}

                {/* Quick Social Row */}
                <div className="flex items-center gap-3 pt-4 justify-center lg:justify-start">
                  <span className="text-sm text-muted-foreground mr-2">Follow me</span>
                  {[
                    { Icon: Github, href: 'https://github.com/burraqrehman', bg: 'hover:bg-gray-800 hover:text-white' },
                    { Icon: Linkedin, href: 'https://www.linkedin.com/in/burraq-ur-rehman/', bg: 'hover:bg-blue-600 hover:text-white' },
                    { Icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=burrraqdeveloper@gmail.com&su=Hello+from+Portfolio&body=Hi+Burraq,+I+came+across+your+portfolio+and+would+like+to+connect!', bg: 'hover:bg-primary hover:text-white' },
                  ].map(({ Icon, href, bg }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-full border border-border/50 bg-card/50 text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-md ${bg}`}
                      onClick={Icon === Mail ? (e: React.MouseEvent) => {
                        e.preventDefault();
                        const win = window.open(href, '_blank');
                        if (!win) window.location.href = 'mailto:burrraqdeveloper@gmail.com';
                      } : undefined}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
