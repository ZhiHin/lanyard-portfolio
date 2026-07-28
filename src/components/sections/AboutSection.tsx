"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillGroups, statistics } from "@/data/skills";

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };

export function AboutSection() {
  const reduced = useReducedMotion();
  return <section className="about section-shell" id="about"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} transition={{ staggerChildren: .11, duration: reduced ? 0 : .65 }}><motion.p variants={reveal} className="eyebrow">01 / About me</motion.p><motion.div variants={reveal} className="about-intro"><h2>Function meets<br /><em>feeling.</em></h2><div><p className="lead-copy">I am a software engineer who cares as much about the journey through a product as the logic beneath it.</p><p>I work at the intersection of dependable systems and clear interfaces—turning complex requirements into digital products that feel direct, calm and human.</p></div></motion.div><motion.div variants={reveal} className="stats">{statistics.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</motion.div><motion.div variants={reveal} className="about-detail"><div><p className="small-label">My approach</p><p className="philosophy">“Good software respects the person on the other side of the screen.”</p></div><div className="skills-grid">{skillGroups.map((group) => <div key={group.title}><p className="small-label">{group.title}</p><ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div></motion.div></motion.div></section>;
}
