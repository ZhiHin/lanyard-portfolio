# Shared layouts

## layout
- Source: src/app/layout.tsx
- Full source:
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foong Zhi Hin — Software Engineer",
  description: "A software engineer building thoughtful, reliable digital experiences.",
  keywords: ["software engineer", "portfolio", "Next.js", "TypeScript", "Foong Zhi Hin"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="scroll-smooth"><body>{children}</body></html>;
}


## Header
- Source: src/components/layout/Header.tsx
- Full source:
"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, personal } from "@/data/personal";

export function Header() {
  const resumePath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume.pdf`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const current = [...navigation].reverse().find(({ href }) => document.querySelector(href)?.getBoundingClientRect().top! <= 150);
      if (current) setActive(current.href);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <a className="monogram" href="#home" aria-label="Back to top">{personal.initials}</a>
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navigation.map(({ label, href }) => <a className={active === href ? "active" : ""} href={href} key={href}>{label}</a>)}
    </nav>
    <a className="resume-link" href={resumePath} download>Résumé <span aria-hidden>↗</span></a>
    <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(({ label, href }) => <a href={href} onClick={() => setOpen(false)} key={href}>{label}</a>)}<a href={resumePath} download>Download résumé</a></nav>}
  </header>;
}


## Footer
- Source: src/components/layout/Footer.tsx
- Full source:
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { personal } from "@/data/personal";

export function Footer() {
  return <footer className="footer"><div className="footer-main"><p className="footer-name">{personal.name}</p><p className="footer-note">Engineered with care, curiosity and intent.</p><div className="footer-socials"><a href={personal.socials[0].href} aria-label="GitHub"><Github size={17} /></a><a href={personal.socials[1].href} aria-label="LinkedIn"><Linkedin size={17} /></a><a href="#home" className="back-to-top">Back to top <ArrowUpRight size={16} /></a></div></div><p className="copyright">© {new Date().getFullYear()} Foong Zhi Hin. All rights reserved.</p></footer>;
}


