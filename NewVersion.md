# New Version — "The Card" Redesign

**Date:** 23 August 2026
**Branch:** `redesign/the-card` (12 commits on top of `main`)
**Design spec:** `docs/superpowers/specs/2026-08-22-portfolio-redesign-design.md`
**Implementation plan:** `docs/superpowers/plans/2026-08-22-portfolio-redesign.md`

---

## 1. What changed, in one paragraph

The portfolio is no longer a flat scroll. It is a seven-act story that opens on a
welcome screen asking **"Do you want to know me?"**, withholds the 3D ID card until
the visitor clicks, then drops the card onto its lanyard as a curtain clears. Every
section after that animates on scroll using one shared motion system. The palette
moved from warm ivory/gold to a light "Soft Studio" look — porcelain ground, ink
type, electric indigo and coral accents. The physics lanyard is preserved exactly;
only its lighting and its *timing* changed.

---

## 2. The seven acts

| # | Section id | Name | What the visitor sees |
|---|---|---|---|
| 0 | — | **The Threshold** (gate) | Full-screen porcelain welcome. A strap descends from the top edge to an *empty* clip — the card is missing on purpose. Word-by-word headline, magnetic **Get to know me** button, and **Just browsing → show me the work** which skips straight to Work. 3D assets preload silently while the visitor reads. |
| 1 | `#home` | **The Reveal** (hero) | Five dark panels wipe upward. Underneath, the real 3D card falls onto its lanyard — physics are released at the exact moment the curtain starts clearing. "Hi, I'm **Zhi** Hin." reveals beside it, with role, location, two CTAs, and a "Drag the card. It's real physics." hint. |
| 2 | `#about` | **Who I Am** | Story card, dark quote tile, four animated stat counters (03+ / 20+ / 10 / Now), toolkit chips, and a large outlined "About" watermark that drifts with parallax. |
| 3 | `#journey` | **The Journey** | Vertical timeline. An indigo line draws itself as you scroll; milestones snap in alternating left/right (single rail on phones). The "Now" node pulses mint. |
| 4 | `#skills` | **The Arsenal** | Two infinite tech marquees running opposite directions (pause on hover), then Frontend / Backend / Craft groups with 5-segment proficiency bars. Hovering **or keyboard-focusing** a tool reveals a one-line note on how it is actually used. |
| 5 | `#work` | **The Work** | Five project cards that **pin and stack** as you scroll — the next card slides over the last. Cards: 01 Hotel Booking Platform, 01A Hotel System Admin Panel, 02 Business Admin Dashboard, 03 Restaurant POS System, 04 Personal Portfolio. Screenshot galleries, the expand-to-lightbox carousel and the case-study dialogs all still work. |
| 6 | `#beyond` | **Beyond the Code** | Tilt-reactive bento grid: live Kuala Lumpur clock with a mood line ("Deep work hours", "Late night commit"…), pulsing availability badge, "Currently building" tile, stat wall, coral quote tile, fun facts. |
| 7 | `#contact` | **Let's Talk** | Big headline, indigo email button with a **Copy** action, GitHub / LinkedIn / Résumé buttons, availability line. |

Plus, across the page: a floating header with a sliding active pill, a dot rail on the
right edge showing the current act, a cursor spotlight (fine pointers only), a
gradient reading-progress bar, and a footer with **Replay intro** and **Back to top**.

---

## 3. Entry behaviour (how the gate decides)

| Situation | Result |
|---|---|
| First visit in a tab | Gate plays |
| Clicked through, then reload in the same tab | Gate skipped (`sessionStorage` key `fzh:entered`) |
| New tab / new browser session | Gate plays again |
| Any deep link to a section (`/#work`, `/#contact` …) | Gate skipped — shared links land directly |
| Footer → **Replay intro** | Clears the key, drops the hash, reloads → gate plays |
| `prefers-reduced-motion: reduce` | Gate still works; curtain becomes a short crossfade; every animation collapses to its final state |

---

## 4. The 3D lanyard — what was and wasn't touched

