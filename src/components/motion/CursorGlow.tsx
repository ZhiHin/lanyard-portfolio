"use client";

import { useEffect, useState } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

/**
 * A soft spotlight that follows the pointer. Position is written straight to
 * CSS custom properties from the move listener, so it never re-renders React.
 * Mounts only for fine pointers and never under reduced motion.
 */
export function CursorGlow() {
  const { mounted, reduced } = useMotionPreferences();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!mounted || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const root = document.documentElement;
    let frame = 0;
    let x = -1000;
    let y = -1000;

    const flush = () => {
      frame = 0;
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
    };
  }, [mounted, reduced]);

  if (!enabled) return null;
  return <div className="cursor-glow" aria-hidden="true" />;
}
