# Shared UI components

## ImageCarouselDialog
- Source: src/components/projects/ImageCarouselDialog.tsx
- Full source:
"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export type GallerySlide = { src: string; alt: string; portrait?: boolean };

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function ImageCarouselDialog({ slides, activeIndex, onChange, onClose }: { slides: GallerySlide[]; activeIndex: number; onChange: (index: number) => void; onClose: () => void }) {
  const activeSlide = slides[activeIndex];
  const move = (direction: -1 | 1) => onChange((activeIndex + direction + slides.length) % slides.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [activeIndex, onClose]);

  return createPortal(<div className="image-carousel-dialog" role="dialog" aria-modal="true" aria-label="Expanded project screenshot" onMouseDown={onClose}>
    <div className={`image-carousel-dialog-content ${activeSlide.portrait ? "is-portrait" : ""}`} onMouseDown={(event) => event.stopPropagation()}>
      <button className="image-dialog-close" type="button" onClick={onClose} aria-label="Close image viewer"><X size={20} /></button>
      <img src={`${publicBasePath}${activeSlide.src}`} alt={activeSlide.alt} />
      <div className="image-dialog-controls">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Show previous screenshot"><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Show next screenshot"><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  </div>, document.body);
}


## ProjectCaseStudyDialog
- Source: src/components/projects/ProjectCaseStudyDialog.tsx
- Full source:
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

## EvolystStayGallery
- Source: src/components/projects/EvolystStayGallery.tsx
- Full source:
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ImageCarouselDialog } from "./ImageCarouselDialog";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const slides = [
  { src: "/projects/evolyst-stay-1.png", alt: "Evolyst Stay home page" },
  { src: "/projects/evolyst-stay-2.png", alt: "Evolyst Stay accommodation search results" },
  { src: "/projects/evolyst-stay-3.png", alt: "Evolyst Stay room details page" },
  { src: "/projects/evolyst-stay-4.png", alt: "Evolyst Stay sign-in page" },
  { src: "/projects/evolyst-stay-5.png", alt: "Evolyst Stay checkout page" },
  { src: "/projects/evolyst-stay-mobile-hero.png", alt: "Evolyst Stay mobile home and search screen", mobile: true, portrait: true },
  { src: "/projects/evolyst-stay-mobile-stays.png", alt: "Evolyst Stay mobile handpicked stays screen", mobile: true, portrait: true },
  { src: "/projects/evolyst-stay-mobile-destinations.png", alt: "Evolyst Stay mobile destinations screen", mobile: true, portrait: true },
];

export function EvolystStayGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSlide = slides[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <div className={`project-art hotel-showcase ${activeSlide.mobile ? "is-mobile-showcase" : ""}`} role="region" aria-label="Evolyst Stay project screenshots">
      <img className={`project-gallery-image ${activeSlide.mobile ? "is-mobile-screenshot" : ""}`} src={`${publicBasePath}${activeSlide.src}`} alt={activeSlide.alt} />
      <button className="gallery-expand" type="button" onClick={() => setIsExpanded(true)} aria-label="Open Evolyst Stay screenshots in a larger viewer" />
      <div className="project-gallery-shade" aria-hidden="true" />
      <div className="project-gallery-top"><span>Travel technology</span><span>Evolyst Stay</span></div>
      <div className="project-gallery-controls">
        <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Show previous project screenshot"><ChevronLeft size={17} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Show next project screenshot"><ChevronRight size={17} /></button>
        </div>
      </div>
      {isExpanded && <ImageCarouselDialog slides={slides} activeIndex={activeIndex} onChange={setActiveIndex} onClose={() => setIsExpanded(false)} />}
    </div>
  );
}


## BusinessAdminGallery
- Source: src/components/projects/BusinessAdminGallery.tsx
- Full source:
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ImageCarouselDialog } from "./ImageCarouselDialog";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const slides = [
  { src: "/projects/novacore-admin-1.png", alt: "NovaCore admin sign-in screen" },
  { src: "/projects/novacore-admin-2.png", alt: "NovaCore business dashboard overview" },
  { src: "/projects/novacore-admin-3.png", alt: "NovaCore sales dashboard" },
  { src: "/projects/novacore-admin-4.png", alt: "NovaCore workspace settings" },
  { src: "/projects/novacore-admin-5.png", alt: "NovaCore business reports" },
  { src: "/projects/novacore-admin-6.png", alt: "NovaCore page access controls" },
];

export function BusinessAdminGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSlide = slides[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <div className="project-art dashboard-showcase" role="region" aria-label="Business Admin Dashboard screenshots">
      <img className="project-gallery-image" src={`${publicBasePath}${activeSlide.src}`} alt={activeSlide.alt} />
      <button className="gallery-expand" type="button" onClick={() => setIsExpanded(true)} aria-label="Open Business Admin Dashboard screenshots in a larger viewer" />
      <div className="project-gallery-shade" aria-hidden="true" />
      <div className="project-gallery-controls">
        <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Show previous Business Admin Dashboard screenshot"><ChevronLeft size={17} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Show next Business Admin Dashboard screenshot"><ChevronRight size={17} /></button>
        </div>
      </div>
      {isExpanded && <ImageCarouselDialog slides={slides} activeIndex={activeIndex} onChange={setActiveIndex} onClose={() => setIsExpanded(false)} />}
    </div>
  );
}


## RestaurantPosGallery
- Source: src/components/projects/RestaurantPosGallery.tsx
- Full source:
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ImageCarouselDialog } from "./ImageCarouselDialog";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const slides = [
  { src: "/projects/restaurant-pos-1.png", alt: "Restaurant OS dashboard" },
  { src: "/projects/restaurant-pos-2.png", alt: "Restaurant table management" },
  { src: "/projects/restaurant-pos-3.png", alt: "Restaurant table order screen" },
  { src: "/projects/restaurant-pos-4.png", alt: "Restaurant menu management" },
  { src: "/projects/restaurant-pos-5.png", alt: "Restaurant inventory management" },
  { src: "/projects/restaurant-pos-6.png", alt: "Restaurant sales reports" },
  { src: "/projects/restaurant-pos-7.png", alt: "Mobile restaurant ordering screen", mobile: true, portrait: true },
  { src: "/projects/restaurant-pos-8.png", alt: "Mobile restaurant bill screen", mobile: true, portrait: true },
];

export function RestaurantPosGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSlide = slides[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <div className={`project-art pos-showcase ${activeSlide.mobile ? "is-mobile-showcase" : ""}`} role="region" aria-label="Restaurant POS System screenshots">
      <img className={`project-gallery-image ${activeSlide.mobile ? "is-mobile-screenshot" : ""}`} src={`${publicBasePath}${activeSlide.src}`} alt={activeSlide.alt} />
      <button className="gallery-expand" type="button" onClick={() => setIsExpanded(true)} aria-label="Open Restaurant POS System screenshots in a larger viewer" />
      <div className="project-gallery-shade" aria-hidden="true" />
      <div className="project-gallery-controls">
        <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Show previous Restaurant POS System screenshot"><ChevronLeft size={17} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Show next Restaurant POS System screenshot"><ChevronRight size={17} /></button>
        </div>
      </div>
      {isExpanded && <ImageCarouselDialog slides={slides} activeIndex={activeIndex} onChange={setActiveIndex} onClose={() => setIsExpanded(false)} />}
    </div>
  );
}


