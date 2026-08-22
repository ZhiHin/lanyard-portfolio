"use client";

import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { useMotionPreferences } from "@/components/motion/useMotionPreferences";
import { personal } from "@/data/personal";

export function ContactSection() {
  const { reduced } = useMotionPreferences();
  const resumePath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume.pdf`;
  return <section className="contact section-shell" id="contact"><motion.div initial={{ opacity: 0, y: reduced ? 0 : 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: reduced ? 0 : .7, ease: [0.22, 1, 0.36, 1] }}><p className="eyebrow">03 / Contact</p><div className="contact-grid"><h2>Have an idea<br /><em>worth building?</em></h2><div className="contact-copy"><p>I am open to software engineering opportunities, collaborations and meaningful digital projects.</p><Magnetic className="email-link" href={`mailto:${personal.email}`}>{personal.email} <ArrowUpRight size={21} /></Magnetic><div className="contact-links"><a href={personal.socials[0].href}><Github size={17} /> GitHub</a><a href={personal.socials[1].href}><Linkedin size={17} /> LinkedIn</a><a href={resumePath} download>Download résumé <ArrowUpRight size={15} /></a></div></div></div></motion.div></section>;
}