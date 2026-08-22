"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navigation } from "@/data/personal";
import { CurtainTransition } from "./CurtainTransition";
import { GateScreen } from "./GateScreen";
import { ENTERED_KEY } from "./session";
import { Portfolio } from "./Portfolio";

export type Act = "gate" | "entering" | "portfolio";

/** Milliseconds after the curtain starts before the card is released to fall. */
const CARD_RELEASE_DELAY = 650;

/**
 * The act state machine.
 *
 * Always renders the gate on the server so hydration is deterministic, then
 * reconciles to the portfolio in an effect if this tab has already entered.
 */
export function ExperienceRoot() {
  const [act, setAct] = useState<Act>("gate");
  const [cardReleased, setCardReleased] = useState(false);
  const [restored, setRestored] = useState(false);
  const afterEnter = useRef<"top" | "work">("top");
  const releaseTimer = useRef<number | undefined>(undefined);

  // Returning visitor in the same tab, or a deep link straight to a section:
  // skip the story and land on the portfolio.
  useEffect(() => {
    let entered = false;
    try {
      entered = window.sessionStorage.getItem(ENTERED_KEY) === "1";
    } catch {
      entered = false;
    }
    const hash = window.location.hash.replace("#", "");
    const deepLinked = hash !== "" && navigation.some((item) => item.id === hash);
    if (entered || deepLinked) {
      setAct("portfolio");
      setCardReleased(true);
    }
    setRestored(true);
  }, []);

  // Lock page scroll while the gate or curtain owns the screen.
  useEffect(() => {
    const locked = act !== "portfolio";
    document.body.classList.toggle("is-locked", locked);
    return () => document.body.classList.remove("is-locked");
  }, [act]);

  useEffect(() => () => {
    if (releaseTimer.current !== undefined) window.clearTimeout(releaseTimer.current);
  }, []);

  const begin = useCallback((destination: "top" | "work") => {
    afterEnter.current = destination;
    try {
      window.sessionStorage.setItem(ENTERED_KEY, "1");
    } catch {
      // Private mode or storage disabled: the story simply plays again next time.
    }
    setAct("entering");
    releaseTimer.current = window.setTimeout(() => setCardReleased(true), CARD_RELEASE_DELAY);
  }, []);

  const onEnter = useCallback(() => begin("top"), [begin]);
  const onSkip = useCallback(() => begin("work"), [begin]);

  const onCurtainComplete = useCallback(() => {
    setAct("portfolio");
    // Hand focus and scroll position to the portfolio on the next frame, once it is unlocked.
    window.requestAnimationFrame(() => {
      if (afterEnter.current === "work") {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: 0 });
      const heading = document.getElementById("hero-heading");
      heading?.focus({ preventScroll: true });
    });
  }, []);

  return (
    <>
      {act === "gate" && <GateScreen onEnter={onEnter} onSkip={onSkip} leaving={false} />}
      <CurtainTransition active={act === "entering"} onComplete={onCurtainComplete} />
      {act !== "gate" && restored && <Portfolio entered={act === "portfolio"} cardReleased={cardReleased} />}
    </>
  );
}
