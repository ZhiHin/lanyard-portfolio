"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/projects";

export function ProjectCaseStudyDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [onClose]);

  return createPortal(
    <div className="case-study-dialog" role="dialog" aria-modal="true" aria-labelledby="case-study-title" onMouseDown={onClose}>
      <article className="case-study-dialog-content" onMouseDown={(event) => event.stopPropagation()}>
        <button className="case-study-close" type="button" onClick={onClose} aria-label="Close case study"><X size={20} /></button>
        <header className="case-study-header">
          <p>{project.number} / {project.category} <span>{project.year}</span></p>
          <h2 id="case-study-title">{project.title}</h2>
          <p className="case-study-overview">{project.caseStudy.overview}</p>
          <p className="case-study-focus">{project.caseStudy.focus}</p>
        </header>
        <div className="case-study-sections">
          {project.caseStudy.sections.map((section, index) => <section key={section.title}>
            <p className="case-study-section-number">0{index + 1}</p>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
            <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </section>)}
        </div>
        <footer className="case-study-stack"><span>Built with</span>{project.stack.map((item) => <b key={item}>{item}</b>)}</footer>
      </article>
    </div>,
    document.body,
  );
}