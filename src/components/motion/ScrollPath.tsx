"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import type { RefObject } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

type ScrollPathProps = {
  /** The section whose scroll progress drives the line. */
  targetRef: RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * A vertical line that draws itself as the target section scrolls through the
 * viewport. Fully drawn and static when motion is reduced.
 */
export function ScrollPath({ targetRef, className = "" }: ScrollPathProps) {
  const { reduced } = useMotionPreferences();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start 70%", "end 60%"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <svg className={`scroll-path ${className}`} viewBox="0 0 4 1000" preserveAspectRatio="none" aria-hidden="true">
      <line x1="2" y1="0" x2="2" y2="1000" className="scroll-path-track" />
      <motion.line
        x1="2"
        y1="0"
        x2="2"
        y2="1000"
        className="scroll-path-ink"
        style={{ pathLength: reduced ? 1 : pathLength }}
      />
    </svg>
  );
}
