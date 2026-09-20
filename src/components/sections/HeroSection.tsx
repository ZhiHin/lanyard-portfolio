"use client";

import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { PhysicsLanyard } from "@/components/lanyard/PhysicsLanyard";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE_OUT } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useMotionPreferences } from "@/components/motion/useMotionPreferences";
import { personal } from "@/data/personal";

type HeroSectionProps = {
  /** True once the story has released the card to fall onto its lanyard. */
  cardReleased: boolean;
};

/** Act 1 — The Reveal. The curtain clears and the card drops in beside the introduction. */
export function HeroSection({ cardReleased }: HeroSectionProps) {
  const { reduced } = useMotionPreferences();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: cardReleased ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: EASE_OUT },
  });

  return (
    <section className="hero" id="home">
      <span className="blob blob-indigo hero-blob-a" aria-hidden="true" />
      <span className="blob blob-coral hero-blob-b" aria-hidden="true" />

      <div className="hero-grid shell">
        <div className="hero-copy">
          <motion.p className="eyebrow" {...rise(0.2)}>
            <span className="eyebrow-number">01</span> The reveal
          </motion.p>

          <h1 className="hero-title" id="hero-heading" tabIndex={-1}>
            <span className="hero-greeting">
              <SplitText as="span" text="Hi, I'm" trigger="mount" play={cardReleased} delay={0.35} stagger={0.08} />
            </span>
            <span className="hero-name">
              <SplitText
                as="span"
                text={personal.firstName}
                trigger="mount"
                play={cardReleased}
                delay={0.55}
                stagger={0.1}
                highlight={[{ index: 0, className: "accent" }]}
              />
            </span>
          </h1>

          <motion.p className="hero-role" {...rise(0.8)}>
            {personal.role} <span aria-hidden="true">·</span> <MapPin size={15} aria-hidden="true" /> {personal.location}
          </motion.p>

          <motion.p className="hero-summary" {...rise(0.95)}>
            {personal.summary}
          </motion.p>

          <motion.div className="hero-actions" {...rise(1.1)}>
            <Magnetic className="btn btn-primary" href="#work">
              See the work <ArrowUpRight size={17} />
            </Magnetic>
            <Magnetic className="btn btn-ghost" href="#contact" strength={3}>
              Start a conversation
            </Magnetic>
          </motion.div>

          <motion.p className="hero-hint" {...rise(1.4)}>
            <span className="hero-hint-dot" aria-hidden="true" />
            Drag the card. It&apos;s real physics.
          </motion.p>
        </div>

        <div className="hero-stage">
          <PhysicsLanyard released={cardReleased} />
        </div>
      </div>

      <motion.a href="#about" className="scroll-cue" {...rise(1.8)}>
        <span>Scroll to begin</span>
        <ArrowDown size={16} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
