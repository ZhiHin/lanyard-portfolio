"use client";

import { ProjectGallery, type ProjectSlide } from "./ProjectGallery";

const slides: ProjectSlide[] = [
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
  return <ProjectGallery slides={slides} label="Restaurant POS System screenshots" tags={["Restaurant operations", "EvoPos"]} className="tint-pos" />;
}
