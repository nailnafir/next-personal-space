"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundGrid from "@/components/aceternity/background-grid";
import InfoSection from "@/components/section/info-section";
import FloatingIcons from "@/components/floating-icons";
import FloatingTexts from "@/components/floating-texts";
import AboutSection from "@/components/section/about-section";
import ProjectSection from "@/components/section/project-section";
import SkillSection from "@/components/section/skill-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent dark:text-white text-black overflow-visible select-none">
      <BackgroundGrid>
        {/* Header */}
        <Header />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingIcons />
          <FloatingTexts />
        </div>

        {/* Info Section */}
        <InfoSection />

        {/* About Section */}
        <AboutSection />

        {/* Project Section */}
        <ProjectSection />

        {/* Skill Section */}
        <SkillSection />

        {/* Footer */}
        <Footer />
      </BackgroundGrid>
    </div>
  );
}
