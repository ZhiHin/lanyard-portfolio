"use client";

import { useEffect, useState } from "react";

export type RailSection = { id: string; label: string };

/**
 * Fixed dot rail that marks the current act. Dots are real anchor links so
 * the rail is keyboard navigable; a single IntersectionObserver tracks the
 * active section.
 */
export function SectionRail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="section-rail" aria-label="Section navigation">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={active === section.id ? "is-active" : ""}
          aria-label={section.label}
          aria-current={active === section.id ? "location" : undefined}
        >
          <span aria-hidden="true">{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
