import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Home } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["hero", "about", "experience", "skills", "projects", "certificates", "contact"];
      let currentSection = "hero";
      
      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is considered active if it's in the top portion of the viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = sections[i];
            break;
          }
        }
      }
      
      // No mapping needed - each section should be highlighted independently
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Expertise", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    
    // Immediately highlight the clicked section
    const sectionId = href.replace("#", "");
    setActiveSection(sectionId);
  };

  return (
    <motion.nav
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`navbar-pill transition-all duration-300 ${
        scrolled ? "scale-105" : "scale-100"
      }`}>
        {/* Unified Navigation for all screen sizes */}
        <div className="flex items-center justify-center w-full">
          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};