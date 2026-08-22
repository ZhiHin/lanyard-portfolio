"use client";

import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMotionPreferences } from "@/components/motion/useMotionPreferences";
import { ImageCarouselDialog, type GallerySlide } from "./ImageCarouselDialog";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export type ProjectSlide = GallerySlide & { mobile?: boolean };

type ProjectGalleryProps = {
  slides: ProjectSlide[];
  /** Accessible name for the region, e.g. "Evolyst Stay project screenshots". */
  label: string;
  /** Two short labels shown top-left and top-right of the frame. */
  tags: [string, string];
  /** Extra class for per-project tinting. */
  className?: string;
};

/**
 * One screenshot frame with prev/next, a live counter and an expand-to-dialog
 * action. Shared by every project; the wrappers only supply slides and copy.
 */
export function ProjectGallery({ slides, label, tags, className = "" }: ProjectGalleryProps) {
  const { reduced } = useMotionPreferences();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSlide = slides[activeIndex];

  const move = (step: -1 | 1) => {
    setDirection(step);
    setActiveIndex((current) => (current + step + slides.length) % slides.length);
  };

  return (
    <div className={`project-gallery ${activeSlide.mobile ? "is-mobile-showcase" : ""} ${className}`} role="region" aria-label={label}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={activeSlide.src}
          className={`project-gallery-image ${activeSlide.mobile ? "is-mobile-screenshot" : ""}`}
          src={`${publicBasePath}${activeSlide.src}`}
          alt={activeSlide.alt}
          custom={direction}
          initial={{ opacity: 0, x: reduced ? 0 : direction * 40, scale: reduced ? 1 : 1.02 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: reduced ? 0 : direction * -40, scale: reduced ? 1 : 0.98 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />
      </AnimatePresence>

      <button className="gallery-expand" type="button" onClick={() => setIsExpanded(true)} aria-label={`Open ${label} in a larger viewer`}>
        <span className="gallery-expand-hint" aria-hidden="true">
          <Maximize2 size={15} /> Expand
        </span>
      </button>

      <div className="project-gallery-top" aria-hidden="true">
        <span>{tags[0]}</span>
        <span>{tags[1]}</span>
      </div>

      <div className="project-gallery-controls">
        <span aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Show previous screenshot">
            <ChevronLeft size={17} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Show next screenshot">
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {isExpanded && <ImageCarouselDialog slides={slides} activeIndex={activeIndex} onChange={setActiveIndex} onClose={() => setIsExpanded(false)} />}
    </div>
  );
}
