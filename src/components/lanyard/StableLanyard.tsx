"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { useMotionPreferences } from "@/components/motion/useMotionPreferences";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * The non-WebGL fallback: a CSS strap and the card image, draggable with a
 * spring return. Appears only if the 3D scene fails to load.
 */
export function StableLanyard({ released = true }: { released?: boolean }) {
  const { reduced } = useMotionPreferences();
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-80, 0, 80], [-7, 0, 7]);

  return (
    <div className="stable-lanyard" aria-label="Interactive event lanyard">
      <motion.div
        className="stable-lanyard-assembly"
        drag
        dragConstraints={{ top: -45, right: 72, bottom: 55, left: -72 }}
        dragElastic={0.12}
        dragMomentum={false}
        dragSnapToOrigin
        style={{ x, rotate }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        initial={{ y: reduced ? 0 : -420, opacity: reduced ? 1 : 0 }}
        animate={released ? { y: 0, opacity: 1, rotate: dragging || reduced ? 0 : [0, -1.2, 0.8, 0] } : {}}
        transition={{
          y: { type: "spring", stiffness: 110, damping: 14, mass: 1.1 },
          opacity: { duration: 0.3 },
          rotate: { duration: 3.1, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="stable-lanyard-strap" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="stable-lanyard-clip" aria-hidden="true">
          <i />
          <b />
          <span />
        </div>
        <div className="stable-lanyard-card">
          <img src={`${publicBasePath}/card-base-dark.png`} alt="Evolyst Studio event card" draggable={false} />
        </div>
      </motion.div>
    </div>
  );
}
