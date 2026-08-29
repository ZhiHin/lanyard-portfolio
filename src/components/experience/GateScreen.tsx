"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { EASE_OUT } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useMotionPreferences } from "@/components/motion/useMotionPreferences";
import { personal } from "@/data/personal";

type GateScreenProps = {
  onEnter: () => void;
  onSkip: () => void;
  /** True while the curtain is playing so the gate can hold still underneath it. */
  leaving: boolean;
};

/**
 * Act 0 — the threshold. The strap descends to an empty clip; the card is
 * deliberately missing. No WebGL here: the lanyard is the surprise.
 */
export function GateScreen({ onEnter, onSkip, leaving }: GateScreenProps) {
  const { reduced } = useMotionPreferences();

  // Warm the 3D chunk and its assets while the visitor reads the question.
  // Imported lazily so the gate itself never carries three.js.
  useEffect(() => {
    const idle = window.setTimeout(() => {
      import("@/components/lanyard/preload").then((mod) => mod.preloadLanyardAssets()).catch(() => undefined);
    }, 400);
    return () => window.clearTimeout(idle);
  }, []);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE_OUT },
  });

  return (
    <section className={`gate ${leaving ? "is-leaving" : ""}`} aria-label="Welcome">
      <span className="blob blob-indigo gate-blob-a" aria-hidden="true" />
      <span className="blob blob-coral gate-blob-b" aria-hidden="true" />

      {/* The strap — descends from the top edge and stops at an empty clip */}
      <motion.div
        className="gate-strap"
        aria-hidden="true"
        initial={{ scaleY: reduced ? 1 : 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduced ? 0 : 1.4, delay: reduced ? 0 : 0.2, ease: EASE_OUT }}
      >
        <span className="gate-strap-band" />
        <span className="gate-strap-clip">
          <i />
        </span>
      </motion.div>

      <div className="gate-content">
        <motion.p className="gate-name" {...fade(0.9)}>
          <span className="gate-name-part">{personal.role}</span>
          <span className="gate-name-dot" aria-hidden="true">·</span>
          <span className="gate-name-part">{personal.location}</span>
        </motion.p>

        <SplitText
          as="h1"
          className="gate-question"
          text={`${personal.name}.`}
          trigger="mount"
          delay={1.1}
          stagger={0.09}
          highlight={[
            { index: 1, className: "accent" },
            { index: 2, className: "accent" },
          ]}
        />

        <motion.p className="gate-lead" {...fade(1.7)}>
          {personal.summary}
        </motion.p>

        <motion.div className="gate-actions" {...fade(1.9)}>
          <button type="button" className="btn btn-primary gate-enter" onClick={onEnter} autoFocus>
            Get to know me <ArrowRight size={18} />
          </button>
          <button type="button" className="text-link gate-skip" onClick={onSkip}>
            Just browsing — show me the work
          </button>
        </motion.div>
      </div>

      <motion.p className="gate-footnote" aria-hidden="true" {...fade(2.3)}>
        <span>{personal.initials} · Software engineer</span>
        <span>Portfolio · 2026</span>
      </motion.p>
    </section>
  );
}
