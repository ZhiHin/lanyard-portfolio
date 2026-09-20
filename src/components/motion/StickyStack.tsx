"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Children, type CSSProperties, type ReactNode, useRef } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

type StickyStackProps = {
  children: ReactNode;
  className?: string;
  /** Pixel offset from the viewport top where cards pin. */
  top?: number;
  /** Extra pixels each successive card sits below the previous, so the stack edge is visible. */
  step?: number;
};

/**
 * Cards pin as you scroll and the next one slides over the last. Each card
 * scales down slightly as it is covered so the stack reads as depth.
 * Falls back to a plain list when motion is reduced.
 */
export function StickyStack({ children, className = "", top = 96, step = 14 }: StickyStackProps) {
  const { reduced } = useMotionPreferences();
  const items = Children.toArray(children);

  if (reduced) {
    return (
      <div className={`sticky-stack is-static ${className}`}>
        {items.map((child, index) => (
          <div className="sticky-item" key={index}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`sticky-stack ${className}`}>
      {items.map((child, index) => (
        <StickyItem key={index} index={index} total={items.length} top={top} step={step}>
          {child}
        </StickyItem>
      ))}
    </div>
  );
}

function StickyItem({ children, index, total, top, step }: { children: ReactNode; index: number; total: number; top: number; step: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Progress of *this* card being covered: 0 while on top, 1 when the next card fully overlaps.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, isLast ? 1 : 0.6]);

  return (
    <div
      ref={ref}
      className="sticky-item"
      style={
        {
          top: top + index * step,
          "--sticky-item-top": `${top + index * step}px`,
          "--sticky-step": `${step}px`,
        } as CSSProperties
      }
    >
      <motion.div className="sticky-inner" style={{ scale, opacity, transformOrigin: "center top" }}>
        {children}
      </motion.div>
    </div>
  );
}
