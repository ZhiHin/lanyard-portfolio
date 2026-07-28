"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, personal } from "@/data/personal";

export function Header() {
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
    <a className="resume-link" href="/resume.pdf" download>Résumé <span aria-hidden>↗</span></a>
    <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(({ label, href }) => <a href={href} onClick={() => setOpen(false)} key={href}>{label}</a>)}<a href="/resume.pdf" download>Download résumé</a></nav>}
  </header>;
}
