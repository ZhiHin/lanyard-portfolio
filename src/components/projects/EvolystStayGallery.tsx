"use client";

import { ProjectGallery, type ProjectSlide } from "./ProjectGallery";

const slides: ProjectSlide[] = [
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
  return <ProjectGallery slides={slides} label="Evolyst Stay project screenshots" tags={["Travel technology", "Evolyst Stay"]} className="tint-hotel" />;
}
