"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, personal } from "@/data/personal";

const ACTIVE_OFFSET = 160;

export function Header() {
  const resumePath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume.pdf`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(navigation[0].id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const current = [...navigation].reverse().find(({ id }) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        return top !== undefined && top <= ACTIVE_OFFSET;
      });
      if (current) setActive(current.id);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Close the mobile sheet on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="monogram" href="#home" aria-label="Back to top">
        {personal.initials}
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map(({ id, label, href }) => (
          <a className={active === id ? "is-active" : ""} href={href} key={id} aria-current={active === id ? "location" : undefined}>
            {active === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="resume-link" href={resumePath} download>
          Résumé <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map(({ id, label, href }) => (
            <a href={href} onClick={() => setOpen(false)} key={id}>
              {label}
            </a>
          ))}
          <a href={resumePath} download onClick={() => setOpen(false)}>
            Download résumé
          </a>
        </nav>
      )}
    </header>
  );
}