**Preserved (not rewritten):** rapier physics, rope + spherical joints, drag handling,
WebGL context-loss recovery, mobile DPR clamp, the `StableLanyard` fallback behind
the error boundary.

**Changed:**
- `ThreeLanyard` gained a `released` prop. Physics stay `paused` until it is true, so the card drops on cue rather than on mount.
- Lighting and card material tuned for a light background (lightformer 10 → 7, metalness 0.8 → 0.6) so the dark card reads with contrast instead of glare.
- Asset URLs now come from `src/components/lanyard/preload.ts`, shared with the gate's preloader. The three.js chunk itself is only imported *after* the gate mounts, so the welcome screen never carries WebGL weight.
- `StableLanyard` (the no-WebGL fallback) restyled to the new palette and given the same drop-in entrance.

---

## 5. Architecture

```
src/
  app/
    layout.tsx            next/font: Sora (display) + Manrope (UI), self-hosted at build time
    page.tsx              renders <ExperienceRoot /> only
    globals.css           @import of the style layer below
  styles/                 NEW — replaces the 53KB single-line globals.css
    tokens.css            palette, type scale, spacing, radii, shadows, easing, z-index, grain
    base.css              reset, typography, .shell / .act / .eyebrow / .btn / .surface / .chip
    motion.css            keyframes + prefers-reduced-motion backstop
    components.css        header, rail, cursor glow, footer, motion-primitive styles
    gate.css  hero.css  about.css  journey.css  arsenal.css  work.css  beyond.css  contact.css
  components/
    experience/           NEW
      ExperienceRoot.tsx  act state machine: gate → entering → portfolio
      GateScreen.tsx      Act 0
      CurtainTransition.tsx
      Portfolio.tsx       composes header, acts 1–7, footer
      session.ts          ENTERED_KEY
    motion/               NEW primitives (existing Magnetic / AnimatedCounter / useMotionPreferences kept)
      Reveal  SplitText  Parallax  Marquee  TiltCard  CursorGlow
      StickyStack  SectionRail  ScrollPath  LiveClock
    lanyard/
      ThreeLanyard.tsx    preserved + `released` prop + light tuning
      PhysicsLanyard.tsx  passes `released` through; fallback restyled
      StableLanyard.tsx
      preload.ts          NEW — shared asset URLs + preloadLanyardAssets()
    sections/
      HeroSection  AboutSection  JourneySection (new)  ArsenalSection (new)
      WorkSection (replaces ProjectsSection)  BeyondSection (new)  ContactSection
    projects/
      ProjectGallery.tsx  NEW — one shared gallery; the four gallery files are now thin data wrappers
      ImageCarouselDialog / ProjectCaseStudyDialog — logic untouched, restyled
    layout/  Header.tsx (rebuilt, sliding pill)  Footer.tsx (rebuilt, replay intro)
  data/
    personal.ts   seven-act navigation, firstName
    projects.ts   + `companion` (the 01A admin panel card); fixed mis-encoded — and é
    skills.ts     + skillDetail (notes + levels) + marqueeItems
    journey.ts    NEW — timeline milestones  ← contains TODO placeholders, see §7
    beyond.ts     NEW — clock zone, currently building, fun facts
```

**Design tokens (exact):** porcelain `#FBFAF7` · paper `#FFFFFF` · ink `#14141A` ·
muted `#6B6B78` · indigo `#4F46E5` · coral `#FF7A45` · mint `#10B981` ·
easing `cubic-bezier(0.22, 1, 0.36, 1)` · breakpoints 620px / 900px.

**No new runtime dependencies.** Everything is framer-motion 12 + CSS. Tailwind's
preflight reset is disabled (base.css owns the reset); no Tailwind utilities were in use.

---

## 6. Bugs fixed along the way (pre-existing)

- `AnimatedCounter` rendered "03+" as "30+" — leading zeros are now preserved.
- `projects.ts` contained mojibake (`â€”`, `Ã©`) from a bad encoding — now proper em dashes and accents.
- `SplitText` word spacing collapsed inside the overflow mask — spaces now live between the masked spans.

---

## 7. Things for you to do

