import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';
import { Brain, Code2, Database, Server, Cloud, Wrench } from 'lucide-react';
import {
  SiRuby,
  SiRubyonrails,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
  SiRedux,
  SiTailwindcss,
  SiBootstrap,
  SiJquery,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiAmazonwebservices,
  SiDocker,
  SiHeroku,
  SiGit,
  SiGithub,
  SiScikitlearn,
  SiOpenai,
  SiJira,
} from 'react-icons/si';

type CategoryKey = 'all' | 'backend' | 'frontend' | 'database' | 'devops' | 'ai' | 'tools';

export const SkillsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');

  // Parallax for background decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [100, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [60, -150]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [140, -80]);
  const floatX1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const floatX2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const categories = [
    {
      id: 'backend' as CategoryKey,
      title: 'Backend Development',
      icon: Server,
      gradient: 'from-red-500 to-rose-600',
    },
    {
      id: 'frontend' as CategoryKey,
      title: 'Frontend Development',
      icon: Code2,
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'database' as CategoryKey,
      title: 'Databases',
      icon: Database,
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 'devops' as CategoryKey,
      title: 'Cloud & DevOps',
      icon: Cloud,
      gradient: 'from-orange-500 to-amber-600',
    },
    {
      id: 'ai' as CategoryKey,
      title: 'AI & Emerging Tech',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 'tools' as CategoryKey,
      title: 'Tools & Practices',
      icon: Wrench,
      gradient: 'from-indigo-500 to-purple-600',
    },
  ];

  const technologies = [
    { name: 'Ruby', icon: SiRuby, categories: ['backend'] },
    { name: 'Ruby on Rails', icon: SiRubyonrails, categories: ['backend'] },
    { name: 'Node.js', icon: SiNodedotjs, categories: ['backend'] },
    { name: 'Express.js', icon: SiExpress, categories: ['backend'] },
    { name: 'Python', icon: SiPython, categories: ['backend', 'ai'] },
    { name: 'FastAPI', icon: SiFastapi, categories: ['backend'] },
    { name: 'JavaScript', icon: SiJavascript, categories: ['frontend'] },
    { name: 'TypeScript', icon: SiTypescript, categories: ['frontend', 'backend'] },
    { name: 'React', icon: SiReact, categories: ['frontend'] },
    { name: 'Angular', icon: SiAngular, categories: ['frontend'] },
    { name: 'Redux', icon: SiRedux, categories: ['frontend'] },
    { name: 'Tailwind CSS', icon: SiTailwindcss, categories: ['frontend'] },
    { name: 'Bootstrap', icon: SiBootstrap, categories: ['frontend'] },
    { name: 'jQuery', icon: SiJquery, categories: ['frontend'] },
    { name: 'PostgreSQL', icon: SiPostgresql, categories: ['database'] },
    { name: 'MySQL', icon: SiMysql, categories: ['database'] },
    { name: 'MongoDB', icon: SiMongodb, categories: ['database'] },
    { name: 'AWS', icon: SiAmazonwebservices, categories: ['devops'] },
    { name: 'Docker', icon: SiDocker, categories: ['devops'] },
    { name: 'Heroku', icon: SiHeroku, categories: ['devops'] },
    { name: 'Git & CI/CD', icon: SiGit, categories: ['devops', 'tools'] },
    { name: 'GitHub', icon: SiGithub, categories: ['devops', 'tools'] },
    { name: 'Scikit-learn', icon: SiScikitlearn, categories: ['ai'] },
    { name: 'LLM Integration', icon: SiOpenai, categories: ['ai'] },
    { name: 'Jira & Scrum', icon: SiJira, categories: ['tools'] },
  ];

  const filteredTechnologies = selectedCategory === 'all'
    ? technologies
    : technologies.filter(tech => tech.categories.includes(selectedCategory));

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const techVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-20 relative ai-bg overflow-hidden" ref={sectionRef}>
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 -right-10 w-80 h-80 bg-accent/4 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY1, x: floatX1 }}
        />
        <motion.div
          className="absolute bottom-20 -left-16 w-72 h-72 bg-primary/5 rounded-full blur-3xl will-change-transform"
          style={{ y: orbY2, x: floatX2 }}
        />
        <motion.div
          className="absolute top-1/2 right-[30%] w-48 h-48 bg-accent/3 rounded-full blur-2xl will-change-transform"
          style={{ y: orbY3 }}
        />
        {/* Geometric accents */}
        <motion.div
          className="absolute top-[18%] left-[6%] w-3 h-3 rounded-full bg-primary/15 will-change-transform"
          style={{ y: orbY2 }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[5%] w-2 h-2 rounded-full bg-accent/20 will-change-transform"
          style={{ y: orbY1 }}
        />
        <motion.div
          className="absolute top-[60%] left-[50%] w-1.5 h-1.5 rounded-full bg-primary/20 will-change-transform"
          style={{ y: orbY3 }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 border-2 border-primary rounded-lg mb-6">
              <span className="text-primary font-semibold">Skills & Expertise</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Technical <span className="text-primary">Skills</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hover or click on a category to explore related tools
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Category Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4"
            >
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategory === category.id;

                return (
                  <motion.button
                    key={category.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${category.gradient} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {category.title}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Right: Technical Proficiency Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-2 border-border rounded-xl p-6 md:p-8 bg-card"
            >
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Technical Proficiency
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Core skills across backend, frontend, databases, cloud, and AI. Click a category to filter.
              </p>

              {/* Technology Grid — layout animation for smooth filter reflow */}
              <LayoutGroup>
                <div className="grid grid-cols-2 gap-3">
                  <AnimatePresence mode="popLayout">
                    {filteredTechnologies.map((tech, index) => {
                      const TechIcon = tech.icon;

                      return (
                        <motion.div
                          key={tech.name}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.3, type: "spring", stiffness: 300, damping: 25 },
                            layout: { type: "spring", stiffness: 300, damping: 30 },
                          }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300 group"
                        >
                          <TechIcon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium text-foreground">
                            {tech.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </LayoutGroup>

              {/* Show all button */}
              {selectedCategory !== 'all' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedCategory('all')}
                  className="mt-6 w-full py-2 px-4 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary/10 transition-all duration-300"
                >
                  Show All Technologies
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
