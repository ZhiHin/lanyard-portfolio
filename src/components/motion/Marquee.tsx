"use client";

import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  reverse?: boolean;
  /** Seconds for one full loop. */
  speed?: number;
  className?: string;
};

export function Marquee({
  items,
  reverse = false,
  speed = 38,
  className = "",
}: MarqueeProps) {
  const style = {
    "--marquee-duration": `${speed}s`,
  } as CSSProperties;

  return (
    <div
      className={`marquee ${
        reverse ? "is-reverse" : ""
      } ${className}`}
    >
      <div className="marquee-track" style={style}>
        <ul className="marquee-row">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <ul
          className="marquee-row"
          aria-hidden="true"
        >
          {items.map((item, index) => (
            <li key={`dup-${index}`}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}