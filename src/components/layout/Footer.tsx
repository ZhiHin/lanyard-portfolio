import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { personal } from "@/data/personal";

export function Footer() {
  return <footer className="footer"><div className="footer-main"><p className="footer-name">{personal.name}</p><p className="footer-note">Engineered with care, curiosity and intent.</p><div className="footer-socials"><a href={personal.socials[0].href} aria-label="GitHub"><Github size={17} /></a><a href={personal.socials[1].href} aria-label="LinkedIn"><Linkedin size={17} /></a><a href="#home" className="back-to-top">Back to top <ArrowUpRight size={16} /></a></div></div><p className="copyright">© {new Date().getFullYear()} Foong Zhi Hin. All rights reserved.</p></footer>;
}
