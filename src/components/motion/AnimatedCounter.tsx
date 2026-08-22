"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

function numberFromValue(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : null;
}

export function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.75 });
  const { mounted, reduced } = useMotionPreferences();
  const number = numberFromValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!mounted || !inView || reduced || number === null) return;
    const suffix = value.replace(String(number), "");
    setDisplay("0");
    const controls = animate(0, number, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(`${Math.round(latest)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, mounted, number, reduced, value]);

  return <span ref={ref}>{display}</span>;
}