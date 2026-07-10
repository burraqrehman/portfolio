import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView as useFramerInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cpu, Database, Zap, Code, Server, Layout, Cloud, Container, Users, Briefcase } from "lucide-react";

/** Animated counter — springs from 0 to target when scrolled into view. */
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, target, motionVal]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return unsubscribe;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export const AboutSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.3 });

  // Parallax for background decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [60, -140]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [140, -60]);
  const floatX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const expertise = [
    { name: "Ruby on Rails Development", icon: Server, color: "text-primary" },
    { name: "Python & FastAPI", icon: Cpu, color: "text-accent" },
    { name: "React & TypeScript", icon: Layout, color: "text-primary" },
    { name: "Node.js & REST APIs", icon: Code, color: "text-accent" },
    { name: "Database Design & SQL Optimization", icon: Database, color: "text-primary" },
    { name: "AWS Cloud Services", icon: Cloud, color: "text-accent" },
    { name: "Docker & CI/CD Pipelines", icon: Container, color: "text-primary" },
    { name: "Machine Learning & LLM Integration", icon: Brain, color: "text-accent" },
    { name: "Team Mentorship & Code Reviews", icon: Users, color: "text-primary" },
  ];

  const stats = [
    { label: "Years Experience", value: 5, suffix: "+", icon: Briefcase },
    { label: "Projects Delivered", value: 15, suffix: "+", icon: Code },
    { label: "Technologies", value: 20, suffix: "+", icon: Zap },
    { label: "Developers Mentored", value: 3, suffix: "+", icon: Users },
  ];

  return (
    <section id="about" className="py-20 px-4 ai-bg relative overflow-hidden" ref={sectionRef}>
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl will-change-transform" style={{ y: orbY1, x: floatX }} />
        <motion.div className="absolute bottom-10 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl will-change-transform" style={{ y: orbY2 }} />
        <motion.div className="absolute top-1/3 right-1/4 w-40 h-40 bg-primary/3 rounded-full blur-2xl will-change-transform" style={{ y: orbY3 }} />
        <motion.div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-primary/20 will-change-transform" style={{ y: orbY2 }} />
        <motion.div className="absolute bottom-[30%] right-[8%] w-1.5 h-1.5 rounded-full bg-accent/25 will-change-transform" style={{ y: orbY1 }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Brain className="w-8 h-8 text-primary" />
              <Cpu className="w-8 h-8 text-accent" />
              <Database className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              About <span className="text-shimmer">Me</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate full-stack developer delivering robust, production-ready applications
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bio Text */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate <span className="text-primary font-semibold">Full-Stack Developer</span> with
                  <span className="text-accent font-semibold"> 5+ years of experience</span> delivering robust, production-ready
                  applications. I hold a Bachelor's in Information Technology from the University of Education, Lahore,
                  and I'm adept at transforming product development through the strategic use of data and AI.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I have a strong command of <span className="text-primary font-semibold">Ruby on Rails</span>,
                  <span className="text-accent font-semibold"> TypeScript</span>,
                  <span className="text-primary font-semibold"> React</span>,
                  <span className="text-accent font-semibold"> Angular</span>,
                  <span className="text-primary font-semibold"> Python</span> and
                  <span className="text-accent font-semibold"> Node.js</span> — backed by hands-on experience with
                  <span className="text-primary font-semibold"> AWS</span>, Docker, and CI/CD pipelines.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I have a proven track record of <span className="text-primary font-semibold">mentoring junior developers</span>,
                  promoting best coding practices, and conducting thorough code reviews. I'm motivated by building
                  impactful tools that solve real-world problems, and I'm actively exploring the intersection of
                  <span className="text-accent font-semibold"> software development and artificial intelligence</span>.
                </p>
              </div>
            </motion.div>

            {/* Expertise Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="ai-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Brain className="w-6 h-6 text-primary" />
                    Core Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {expertise.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.div
                          key={item.name}
                          className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors hover-lift hover-glow"
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <IconComponent className={`w-5 h-5 ${item.color}`} />
                          <span className="text-foreground font-medium">{item.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats Section — Animated Counters */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-xl bg-card/50 border border-border/30 hover:border-primary/50 transition-colors hover-lift hover-glow"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.15 }}
                >
                  <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
