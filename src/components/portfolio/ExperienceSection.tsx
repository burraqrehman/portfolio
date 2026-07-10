import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Brain,
  TrendingUp,
  Code,
  Target,
  LucideIcon,
  Briefcase,
} from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  category: string;
}

/**
 * Premium sticky-stacking card with 3D recession.
 * Each card pins in place, then recedes (scale + dim + tilt + blur)
 * as the next card slides up to cover it.
 */
const StackingExperienceCard = ({
  experience,
  index,
  total,
}: {
  experience: Experience;
  index: number;
  total: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLastCard = index === total - 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- Stacking transforms (applied when next card covers this one) ---
  // Deeper scale recession for dramatic depth
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    isLastCard ? [1, 1, 1] : [1, 1, 0.88]
  );
  // Fade to near-invisible when fully behind
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    isLastCard ? [1, 1, 1] : [1, 1, 0.25]
  );
  // Subtle 3D tilt — card tilts away as it recedes
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isLastCard ? [0, 0, 0] : [0, 0, -3]
  );
  // Slight Y push — covered cards shift up a touch
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isLastCard ? [0, 0, 0] : [0, 0, -8]
  );
  // Shadow deepens on active card, flattens on covered cards
  const shadowOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    isLastCard ? [1, 1, 1] : [1, 1, 0]
  );

  const IconComponent = experience.icon;

  // Sticky offset — each card pins slightly lower, revealing a sliver of the card behind
  const stickyTop = 88 + index * 32;

  return (
    <div
      ref={containerRef}
      style={{ height: isLastCard ? "auto" : "50vh" }}
      className="relative"
    >
      <motion.div
        style={{
          position: "sticky",
          top: `${stickyTop}px`,
          scale,
          opacity: cardOpacity,
          rotateX,
          y: translateY,
          transformOrigin: "top center",
          zIndex: index + 1,
          perspective: 1200,
        }}
        className="will-change-transform"
      >
        {/* ── Step indicator row ── */}
        <div className="flex items-center gap-3 mb-3 px-1">
          {/* Numbered pill */}
          <div
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${experience.bgGradient})`,
              boxShadow: `0 4px 14px ${experience.bgGradient.split(",")[0].replace("linear-gradient(135deg, ", "")}40`,
            }}
          >
            <span className="relative z-10">0{index + 1}</span>
          </div>
          {/* Period + category */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
              {experience.period}
            </span>
            <Badge
              variant="outline"
              className="bg-primary/5 border-primary/20 text-primary text-[10px] font-semibold px-2 py-0"
            >
              {experience.category}
            </Badge>
          </div>
        </div>

        {/* ── Glass Card ── */}
        <motion.div
          style={{
            // Dynamic shadow — fades as card gets covered
            boxShadow: useTransform(
              shadowOpacity,
              (v) =>
                `0 20px 50px -12px rgba(5, 150, 105, ${0.12 * v}), 0 8px 20px -8px rgba(0, 0, 0, ${0.08 * v}), 0 0 0 1px rgba(5, 150, 105, ${0.08 * v})`
            ),
          }}
          whileHover={{
            y: -4,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }}
          className="group relative rounded-2xl overflow-hidden cursor-default"
        >
          {/* Glass background */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          />

          {/* Subtle top-edge gradient accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            style={{
              background: `linear-gradient(90deg, transparent, ${experience.bgGradient.split(",")[0].replace("linear-gradient(135deg, ", "")}, transparent)`,
              opacity: 0.6,
            }}
          />

          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{
              background: `linear-gradient(180deg, ${experience.bgGradient})`,
            }}
          />

          {/* Card content */}
          <div className="relative z-10 p-6 md:p-8">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-5">
              {/* Icon */}
              <div
                className={`p-2.5 rounded-xl border ${experience.color} shrink-0 transition-transform duration-300 group-hover:scale-110`}
                style={{
                  background: `linear-gradient(135deg, ${experience.bgGradient.split(",")[0].replace("linear-gradient(135deg, ", "")}08, ${experience.bgGradient.split(",")[0].replace("linear-gradient(135deg, ", "")}15)`,
                  borderColor: `${experience.bgGradient.split(",")[0].replace("linear-gradient(135deg, ", "")}25`,
                }}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              {/* Title block */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1 tracking-tight">
                  {experience.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {experience.company}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground/70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{experience.period}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm mb-5">
              {experience.description}
            </p>

            {/* Achievements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground/80 flex items-center gap-2 uppercase tracking-wider">
                <Target className="w-3 h-3 text-primary" />
                Key Achievements
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                {experience.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${experience.bgGradient})`,
                      }}
                    />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ExperienceSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Parallax for background decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [80, -160]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [160, -80]);

  const experiences: Experience[] = [
    {
      title: "Fullstack Developer",
      company: "Xprolabs",
      period: "Oct 2021 - Present",
      location: "Lahore, Pakistan",
      description:
        "Building production-ready web applications and maintaining multiple in-house modules. Developing full-stack solutions using Ruby on Rails, TypeScript, React, and Node.js, collaborating cross-functionally with designers, product managers, and backend engineers to deliver user-centric solutions.",
      achievements: [
        "Implemented CI/CD pipelines reducing deployment time by 40%",
        "Enhanced product performance by optimizing complex SQL queries and reducing latency",
        "Designed and implemented REST APIs with Node.js and React frontends",
        "Built multilingual survey platform (Kinari) with CSV import/export and dynamic translations",
        "Architected Supply Chain Management System from scratch with AWS S3 & RDS deployment",
        "Developed Apollo Web — a microservices-based customer loan management platform",
        "Mentored 3 junior developers with 100% retention rate",
        "Contributed to internal tooling that improved developer productivity",
      ],
      icon: Briefcase,
      color: "text-emerald-600",
      bgGradient: "#059669, #047857",
      category: "Full Stack Development",
    },
    {
      title: "Associate Software Engineer",
      company: "Southville Solutions",
      period: "Mar 2021 - Oct 2021",
      location: "Lahore, Pakistan",
      description:
        "Gained foundational experience in software development and agile methodologies, building task management and web scraping solutions while quickly adapting to new frameworks and tools.",
      achievements: [
        "Worked with Node.js, JavaScript/TypeScript, React, and Angular",
        "Built responsive UIs with HTML5, CSS3, and Bootstrap",
        "Developed a web scraper that stored 45,000+ job listings for a client",
        "Built Electask — a task management app with full-calendar integration",
        "Promoted clean coding practices and modular design",
        "Demonstrated learning agility across diverse technologies",
      ],
      icon: Code,
      color: "text-amber-600",
      bgGradient: "#f59e0b, #d97706",
      category: "Software Engineering",
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 ai-bg relative" ref={sectionRef}>
      {/* Parallax Background — overflow scoped here only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 left-[5%] w-72 h-72 bg-primary/4 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY1 }}
        />
        <motion.div
          className="absolute top-1/2 -right-16 w-64 h-64 bg-accent/5 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY2 }}
        />
        <motion.div
          className="absolute bottom-20 left-[20%] w-48 h-48 bg-primary/3 rounded-full blur-2xl will-change-transform"
          style={{ y: orbY3 }}
        />
        <motion.div
          className="absolute top-[15%] right-[12%] w-2 h-2 rounded-full bg-accent/20 will-change-transform"
          style={{ y: orbY1 }}
        />
        <motion.div
          className="absolute bottom-[25%] left-[8%] w-1.5 h-1.5 rounded-full bg-primary/25 will-change-transform"
          style={{ y: orbY3 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
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
            <Brain className="w-8 h-8 text-primary" />
            <TrendingUp className="w-8 h-8 text-accent" />
            <Code className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Professional <span className="text-primary">journey</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            5+ years of building robust, production-ready applications that drive business success
          </p>
        </motion.div>

        {/* Stacking Cards */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <StackingExperienceCard
              key={experience.title + experience.company}
              experience={experience}
              index={index}
              total={experiences.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
