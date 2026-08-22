"use client";

import { ProjectGallery, type ProjectSlide } from "./ProjectGallery";

const slides: ProjectSlide[] = [
  { src: "/projects/novacore-admin-1.png", alt: "NovaCore admin sign-in screen" },
  { src: "/projects/novacore-admin-2.png", alt: "NovaCore business dashboard overview" },
  { src: "/projects/novacore-admin-3.png", alt: "NovaCore sales dashboard" },
  { src: "/projects/novacore-admin-4.png", alt: "NovaCore workspace settings" },
  { src: "/projects/novacore-admin-5.png", alt: "NovaCore business reports" },
  { src: "/projects/novacore-admin-6.png", alt: "NovaCore page access controls" },
];

export function BusinessAdminGallery() {
  return <ProjectGallery slides={slides} label="Business Admin Dashboard screenshots" tags={["Enterprise systems", "NovaCore"]} className="tint-dashboard" />;
}
