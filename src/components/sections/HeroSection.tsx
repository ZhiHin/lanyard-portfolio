import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PhysicsLanyard } from "@/components/lanyard/PhysicsLanyard";
import { personal } from "@/data/personal";

export function HeroSection() {
  return <section className="hero section-shell" id="home"><div className="hero-copy"><p className="eyebrow">Independent engineer · Kuala Lumpur</p><h1>{personal.headline}</h1><p className="hero-summary">{personal.summary}</p><div className="hero-actions"><a className="button button-dark" href="#projects">View my work <ArrowUpRight size={17} /></a><a className="text-link" href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div></div><PhysicsLanyard /><a href="#about" className="scroll-cue"><span>Scroll to explore</span><ArrowDown size={16} /></a><p className="hero-index">01 — 04</p></section>;
}
