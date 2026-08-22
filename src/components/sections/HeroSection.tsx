"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { PhysicsLanyard } from "@/components/lanyard/PhysicsLanyard";
import { Magnetic } from "@/components/motion/Magnetic";
import { useMotionPreferences } from "@/components/motion/useMotionPreferences";
import { personal } from "@/data/personal";

const headlineLines = ["Building thoughtful", "digital experiences", "through design", "and engineering."];

export function HeroSection() {
  const { reduced } = useMotionPreferences();
  const pointerX = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

  const followPointer = (event: PointerEvent<HTMLElement>) => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - .5) * 22);
    pointerY.set(((event.clientY - rect.top) / rect.height - .5) * 22);
  };

  return <section className="hero section-shell" id="home" onPointerMove={followPointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
    <motion.span aria-hidden="true" className="hero-ambient" style={{ x: pointerX, y: pointerY }} />
    <div className="hero-copy">
      <motion.p initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .55 }} className="eyebrow">Software Engineer · Kuala Lumpur</motion.p>
      <h1 aria-label={personal.headline}>{headlineLines.map((line, index) => <span className="hero-title-line" key={line}><motion.span initial={{ opacity: 0, y: reduced ? 0 : 54 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : .1 + index * .1, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}</h1>
      <motion.p initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : .55 }} className="hero-summary">{personal.summary}</motion.p>
      <motion.div initial={{ opacity: 0, y: reduced ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .6, delay: reduced ? 0 : .66 }} className="hero-actions"><Magnetic className="button button-dark" href="#projects">View my work <ArrowUpRight size={17} /></Magnetic><Magnetic className="text-link" href="#contact" strength={3}>Start a conversation <ArrowUpRight size={16} /></Magnetic></motion.div>
    </div>
    <motion.div className="hero-lanyard-wrap" initial={{ opacity: 0, y: reduced ? 0 : -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : .35, ease: [0.22, 1, 0.36, 1] }}><PhysicsLanyard /></motion.div>
    <a href="#about" className="scroll-cue"><span>Scroll to explore</span><ArrowDown size={16} /></a><p className="hero-index">01 — 04</p>
  </section>;
}