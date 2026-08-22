export type SocialLink = { label: string; href: string };

export const personal = {
  name: "Foong Zhi Hin",
  firstName: "Zhi Hin",
  initials: "FZH",
  role: "Software Engineer",
  headline: "Building thoughtful digital experiences through design and engineering.",
  summary: "I create modern, reliable and user-focused digital products by combining clean design with practical software engineering.",
  email: "zhihinfoong4@gmail.com",
  location: "Kuala Lumpur, Malaysia",
  availability: "Available for select opportunities",
  socials: [
    { label: "GitHub", href: "https://github.com/ZhiHin" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/zhi-hin-foong/" },
  ] satisfies SocialLink[],
};

/** The seven acts. `id` is the section anchor; `label` is shown in the header, rail and footer. */
export const navigation = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "journey", label: "Journey", href: "#journey" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "work", label: "Work", href: "#work" },
  { id: "beyond", label: "Beyond", href: "#beyond" },
  { id: "contact", label: "Contact", href: "#contact" },
];
