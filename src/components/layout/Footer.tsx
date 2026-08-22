"use client";

import { ArrowUp, Github, Linkedin, RotateCcw } from "lucide-react";
import { ENTERED_KEY } from "@/components/experience/session";
import { navigation, personal } from "@/data/personal";

export function Footer() {
  const replayIntro = () => {
    try {
      window.sessionStorage.removeItem(ENTERED_KEY);
    } catch {
      // Storage may be unavailable; reloading still plays the gate.
    }
    // Drop any section hash so the deep-link skip does not fire on reload.
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.location.reload();
  };

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-inner">
          <div>
            <p className="footer-name">{personal.name}</p>
            <p className="footer-note">Engineered with care, curiosity and intent. Thanks for getting to know me.</p>
          </div>
          <div className="footer-links">
            <a href={personal.socials[0].href} aria-label="GitHub" target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a href={personal.socials[1].href} aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
            <button type="button" onClick={replayIntro}>
              <RotateCcw size={16} /> Replay intro
            </button>
            <a href="#home" className="back-to-top">
              Back to top <ArrowUp size={16} />
            </a>
          </div>
        </div>
        <div className="footer-meta">
          <nav aria-label="Footer navigation" className="footer-nav">
            {navigation.map(({ id, label, href }) => (
              <a href={href} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} Foong Zhi Hin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
