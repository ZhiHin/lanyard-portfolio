"use client";

import { ArrowUpRight, Hammer, MapPin, Sparkles } from "lucide-react";
import { LiveClock } from "@/components/motion/LiveClock";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { beyond } from "@/data/beyond";
import { personal } from "@/data/personal";
import { statistics } from "@/data/skills";

/** Act 6 — Beyond the Code. A bento of oversized, tilt-reactive tiles where the personality lives. */
export function BeyondSection() {
  return (
    <section className="act beyond" id="beyond">
      <span className="blob blob-mint beyond-blob" aria-hidden="true" />
      <div className="shell">
        <div className="act-head">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-number">06</span> Beyond the code
              </p>
            </Reveal>
            <SplitText as="h2" text="A few more things." highlight={[{ index: 2, className: "accent-warm" }]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lead">Because you asked to know me, not just my stack. Move your cursor around — the tiles notice.</p>
          </Reveal>
        </div>

        <div className="bento">
          <Reveal className="bento-cell cell-clock" delay={0}>
            <TiltCard className="bento-tile surface">
              <p className="bento-label">
                <MapPin size={15} aria-hidden="true" /> {beyond.location}
              </p>
              <LiveClock timezone={beyond.timezone} />
              <p className="bento-foot">{beyond.coordinates}</p>
            </TiltCard>
          </Reveal>

          <Reveal className="bento-cell cell-status" delay={0.08}>
            <TiltCard className="bento-tile surface tile-status">
              <span className="status-pulse" aria-hidden="true" />
              <p className="bento-label">Status</p>
              <p className="status-headline">{personal.availability}</p>
              <a className="text-link" href="#contact">
                Say hello <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </TiltCard>
          </Reveal>

          <Reveal className="bento-cell cell-building" delay={0.16}>
            <TiltCard className="bento-tile surface tile-building">
              <p className="bento-label">
                <Hammer size={15} aria-hidden="true" /> Currently building
              </p>
              <h3>{beyond.currentlyBuilding.title}</h3>
              <p className="bento-body">{beyond.currentlyBuilding.body}</p>
              <ul className="bento-chips">
                {beyond.currentlyBuilding.stack.map((item) => (
                  <li className="chip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>

          <Reveal className="bento-cell cell-stats" delay={0.24}>
            <TiltCard className="bento-tile surface tile-stats">
              <p className="bento-label">By the numbers</p>
              <ul>
                {statistics.map((stat) => (
                  <li key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>

          <Reveal className="bento-cell cell-quote" delay={0.3}>
            <TiltCard className="bento-tile surface tile-quote">
              <Sparkles size={22} aria-hidden="true" />
              <p>{beyond.philosophy}</p>
            </TiltCard>
          </Reveal>

          <Reveal className="bento-cell cell-facts" delay={0.36}>
            <TiltCard className="bento-tile surface tile-facts">
              <p className="bento-label">Fun facts</p>
              <ul>
                {beyond.facts.map((fact) => (
                  <li key={fact.label}>
                    <span className="fact-emoji" aria-hidden="true">
                      {fact.emoji}
                    </span>
                    <span className="fact-label">{fact.label}</span>
                    <span className="fact-value">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
