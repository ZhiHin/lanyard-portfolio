"use client";

import { useState } from "react";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { marqueeItems, skillDetail } from "@/data/skills";

/** Act 4 — The Arsenal. A ticker of tools, then a grid that explains how each is actually used. */
export function ArsenalSection() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const active = skillDetail.flatMap((group) => group.skills).find((skill) => skill.name === activeKey) ?? null;

  return (
    <section className="act arsenal" id="skills">
      <div className="shell">
        <div className="act-head">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-number">04</span> The arsenal
              </p>
            </Reveal>
            <SplitText as="h2" text="Tools I reach for." highlight={[{ index: 3, className: "accent" }]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lead">Hover or focus any tool to see how it actually shows up in my work.</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="arsenal-marquees" y={0}>
        <Marquee items={marqueeItems.map((item) => <span className="chip chip-marquee" key={item}>{item}</span>)} speed={42} />
        <Marquee items={[...marqueeItems].reverse().map((item) => <span className="chip chip-marquee is-alt" key={item}>{item}</span>)} reverse speed={48} />
      </Reveal>

      <div className="shell">
        <div className="arsenal-grid">
          {skillDetail.map((group, groupIndex) => (
            <Reveal as="div" key={group.group} className={`arsenal-group surface accent-${group.accent}`} delay={groupIndex * 0.1}>
              <p className="arsenal-group-title">{group.group}</p>
              <ul className="arsenal-list">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <button
                      type="button"
                      className={`arsenal-skill ${activeKey === skill.name ? "is-active" : ""}`}
                      onMouseEnter={() => setActiveKey(skill.name)}
                      onMouseLeave={() => setActiveKey((current) => (current === skill.name ? null : current))}
                      onFocus={() => setActiveKey(skill.name)}
                      onBlur={() => setActiveKey((current) => (current === skill.name ? null : current))}
                      aria-describedby="arsenal-note"
                    >
                      <span className="arsenal-skill-name">{skill.name}</span>
                      <span className="arsenal-level" aria-label={`Proficiency ${skill.level} of 5`}>
                        {Array.from({ length: 5 }, (_, index) => (
                          <i key={index} className={index < skill.level ? "is-on" : ""} />
                        ))}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="arsenal-note surface" delay={0.3}>
            <p className="eyebrow">In practice</p>
            <p id="arsenal-note" className="arsenal-note-body" aria-live="polite">
              {active ? (
                <>
                  <strong>{active.name}</strong> — {active.note}
                </>
              ) : (
                "Pick a tool on the left. Every one of these earned its place on a real project."
              )}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
