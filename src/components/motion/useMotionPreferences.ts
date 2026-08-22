"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Keeps server and first-client render identical before reading browser motion preferences. */
export function useMotionPreferences() {
  const userPrefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return { mounted, reduced: mounted && userPrefersReducedMotion };
}