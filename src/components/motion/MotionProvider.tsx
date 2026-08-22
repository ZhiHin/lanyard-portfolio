"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionPreferences } from "./useMotionPreferences";

/** A lightweight, GPU-friendly page-reading indicator. */
export function MotionProvider() {
  const { mounted, reduced } = useMotionPreferences();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return <motion.div aria-hidden="true" className="reading-progress" style={{ scaleX: mounted && !reduced ? scaleX : 0 }} />;
}