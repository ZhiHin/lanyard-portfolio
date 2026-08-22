"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SectionRail } from "@/components/motion/SectionRail";
import { AboutSection } from "@/components/sections/AboutSection";
import { ArsenalSection } from "@/components/sections/ArsenalSection";
import { BeyondSection } from "@/components/sections/BeyondSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { WorkSection } from "@/components/sections/WorkSection";
import { navigation } from "@/data/personal";

type PortfolioProps = {
  /** True once the curtain has cleared and the page is interactive. */
  entered: boolean;
  /** True once the lanyard card should fall into frame. */
  cardReleased: boolean;
};

const railSections = navigation.map(({ id, label }) => ({ id, label }));

/** Acts 1–7, composed. Mounts underneath the curtain so the 3D scene is warm when it clears. */
export function Portfolio({ entered, cardReleased }: PortfolioProps) {
  return (
    <main className={`portfolio ${entered ? "is-entered" : ""}`} aria-hidden={!entered}>
      <MotionProvider />
      <CursorGlow />
      <SectionRail sections={railSections} />
      <Header />
      <HeroSection cardReleased={cardReleased} />
      <AboutSection />
      <JourneySection />
      <ArsenalSection />
      <WorkSection />
      <BeyondSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
