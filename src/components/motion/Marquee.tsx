"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  reverse?: boolean;
  /** Seconds for one full loop. */
  speed?: number;
  className?: string;
};

/**
 * Infinite ticker driven by a CSS transform loop, not a JS frame loop.
 * The list is rendered twice so the -50% translate lands exactly on the seam;
 * the duplicate is hidden from assistive tech.
 */
export function Marquee({ items, reverse = false, speed = 38, className = "" }: MarqueeProps) {
  const style = { animationDuration: `${speed}s` };
  return (
    <div className={`marquee ${reverse ? "is-reverse" : ""} ${className}`}>
      <div className="marquee-track" style={style}>
        <ul className="marquee-row">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="marquee-row" aria-hidden="true">
          {items.map((item, index) => (
            <li key={`dup-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
