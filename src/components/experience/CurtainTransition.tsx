"use client";

import { motion } from "framer-motion";
import { useMotionPreferences } from "@/components/motion/useMotionPreferences";

type CurtainTransitionProps = {
  active: boolean;
  onComplete: () => void;
};

const PANELS = 5;

/**
 * Staggered vertical panels that wipe upward to reveal the portfolio beneath.
 * The last panel's completion hands control back. Under reduced motion it is
 * a short crossfade that still calls onComplete.
 */
export function CurtainTransition({ active, onComplete }: CurtainTransitionProps) {
  const { reduced } = useMotionPreferences();
  if (!active) return null;

  if (reduced) {
    return (
      <motion.div
        className="curtain curtain-fade"
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        onAnimationComplete={onComplete}
      />
    );
  }

  return (
    <div className="curtain" aria-hidden="true">
      {Array.from({ length: PANELS }, (_, index) => (
        <motion.span
          key={index}
          className="curtain-panel"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, delay: 0.18 + index * 0.07, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={index === PANELS - 1 ? onComplete : undefined}
        />
      ))}
    </div>
  );
}
