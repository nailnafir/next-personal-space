"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import InfoSection from "@/components/section/info-section";
import AboutSection from "@/components/section/about-section";
import WorksSection from "@/components/section/works-section";
import SkillsSection from "@/components/section/skills-section";
import FloatingIcons from "@/components/floating-icons";
import FloatingTexts from "@/components/floating-texts";
import Lanyard from "@/components/reactbits/lanyard";
import BackgroundParticles from "@/components/personal/background-particles";

export default function Home() {
  return (
    <div className="min-h-screen overflow-visible bg-transparent select-none">
      <BackgroundParticles>
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

        {/* Work Section */}
        <WorksSection />

        {/* Skill Section */}
        <SkillsSection />

        {/* Footer */}
        <Footer />
      </BackgroundParticles>
    </div>
  );
}
