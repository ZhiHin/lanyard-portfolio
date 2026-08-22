"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { StickyStack } from "@/components/motion/StickyStack";
import { BusinessAdminGallery } from "@/components/projects/BusinessAdminGallery";
import { EvolystConsoleGallery } from "@/components/projects/EvolystConsoleGallery";
import { EvolystStayGallery } from "@/components/projects/EvolystStayGallery";
import { ProjectCaseStudyDialog } from "@/components/projects/ProjectCaseStudyDialog";
import { RestaurantPosGallery } from "@/components/projects/RestaurantPosGallery";
import { projects, type Project } from "@/data/projects";

/** Which gallery (or generic art) each project number shows. */
function galleryFor(number: string, accent: string): ReactNode {
  switch (number) {
    case "01":
      return <EvolystStayGallery />;
    case "01A":
      return <EvolystConsoleGallery />;
    case "02":
      return <BusinessAdminGallery />;
    case "03":
      return <RestaurantPosGallery />;
    default:
      return <GenericArt accent={accent} />;
  }
}

/** The art block for projects without screenshots (this portfolio itself). */
function GenericArt({ accent }: { accent: string }) {
  return (
    <div className={`project-gallery project-art-generic tint-${accent}`} aria-hidden="true">
      <span className="project-orbit" />
      <span className="project-orbit is-second" />
      <div className="mock-window">
        <i />
        <i />
        <i />
        <b />
      </div>
      <span className="project-art-word">You are here.</span>
    </div>
  );
}

type Card = {
  key: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  accent: string;
  githubUrl?: string;
  /** Only full projects carry a case study; companions do not. */
  project?: Project;
};

/** Flatten projects and their companions into one ordered stack. */
const cards: Card[] = projects.flatMap((project) => {
  const base: Card = { key: project.number, ...project, project };
  if (!project.companion) return [base];
  const companion: Card = { key: project.companion.number, ...project.companion, accent: project.accent, githubUrl: project.githubUrl };
  return [base, companion];
});

/** Act 5 — The Work. Cards pin and stack as you scroll; galleries and case studies are preserved. */
export function WorkSection() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  return (
    <section className="act work" id="work">
      <div className="shell">
        <div className="act-head">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-number">05</span> The work
              </p>
            </Reveal>
            <SplitText as="h2" text="Built with intention." highlight={[{ index: 2, className: "accent" }]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lead">Selected explorations across product, platform and experience. Keep scrolling — they stack.</p>
          </Reveal>
        </div>

        <StickyStack className="work-stack" top={104} step={16}>
          {cards.map((card, index) => (
            <article className={`work-card surface ${index % 2 ? "is-reverse" : ""}`} key={card.key} style={{ zIndex: index + 1 }}>
              <div className="work-card-media">{galleryFor(card.number, card.accent)}</div>
              <div className="work-card-copy">
                <p className="work-number">
                  <span className="eyebrow-number">{card.number}</span>
                  <span>{card.category}</span>
                  <span className="work-year">{card.year}</span>
                </p>
                <h3>{card.title}</h3>
                <p className="work-description">{card.description}</p>
                <ul className="work-stack-list">
                  {card.stack.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="work-actions">
                  {card.project && (
                    <button className="btn btn-primary" type="button" onClick={() => setActiveCaseStudy(card.project ?? null)}>
                      View case study <ArrowUpRight size={16} />
                    </button>
                  )}
                  <a
                    className="btn btn-ghost"
                    href={card.githubUrl || "https://github.com/ZhiHin"}
                    aria-label={`Source code for ${card.title}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={17} /> Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </StickyStack>
      </div>

      {activeCaseStudy && <ProjectCaseStudyDialog project={activeCaseStudy} onClose={() => setActiveCaseStudy(null)} />}
    </section>
  );
}
