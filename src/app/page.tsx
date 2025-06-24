"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import InfoSection from "@/components/section/info-section";
import AboutSection from "@/components/section/about-section";
import WorksSection from "@/components/section/works-section";
import SkillsSection from "@/components/section/skills-section";
import FloatingIcons from "@/components/floating-icons";
import FloatingTexts from "@/components/floating-texts";
import BackgroundParticles from "@/components/background-particles";
import Lanyard from "@/components/reactbits/lanyard";
import CrosshairCursor from "@/components/crosshair-cursor";
import PreLoader from "@/components/pre-loader";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-visible select-none">
      <CrosshairCursor />
      <PreLoader />
      <BackgroundParticles>
        <div className="absolute inset-0 overflow-hidden pointer-events-none top-16">
          <Lanyard
            position={[0, 0, 32]}
            gravity={[0, -48, 0]}
            fov={12}
            bandLength={0.5}
          />
          <FloatingIcons />
          <FloatingTexts />
        </div>
        <Header />
        <InfoSection />
        <AboutSection />
        <WorksSection />
        <SkillsSection />
        <Footer />
      </BackgroundParticles>
    </div>
  );
}
