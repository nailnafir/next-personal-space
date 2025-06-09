"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundGrid from "@/components/aceternity/background-grid";
import InfoSection from "@/components/section/info-section";
import AboutSection from "@/components/section/about-section";
import ProjectSection from "@/components/section/project-section";
import SkillSection from "@/components/section/skill-section";
import FloatingIcons from "@/components/floating-icons";
import FloatingTexts from "@/components/floating-texts";
import Lanyard from "@/components/reactbits/lanyard";

export default function Home() {
  return (
    <div className="min-h-screen overflow-visible bg-transparent select-none">
      <BackgroundGrid>
        <div className="absolute inset-0 overflow-hidden pointer-events-none top-16">
          {/* Lanyard Profile */}
          <Lanyard
            position={[0, 0, 32]}
            gravity={[0, -48, 0]}
            fov={12}
            bandLength={0.5}
          />

          {/* Floating Elements */}
          <FloatingIcons />
          <FloatingTexts />
        </div>

        {/* Header */}
        <Header />

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
