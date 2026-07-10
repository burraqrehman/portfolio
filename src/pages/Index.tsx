import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSectionNew } from "@/components/portfolio/HeroSectionNew";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { CertificatesSection } from "@/components/portfolio/CertificatesSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { SectionSeparatorEnhanced } from "@/components/ui/section-separator-enhanced";
import { RevealAnimation } from "@/components/portfolio/RevealAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section with Parallax */}
      <HeroSectionNew />

      {/* About Section with Reveal Animation */}
      <RevealAnimation>
        <AboutSection />
      </RevealAnimation>

      <SectionSeparatorEnhanced />

      {/* Experience Section with Reveal Animation */}
      <RevealAnimation>
        <ExperienceSection />
      </RevealAnimation>

      <SectionSeparatorEnhanced />

      {/* Skills Section with Reveal Animation */}
      <RevealAnimation>
        <SkillsSection />
      </RevealAnimation>

      <SectionSeparatorEnhanced />

      {/* Projects Section with Reveal Animation */}
      <RevealAnimation>
        <ProjectsSection />
      </RevealAnimation>

      <SectionSeparatorEnhanced />

      {/* Certificates Section with Reveal Animation */}
      <RevealAnimation>
        <CertificatesSection />
      </RevealAnimation>

      <SectionSeparatorEnhanced />

      {/* Contact Section with Reveal Animation */}
      <RevealAnimation>
        <ContactSection />
      </RevealAnimation>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;