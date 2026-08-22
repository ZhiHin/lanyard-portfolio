export const skillGroups = [
  { title: "Interface", items: ["TypeScript", "JavaScript", "React", "Next.js", "Angular"] },
  { title: "Systems", items: ["Java", "Spring Boot", "SQL", "Supabase", "Git"] },
];

export const statistics = [
  { value: "03+", label: "Years crafting software" },
  { value: "20+", label: "Projects brought to life" },
  { value: "10", label: "Core technologies" },
  { value: "Now", label: "Building useful things" },
];

export type Skill = {
  name: string;
  /** One line on how the skill is actually used — revealed on hover and focus. */
  note: string;
  /** 1-5, drives the proficiency bar. */
  level: number;
};

export const skillDetail: { group: string; accent: "indigo" | "coral" | "mint"; skills: Skill[] }[] = [
  {
    group: "Frontend",
    accent: "indigo",
    skills: [
      { name: "TypeScript", note: "Strict mode everywhere. Types are documentation that cannot go stale.", level: 5 },
      { name: "React", note: "Composition over configuration; hooks for behaviour, components for shape.", level: 5 },
      { name: "Next.js", note: "App Router, static export, route handlers. Three of my projects ship on it.", level: 5 },
      { name: "Angular", note: "Feature modules, signals and Material for enterprise-scale admin tooling.", level: 4 },
      { name: "Tailwind", note: "Design tokens first, utilities second — never a pile of arbitrary values.", level: 4 },
      { name: "Motion", note: "framer-motion and scroll-driven CSS for interfaces that feel alive, not busy.", level: 4 },
    ],
  },
  {
    group: "Backend",
    accent: "coral",
    skills: [
      { name: "Java", note: "Clean object models and service layers; the language I learned discipline on.", level: 4 },
      { name: "Spring Boot", note: "REST APIs, validation and layered architecture for dependable services.", level: 4 },
      { name: "PostgreSQL", note: "Schema design, row-level security and the queries behind reporting dashboards.", level: 4 },
      { name: "Supabase", note: "Auth, RLS policies and realtime for shipping full-stack features fast.", level: 4 },
      { name: "REST design", note: "Predictable resources, honest status codes and error shapes a client can trust.", level: 4 },
    ],
  },
  {
    group: "Craft",
    accent: "mint",
    skills: [
      { name: "Git", note: "Small commits with messages that explain why, not just what.", level: 5 },
      { name: "UI/UX", note: "Hierarchy, spacing and feedback. I sketch the flow before I write the first line.", level: 4 },
      { name: "Accessibility", note: "Keyboard paths, reduced motion and real focus states are part of done.", level: 4 },
      { name: "Three.js", note: "react-three-fiber and rapier physics — the lanyard you just dragged.", level: 3 },
      { name: "Testing", note: "Test the behaviour people rely on; keep the suite fast enough to run every time.", level: 3 },
    ],
  },
];

export const marqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Supabase",
  "Tailwind",
  "framer-motion",
  "Three.js",
  "Git",
  "REST",
  "shadcn/ui",
  "ApexCharts",
  "Figma",
];
