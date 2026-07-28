"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ImageCarouselDialog } from "./ImageCarouselDialog";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const slides = [
  { src: "/projects/evolyst-console-1.png", alt: "Evolyst Console admin overview" },
  { src: "/projects/evolyst-console-2.png", alt: "Evolyst Console analytics dashboard" },
  { src: "/projects/evolyst-console-3.png", alt: "Evolyst Console access management" },
];

export function EvolystConsoleGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSlide = slides[activeIndex];
  const move = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + slides.length) % slides.length);

  return (
    <aside className="console-subsection" aria-labelledby="console-heading">
      <div className="console-gallery" role="region" aria-label="Evolyst Console admin panel screenshots">
        <img src={`${publicBasePath}${activeSlide.src}`} alt={activeSlide.alt} />
        <button className="gallery-expand" type="button" onClick={() => setIsExpanded(true)} aria-label="Open Hotel Booking System Admin Panel screenshots in a larger viewer" />
        <div className="console-gallery-top"><span>Admin operations</span><span>Hotel system</span></div>
        <div className="console-gallery-controls">
          <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          <div>
            <button type="button" onClick={() => move(-1)} aria-label="Show previous admin panel screenshot"><ChevronLeft size={17} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Show next admin panel screenshot"><ChevronRight size={17} /></button>
          </div>
        </div>
        {isExpanded && <ImageCarouselDialog slides={slides} activeIndex={activeIndex} onChange={setActiveIndex} onClose={() => setIsExpanded(false)} />}
      </div>
      <div className="console-subsection-copy">
        <p className="project-number">01A <span>2026</span></p>
        <h4 id="console-heading">Hotel Booking<br /><em>System Admin Panel.</em></h4>
        <p>A role-aware admin panel for managing bookings, room inventory, customer data, reporting, and access permissions in one operational workspace.</p>
        <ul className="stack"><li>Admin dashboard</li><li>Analytics</li><li>Access controls</li></ul>
      </div>
    </aside>
  );
}
