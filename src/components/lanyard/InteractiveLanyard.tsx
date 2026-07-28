"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, QrCode, RotateCcw } from "lucide-react";
import { KeyboardEvent, PointerEvent, useState } from "react";
import { personal } from "@/data/personal";

export function InteractiveLanyard() {
  const shouldReduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const flip = () => setFlipped((value) => !value);
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); flip(); }
  };
  const handleMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch" || shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - bounds.top) / bounds.height - .5) * -7, y: ((event.clientX - bounds.left) / bounds.width - .5) * 8 });
  };
  return <div className="lanyard-stage" aria-label="Interactive digital identification card. Drag it, or press enter to turn it over.">
    <svg className="lanyard-strap" viewBox="0 0 650 750" aria-hidden="true" preserveAspectRatio="none"><defs><linearGradient id="strap" x1="0" x2="1"><stop stopColor="#282925"/><stop offset=".5" stopColor="#bea36d"/><stop offset="1" stopColor="#282925"/></linearGradient></defs><path d="M310 -20 C 285 135, 415 175, 357 348 C 338 404, 338 446, 338 482" fill="none" stroke="url(#strap)" strokeWidth="31" /><path d="M310 -20 C 285 135, 415 175, 357 348 C 338 404, 338 446, 338 482" fill="none" stroke="#ece4d5" strokeOpacity=".18" strokeWidth="1.5" /><text className="strap-copy"><textPath href="#strap-path">FOONG ZHI HIN — SOFTWARE ENGINEER — FOONG ZHI HIN</textPath></text><path id="strap-path" d="M310 -20 C 285 135, 415 175, 357 348 C 338 404, 338 446, 338 482" fill="none" /></svg>
    <div className="lanyard-clip" aria-hidden="true"><span /><i /></div>
    <motion.div className="card-dragger" drag dragConstraints={{ top: -58, right: 80, bottom: 58, left: -80 }} dragElastic={.13} dragMomentum={false} dragSnapToOrigin dragTransition={{ bounceStiffness: 360, bounceDamping: 16 }} animate={shouldReduceMotion ? {} : { rotate: [0, -1.4, 1, -.55, 0] }} transition={{ duration: 2.5, delay: .45, ease: "easeInOut" }}>
      <button className="id-card-button" onClick={flip} onKeyDown={handleKey} onPointerMove={handleMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })} aria-label={`Turn ID card ${flipped ? "to front" : "to back"}`}>
        <motion.div className="id-card" animate={{ rotateX: shouldReduceMotion ? 0 : tilt.x, rotateY: flipped ? 180 + tilt.y : tilt.y }} transition={{ type: "spring", stiffness: 180, damping: 18, mass: .45 }}>
          <div className="card-face card-front"><div className="card-topline"><span>FZH / 001</span><span>ISSUED 2026</span></div><div className="portrait"><span>{personal.initials}</span><i /></div><div className="card-identity"><p className="card-label">DIGITAL IDENTIFICATION</p><h2>{personal.name}</h2><p>{personal.role}</p></div><div className="card-bottom"><p>Designing useful systems<br />with considered details.</p><QrCode size={37} strokeWidth={1.25} /></div></div>
          <div className="card-face card-back"><div className="card-back-heading"><span>FZH / CONNECT</span><RotateCcw size={16} /></div><div className="card-skills"><p>Selected toolkit</p><span>TypeScript · React · Next.js</span><span>Angular · Java · Spring Boot</span><span>SQL · Supabase · Git</span></div><div className="card-contact"><a href={`mailto:${personal.email}`} onClick={(e) => e.stopPropagation()}><Mail size={15} /> {personal.email}</a><a href="https://github.com/ZhiHin" onClick={(e) => e.stopPropagation()}><Github size={15} /> github.com/ZhiHin</a><a href="https://www.linkedin.com/in/zhi-hin-foong/" onClick={(e) => e.stopPropagation()}><Linkedin size={15} /> linkedin.com/in/zhi-hin-foong</a></div><p className="card-available"><b /> {personal.availability}</p></div>
        </motion.div>
      </button>
    </motion.div>
    <p className="card-instruction"><span>Drag</span> to explore <i /> <span>Tap</span> to flip</p>
  </div>;
}
