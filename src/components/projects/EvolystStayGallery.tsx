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
