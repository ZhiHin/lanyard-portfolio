"use client";

import { type ComponentPropsWithoutRef, type CSSProperties, type MouseEvent, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type MagneticProps = ComponentPropsWithoutRef<"a"> & { strength?: number };

/** Adds a tiny pointer-only pull while keeping native links and focus behavior. */
export function Magnetic({ children, className = "", strength = 5, style, onMouseMove, onMouseLeave, ...props }: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseMove?.(event);
    if (reduced || !window.matchMedia("(pointer: fine)").matches || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength * 2;
    ref.current.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
    ref.current.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
  };

  const leave = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseLeave?.(event);
    ref.current?.style.setProperty("--magnetic-x", "0px");
    ref.current?.style.setProperty("--magnetic-y", "0px");
  };

  return <a ref={ref} className={`magnetic ${className}`} style={style as CSSProperties} onMouseMove={move} onMouseLeave={leave} {...props}>{children}</a>;
}