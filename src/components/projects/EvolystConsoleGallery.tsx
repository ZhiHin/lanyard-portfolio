"use client";

import { ProjectGallery, type ProjectSlide } from "./ProjectGallery";

const slides: ProjectSlide[] = [
  { src: "/projects/evolyst-console-1.png", alt: "Evolyst Console admin overview" },
  { src: "/projects/evolyst-console-2.png", alt: "Evolyst Console analytics dashboard" },
  { src: "/projects/evolyst-console-3.png", alt: "Evolyst Console access management" },
];

export function EvolystConsoleGallery() {
  return <ProjectGallery slides={slides} label="Evolyst Console admin panel screenshots" tags={["Admin operations", "Hotel system"]} className="tint-console" />;
}
