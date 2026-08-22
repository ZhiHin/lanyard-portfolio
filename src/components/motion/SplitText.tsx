"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { EASE_OUT } from "./Reveal";
import { useMotionPreferences } from "./useMotionPreferences";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** "view" reveals on scroll into view; "mount" reveals as soon as `play` is true (default: on mount). */
  trigger?: "view" | "mount";
  /** Only for trigger="mount": hold the text hidden until this becomes true. */
  play?: boolean;
  /** Per-word stagger in seconds. */
  stagger?: number;
  /** Optional class applied to a specific word index — lets a headline colour one word. */
  highlight?: { index: number; className: string }[];
  id?: string;
  tabIndex?: number;
};

/**
 * Masked, per-word headline reveal. The full string stays in the accessibility
 * tree through aria-label; the animated word spans are hidden from it.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  as = "h2",
  trigger = "view",
  play = true,
  stagger = 0.06,
  highlight = [],
  id,
  tabIndex,
}: SplitTextProps) {
  const { reduced } = useMotionPreferences();
  const Tag = motion[as];
  const words = text.split(/\s+/).filter(Boolean);

  const wordVariants = {
    hidden: { y: reduced ? 0 : "110%", opacity: reduced ? 1 : 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay + index * stagger, ease: EASE_OUT },
    }),
  };

  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: play ? ("visible" as const) : ("hidden" as const) }
      : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={`split-text ${className ?? ""}`} aria-label={text} id={id} tabIndex={tabIndex} {...triggerProps}>
      {words.map((word, index) => {
        const extra = highlight.find((entry) => entry.index === index)?.className ?? "";
        // The space must live *between* the masked spans; inside an
        // overflow-hidden inline-block it would be trimmed away.
        return (
          <Fragment key={`${word}-${index}`}>
            <span className="split-word" aria-hidden="true">
              <motion.span className={`split-word-inner ${extra}`} custom={index} variants={wordVariants}>
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
