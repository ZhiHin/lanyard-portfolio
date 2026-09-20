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
    year: "2021", 
    tag: "The beginning - Education",
    title: "Diploma in Computer Science",
    org: "Tunku Abdul Rahman University of Management and Technology (TAR UMT)",
    body: "My first step into IT and programming. I started learning the fundamentals of coding, exploring different technologies, and discovering what I could build with them.",
  },
  {
    year: "2023",
    tag: "Education",
    title: "Degree in Software Engineering",
    org: "Tunku Abdul Rahman University of Management and Technology (TAR UMT)",
    body: "I began exploring software engineering beyond coding — learning about architecture, system design, databases, development methodologies, and the principles behind building reliable and maintainable software.",
  },
  {
    year: "2025",
    tag: "Internship",
    title: "Software Engineer Intern",
    org: "Theta Service Partner Sdn Bhd",
    body: "Working in a real software company gave me a new perspective on what it means to be a software engineer. I started experiencing the differences between studying and working, from collaborating with a team to dealing with real requirements, systems, and challenges. This experience helped me grow both technically and professionally.",
  },
  {
    year: "2026",
    tag: "Full-time",
    title: "Software Engineer",
    org: "Theta Service Partner Sdn Bhd",
    body: "From learning the fundamentals to working with real systems, I’m now growing into the engineer I want to become. As a full-time Software Engineer, I develop features, solve bugs, review code, and guide interns. Every problem I face pushes me to think more logically, solve problems more effectively, and become a better engineer.",
  },
  {
    year: "Now",
    tag: "Founder",
    title: "Where Ideas Take Shape",
    org: "Evolyst Studio",
    body: "A space where ideas become projects. Evolyst Studio started as a small group exploring development, design, and new ideas together. From landing pages and websites to custom solutions, each project is an opportunity to build something useful, experiment with new approaches, and grow through the process.",
  },
];
