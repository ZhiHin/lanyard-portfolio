"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

type ParallaxProps = {
  children: ReactNode;
  /** -1..1. Positive drifts up as you scroll past; negative drifts down. */
  speed?: number;
  className?: string;
  /** Max travel in pixels at |speed| = 1. */
  range?: number;
};

/** Scroll-linked vertical drift for decorative layers. Static when motion is reduced. */
export function Parallax({ children, speed = 0.4, className, range = 160 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreferences();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range * speed, -range * speed]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduced ? 0 : y }}>
      {children}
    </motion.div>
  );
}