1. **Drag the card in a real browser.** Headless verification used software WebGL, which can't prove how the physics *feel*. `npm run dev`, click **Get to know me**, drag the card.
2. **Fill in `src/data/journey.ts`.** The milestones are seeded from facts already in the repo and every guessed date/institution is marked `// TODO`. Edit that one file — no component changes needed.
3. Optional: personalise the last fun fact in `src/data/beyond.ts` (also marked `TODO`).

---

## 8. Verification performed

- `npx tsc --noEmit` clean; `npm run build` clean (First Load JS 174 kB).
- `NEXT_PUBLIC_BASE_PATH=/lanyard-portfolio npm run build` clean — asset URLs carry the GitHub Pages prefix.
- Headless Chrome (via CDP): gate renders → click → curtain → portfolio; `sessionStorage` written; reload skips gate; deep links skip gate; **Replay intro** restores gate.
- Carousel opens, advances (02 / 08), closes on Escape, restores body scroll; case-study dialog opens with the right title.
- Arsenal note updates on keyboard focus (accessibility path).
- Reduced-motion: full flow works and the page is static and readable.
- Mobile 390px: no horizontal overflow; Work cards and bento collapse to one column.
- Note: ESLint is not configured in this repo (`npm run lint` prompts for setup) — unchanged from before.

---

## 9. Revision 2 — polish after first review (23 Aug 2026)

Five small changes requested after seeing the first build. All uncommitted in the working tree.

| Change | Where | What |
|---|---|---|
| Custom page scrollbar | `src/styles/base.css` | Slim 10px track on porcelain, rounded ink-grey thumb that turns indigo on hover. Chrome/Edge/Safari via `::-webkit-scrollbar`, Firefox via `scrollbar-width` / `scrollbar-color`. `scrollbar-gutter: stable` so nothing shifts when the gate locks/unlocks scroll. |
| Custom dialog scrollbar | `src/styles/work.css` | 8px version inside the case-study panel, inset from the rounded corners. |
| Gate copy changed (layout kept) | `GateScreen.tsx`, `gate.css` | Same centred composition as the first version — strap to an empty clip, centred text, centred button. Only the words changed: eyebrow is now "Software Engineer · Kuala Lumpur, Malaysia", the headline is **Foong Zhi Hin.** (given name in indigo), the lead is the one-line summary from `personal.ts`. Footnote reads "FZH · Software engineer / Portfolio · 2026". On phones the eyebrow wraps cleanly onto two lines. (A left-aligned "cover" layout was tried and rejected — it overlapped the header on shorter screens.) |
| Mobile skills marquee now moves | `src/styles/components.css` | On touch screens a tap made `:hover` stick, and hover *pauses* the marquee — so it looked frozen. Pause is now limited to `(hover: hover) and (pointer: fine)` devices. Verified moving on a 390px emulation. |
| Case-study dialog on mobile | `ProjectCaseStudyDialog.tsx`, `work.css` | The text column was squeezed by 56px of right padding reserved for the close button. The close button now lives outside the scrolling article, pinned to the panel's top-right corner (it no longer scrolls away either). Overview and Focus box run full width; only the title line keeps clearance. Tighter padding at ≤620px. |

Verified: `npm run build` clean (174 kB first load); desktop + mobile cover screenshots; marquee measured moving on mobile; dialog opened and scrolled on mobile.

---

## 10. Git commands (run these yourself)

The original redesign is already committed on `redesign/the-card`. Revision 2 (six files) plus this document are uncommitted.

**Commit revision 2 and this document:**
```bash
git add -A
git commit -m "Polish: custom scrollbars, portfolio-cover gate, mobile marquee and dialog fixes"
```

**Option A — push the branch and open a PR (safe; nothing deploys yet):**
```bash
git push -u origin redesign/the-card
```
Then open a PR from `redesign/the-card` → `main` on GitHub.

**Option B — merge into main and deploy (pushing `main` triggers the GitHub Pages workflow):**
```bash
git checkout main
git merge redesign/the-card
git push origin main
```

**To review the diff first:**
```bash
git log --oneline main..redesign/the-card
git diff main..redesign/the-card --stat
```
