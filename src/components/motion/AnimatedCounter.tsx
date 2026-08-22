"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

/** Splits "03+" into { prefix: "", digits: "03", suffix: "+" } so padding and symbols survive the count. */
function parseValue(value: string) {
  const match = value.match(/\d+/);
  if (!match || match.index === undefined) return null;
  return {
    prefix: value.slice(0, match.index),
    digits: match[0],
    suffix: value.slice(match.index + match[0].length),
  };
}

export function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.75 });
  const { mounted, reduced } = useMotionPreferences();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parseValue(value);
    if (!mounted || !inView || reduced || parsed === null) return;
    const target = Number(parsed.digits);
    const width = parsed.digits.length;
    const format = (n: number) => `${parsed.prefix}${String(Math.round(n)).padStart(width, "0")}${parsed.suffix}`;
    setDisplay(format(0));
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(format(latest)),
    });
    return () => controls.stop();
  }, [inView, mounted, reduced, value]);

  return <span ref={ref}>{display}</span>;
}
