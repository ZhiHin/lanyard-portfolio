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
