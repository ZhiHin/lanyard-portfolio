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
