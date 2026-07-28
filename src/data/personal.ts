export type SocialLink = { label: string; href: string };

export const personal = {
  name: "Foong Zhi Hin",
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

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
