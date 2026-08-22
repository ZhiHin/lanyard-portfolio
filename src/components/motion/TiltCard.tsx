"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type PointerEvent, type ReactNode, useEffect, useState } from "react";
import { useMotionPreferences } from "./useMotionPreferences";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  strength?: number;
};

/** Pointer-driven 3D tilt. Renders a plain block for coarse pointers and reduced motion. */
export function TiltCard({ children, className = "", strength = 9 }: TiltCardProps) {
  const { mounted, reduced } = useMotionPreferences();
  const [finePointer, setFinePointer] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 160, damping: 20, mass: 0.4 });
  const rotateX = useTransform(sy, [0, 1], [strength, -strength]);
  const rotateY = useTransform(sx, [0, 1], [-strength, strength]);
  const glowX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(sy, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!mounted || reduced || !finePointer) {
    return <div className={`tilt-card ${className}`}>{children}</div>;
  }

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const leave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      className={`tilt-card is-interactive ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={move}
      onPointerLeave={leave}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <motion.span
        aria-hidden="true"
        className="tilt-glow"
        style={{ left: glowX, top: glowY }}
      />
      {children}
    </motion.div>
  );
}
