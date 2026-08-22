"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollPath } from "@/components/motion/ScrollPath";
import { SplitText } from "@/components/motion/SplitText";
import { journey } from "@/data/journey";

/** Act 3 — The Journey. A line draws itself as you scroll; milestones snap in on alternating sides. */
export function JourneySection() {
  const trackRef = useRef<HTMLOListElement>(null);

  return (
    <section className="act journey" id="journey">
      <div className="shell">
        <div className="act-head">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-number">03</span> The journey
              </p>
            </Reveal>
            <SplitText as="h2" text="How I got here." highlight={[{ index: 3, className: "accent-warm" }]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lead">A few of the moments that shaped how I build. Scroll and the line catches up with you.</p>
          </Reveal>
        </div>

        <ol className="journey-track" ref={trackRef}>
          <ScrollPath targetRef={trackRef} className="journey-path" />
          {journey.map((milestone, index) => (
            <Reveal
              as="li"
              key={`${milestone.year}-${milestone.title}`}
              className={`journey-item ${index % 2 ? "is-right" : "is-left"} ${milestone.year === "Now" ? "is-now" : ""}`}
              delay={0.05}
              y={36}
              amount={0.4}
            >
              <span className="journey-node" aria-hidden="true">
                <i />
              </span>
              <article className="journey-card surface">
                <header>
                  <span className="journey-year">{milestone.year}</span>
                  {milestone.tag && <span className="journey-tag">{milestone.tag}</span>}
                </header>
                <h3>{milestone.title}</h3>
                <p className="journey-org">{milestone.org}</p>
                <p className="journey-body">{milestone.body}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
