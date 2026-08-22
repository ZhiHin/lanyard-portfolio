"use client";

import { Quote } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { skillGroups, statistics } from "@/data/skills";

/** Act 2 — Who I Am. */
export function AboutSection() {
  return (
    <section className="act about" id="about">
      <Parallax className="about-parallax" speed={-0.35} range={220}>
        <span className="about-watermark" aria-hidden="true">
          About
        </span>
      </Parallax>

      <div className="shell">
        <div className="act-head">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-number">02</span> Who I am
              </p>
            </Reveal>
            <SplitText as="h2" text="Function meets feeling." highlight={[{ index: 2, className: "accent" }]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lead">I am a software engineer who cares as much about the journey through a product as the logic beneath it.</p>
          </Reveal>
        </div>

        <div className="about-grid">
          <Reveal className="about-story surface" delay={0.05}>
            <p className="about-story-lead">
              I work at the intersection of dependable systems and clear interfaces — turning complex requirements into digital products that feel direct, calm and human.
            </p>
            <p>
              Whether it is a booking platform that must never double-book a room or a restaurant system that splits a bill five ways without an argument, I design for the person on the other side of the screen first, then make the engineering earn it.
            </p>
          </Reveal>

          <Reveal className="about-quote surface" delay={0.15}>
            <Quote size={26} aria-hidden="true" />
            <p>Good software respects the person on the other side of the screen.</p>
            <span>My one rule</span>
          </Reveal>

          <ul className="about-stats">
            {statistics.map((stat, index) => (
              <Reveal as="li" key={stat.label} className="about-stat surface" delay={0.1 + index * 0.08}>
                <strong>
                  <AnimatedCounter value={stat.value} />
                </strong>
                <span>{stat.label}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal className="about-toolkit surface" delay={0.25}>
            <p className="eyebrow">Daily toolkit</p>
            <div className="about-toolkit-groups">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="about-toolkit-title">{group.title}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li className="chip" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
