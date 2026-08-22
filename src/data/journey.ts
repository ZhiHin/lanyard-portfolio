// ---------------------------------------------------------------------------
// Journey timeline
//
// PLACEHOLDERS. These milestones are seeded from facts already in the
// repository (project years, location, role). Replace each entry marked
// `TODO` with the real date, organisation and story. Component code never
// needs to change: edit this file only.
// ---------------------------------------------------------------------------

export type Milestone = {
  year: string;
  title: string;
  org: string;
  body: string;
  /** Optional short tag shown beside the year, e.g. "Education" or "Now". */
  tag?: string;
};

export const journey: Milestone[] = [
  {
    year: "2022", // TODO: confirm real date
    tag: "The beginning",
    title: "Wrote my first real program",
    org: "Self-taught", // TODO: confirm — school, bootcamp or self-taught?
    body: "The moment a few lines of code turned into something that worked on screen. I was hooked on building things people could actually use.",
  },
  {
    year: "2023", // TODO: confirm real date
    tag: "Education",
    title: "Studied software engineering",
    org: "Kuala Lumpur", // TODO: replace with institution name
    body: "Built the foundations: data structures, databases, web architecture, and the habit of thinking about the person on the other side of the screen.",
  },
  {
    year: "2025",
    tag: "Enterprise",
    title: "Shipped the Business Admin Dashboard",
    org: "Angular 22 · Supabase",
    body: "A role-aware administration platform for users, products, sales and reporting. My first deep dive into clean enterprise architecture.",
  },
  {
    year: "2026",
    tag: "Product",
    title: "Built platforms for travel and dining",
    org: "Next.js · PostgreSQL",
    body: "A secure hotel booking ecosystem and a modular Restaurant Operating System with a Smart Bill Engine for group dining.",
  },
  {
    year: "Now",
    tag: "Today",
    title: "Building useful things",
    org: "Kuala Lumpur, Malaysia",
    body: "Open to software engineering opportunities and meaningful collaborations. Still chasing that first-program feeling on every project.",
  },
];
