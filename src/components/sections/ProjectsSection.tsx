"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const reduced = useReducedMotion();
  return <section className="projects section-shell" id="projects"><div className="projects-heading"><div><p className="eyebrow">02 / Selected work</p><h2>Built with<br /><em>intention.</em></h2></div><p>Selected explorations across product, platform and experience.</p></div><div className="project-list">{projects.map((project, index) => <motion.article className={`project-row ${index % 2 ? "reverse" : ""}`} key={project.number} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: reduced ? 0 : .65 }}><div className={`project-art ${project.accent}`} aria-label={`${project.title} project preview`}><span className="project-orbit" /><span className="project-art-title">{project.category}</span><div className="mock-window"><i /><i /><i /><b /></div></div><div className="project-copy"><p className="project-number">{project.number} <span>{project.year}</span></p><h3>{project.title}</h3><p>{project.description}</p><ul className="stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul><div className="project-actions"><a href="#contact">View case study <ArrowUpRight size={16} /></a><a href="https://github.com/ZhiHin" aria-label={`Source code for ${project.title}`}><Github size={18} /></a></div></div></motion.article>)}</div></section>;
}
