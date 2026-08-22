"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
};

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Opacity + rise entrance on viewport entry. Plays once, collapses to static when motion is reduced. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div", amount = 0.2 }: RevealProps) {
  const { reduced } = useMotionPreferences();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}
