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
