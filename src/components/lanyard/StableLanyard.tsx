"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export function StableLanyard() {
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-80, 0, 80], [-7, 0, 7]);

  return <div className="stable-lanyard" aria-label="Interactive event lanyard">
    <motion.div
      className="stable-lanyard-assembly"
      drag
      dragConstraints={{ top: -45, right: 72, bottom: 55, left: -72 }}
      dragElastic={.12}
      dragMomentum={false}
      style={{ x, rotate }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      animate={dragging ? undefined : { rotate: [0, -1.2, .8, 0] }}
      transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="stable-lanyard-strap" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => <span key={index} />)}
      </div>
      <div className="stable-lanyard-clip" aria-hidden="true"><i /><b /><span /></div>
      <div className="stable-lanyard-card"><img src="/card-base-dark.png" alt="Prompt to Production event card" /></div>
    </motion.div>
  </div>;
}
