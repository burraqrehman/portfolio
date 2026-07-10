import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, FileText, Star, Trophy, Rocket, Zap, Users, Medal, ExternalLink } from "lucide-react";

/** 3D tilt wrapper for certificate cards */
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>
      {children}
    </motion.div>
  );
};

export const CertificatesSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Parallax for background decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [60, -130]);
  const floatX = useTransform(scrollYProgress, [0, 1], [-15, 20]);

  interface Certificate {
    title: string;
    issuer: string;
    date: string;
    description: string;
    skills: string[];
    icon: typeof Award;
    color: string;
    category: string;
    credentialUrl?: string;
  }

  const certificates: Certificate[] = [
    {
      title: "AWS Certified Developer - Associate",
      issuer: "Udemy Learning",
      date: "May 2025",
      description: "Professional certification demonstrating expertise in developing, deploying, and debugging cloud-based applications using AWS services including EC2, S3, Lambda, and RDS.",
      skills: ["AWS EC2 & S3", "Lambda", "RDS", "Cloud Deployment"],
      icon: FileText,
      color: "text-orange-500",
      category: "Professional Certification",
      credentialUrl: "https://www.udemy.com/certificate/UC-be3e391a-3781-4e7f-9e72-44ba0be4a380/"
    },
    {
      title: "Learning SQL Programming",
      issuer: "LinkedIn Learning",
      date: "May 2024",
      description: "Certification in SQL programming covering database querying, joins, aggregations, and data manipulation — reinforcing expertise in database design and complex query optimization.",
      skills: ["SQL", "Database Design", "Query Optimization", "Data Management"],
      icon: Award,
      color: "text-blue-500",
      category: "Technical Certification",
      credentialUrl: "https://www.linkedin.com/learning/certificates/5f85834512ab97c90718cfe962c6debed9588f0b982114e97536360a9fea642d"
    },
    {
      title: "Agile Development with Scrum & SAFe",
      issuer: "Professional Training",
      date: "2023",
      description: "Training in agile development methodologies covering Scrum and SAFe frameworks, sprint planning, and cross-functional team collaboration for delivering high-quality software.",
      skills: ["Scrum", "SAFe Framework", "Sprint Planning", "Agile Delivery"],
      icon: Medal,
      color: "text-green-500",
      category: "Professional Training"
    },
    {
      title: "CMMS Launch Contributor",
      issuer: "Xprolabs",
      date: "2023",
      description: "Led the team launching a Computerized Maintenance Management System, improving operational efficiency by 45% through robust architecture and coordinated delivery.",
      skills: ["Team Leadership", "System Launch", "45% Efficiency Gain"],
      icon: Rocket,
      color: "text-purple-500",
      category: "Achievement"
    },
    {
      title: "Performance Excellence Award",
      issuer: "Xprolabs",
      date: "2023",
      description: "Recognized for optimizing application response times by 35% through complex SQL query optimization, latency reduction, and continuous performance evaluation.",
      skills: ["Performance Optimization", "SQL Tuning", "35% Faster Response"],
      icon: Zap,
      color: "text-yellow-500",
      category: "Achievement"
    },
    {
      title: "Team Leadership Recognition",
      issuer: "Xprolabs",
      date: "2023",
      description: "Mentored 3 junior developers with a 100% retention rate — promoting best coding practices, conducting thorough code reviews, and supporting career growth.",
      skills: ["Mentorship", "Code Reviews", "100% Retention"],
      icon: Users,
      color: "text-cyan-500",
      category: "Achievement"
    },
    {
      title: "Programming Competition Winner",
      issuer: "UOE Tech Fest",
      date: "2020",
      description: "Secured 1st place in the coding competition at the University of Education Tech Fest, demonstrating strong problem-solving and algorithmic skills under pressure.",
      skills: ["Problem Solving", "Algorithms", "1st Place"],
      icon: Trophy,
      color: "text-amber-500",
      category: "Achievement"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  return (
    <section id="certificates" className="py-20 px-4 ai-bg relative overflow-hidden" ref={sectionRef}>
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-10 -left-10 w-72 h-72 bg-accent/4 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY1, x: floatX }}
        />
        <motion.div
          className="absolute bottom-10 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY2 }}
        />
        <motion.div
          className="absolute top-[25%] right-[15%] w-2 h-2 rounded-full bg-primary/20 will-change-transform"
          style={{ y: orbY2 }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-1.5 h-1.5 rounded-full bg-accent/25 will-change-transform"
          style={{ y: orbY1 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Award className="w-8 h-8 text-primary" />
            <FileText className="w-8 h-8 text-accent" />
            <Trophy className="w-8 h-8 text-primary" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Certifications & <span className="text-shimmer">Achievements</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and academic achievements demonstrating expertise and commitment to excellence
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {certificates.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                className="group"
                style={{ perspective: 1000 }}
              >
                <TiltCard className="h-full">
                <Card className="ai-card group-hover:shadow-2xl group-hover:shadow-primary/10 h-full flex flex-col hover-glow transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-lg bg-card border border-border/50 ${cert.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col gap-2">
                            <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {cert.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary text-xs">
                                {cert.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{cert.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {cert.description}
                    </p>
                    
                    <div className="space-y-2 flex-1">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
                        <Star className="w-3 h-3 text-primary" />
                        Key Skills:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-secondary/50 text-secondary-foreground border-border/50 px-2 py-0.5"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-auto"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Credential
                      </a>
                    )}
                  </CardContent>
                </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
