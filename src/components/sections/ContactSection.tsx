import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { personal } from "@/data/personal";

export function ContactSection() {
  const resumePath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume.pdf`;
  return <section className="contact section-shell" id="contact"><p className="eyebrow">03 / Contact</p><div className="contact-grid"><h2>Have an idea<br /><em>worth building?</em></h2><div className="contact-copy"><p>I am open to software engineering opportunities, collaborations and meaningful digital projects.</p><a className="email-link" href={`mailto:${personal.email}`}>{personal.email} <ArrowUpRight size={21} /></a><div className="contact-links"><a href={personal.socials[0].href}><Github size={17} /> GitHub</a><a href={personal.socials[1].href}><Linkedin size={17} /> LinkedIn</a><a href={resumePath} download>Download résumé <ArrowUpRight size={15} /></a></div></div></div></section>;
}
