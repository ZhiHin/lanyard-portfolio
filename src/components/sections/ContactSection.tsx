"use client";

import { ArrowUpRight, Copy, Check, Github, Linkedin, FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { personal } from "@/data/personal";

/** Act 7 — Let's Talk. */
export function ContactSection() {
  const resumePath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume.pdf`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable; the mailto link remains the primary path.
    }
  };

  return (
    <section className="act contact" id="contact">
      <span className="blob blob-indigo contact-blob-a" aria-hidden="true" />
      <span className="blob blob-coral contact-blob-b" aria-hidden="true" />

      <div className="shell">
        <div className="contact-card surface">
          <div className="contact-copy">
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-number">07</span> Let&apos;s talk
              </p>
            </Reveal>
            <SplitText as="h2" text="Have an idea worth building?" highlight={[{ index: 3, className: "accent" }]} />
            <Reveal delay={0.15}>
              <p className="lead">I am open to software engineering opportunities, collaborations and meaningful digital projects. Now you know me — say hello.</p>
            </Reveal>
          </div>

          <Reveal className="contact-actions" delay={0.2}>
            <div className="contact-email">
              <Magnetic className="btn btn-accent contact-email-link" href={`mailto:${personal.email}`}>
                {personal.email} <ArrowUpRight size={18} />
              </Magnetic>
              <button type="button" className="contact-copy-btn" onClick={copyEmail} aria-live="polite" aria-label={copied ? "Email copied" : "Copy email address"}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="contact-links">
              <a className="btn btn-ghost" href={personal.socials[0].href} target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub
              </a>
              <a className="btn btn-ghost" href={personal.socials[1].href} target="_blank" rel="noreferrer">
                <Linkedin size={17} /> LinkedIn
              </a>
              <a className="btn btn-ghost" href={resumePath} download>
                <FileDown size={17} /> Résumé
              </a>
            </div>

            <p className="contact-meta">
              <span className="hero-hint-dot" aria-hidden="true" /> {personal.availability} · {personal.location}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
