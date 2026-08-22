# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a seven-act, story-driven motion experience on a light palette, entered through a welcome gate that withholds the 3D lanyard card until the visitor asks to see it.

**Architecture:** A client-side act state machine (`gate | entering | portfolio`) owns the entry story. The gate paints instantly while 3D assets preload behind it; the portfolio and its WebGL canvas mount under an opaque curtain so the card is live the moment the curtain clears. Every section composes the same small set of framer-motion primitives, so the motion reads as one language.

**Tech Stack:** Next.js 15 (static export), React 19, TypeScript (strict), framer-motion 12, @react-three/fiber + @react-three/rapier + three, lucide-react, plain global CSS with a token layer.

**Spec:** `docs/superpowers/specs/2026-08-22-portfolio-redesign-design.md`

## Global Constraints

- **No new runtime dependencies.** framer-motion 12 and CSS only.
- **Static export must keep working.** `output: "export"` in `next.config.ts`; every task ends with a green `npm run build`.
- **Base path awareness.** Every public asset URL must be prefixed with `process.env.NEXT_PUBLIC_BASE_PATH || ""`. Never hardcode `/card.glb`.
- **TypeScript strict.** No `any` in new code except inside `ThreeLanyard.tsx`, which already carries file-level eslint disables for the r3f refs.
- **No dark mode.** Light palette only.
- **Reduced motion is mandatory.** Every animated component accepts and honours the `reduced` flag from `useMotionPreferences`.
- **Animate `transform` and `opacity` only.** No layout-affecting properties animated on large areas.
- **Decorative layers are `aria-hidden="true"`.**
- **Physics preserved.** Do not rewrite the rapier simulation, rope joints, drag handling, or the WebGL context-loss recovery in `ThreeLanyard.tsx`.
- **Palette tokens (exact):** porcelain `#FBFAF7`, paper `#FFFFFF`, ink `#14141A`, muted `#6B6B78`, indigo `#4F46E5`, coral `#FF7A45`, mint `#10B981`.
- **Entrance easing (exact):** `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Breakpoints (exact):** 620px mobile, 900px tablet.

**Verification gate used by every task** (this project has no test framework; the spec defines verification as build plus browser confirmation):

```bash
npx tsc --noEmit && npm run build
```

---

### Task 1: Design token layer and CSS restructure

Replaces the 53KB single-line `globals.css` with a readable, layered stylesheet. Nothing renders differently yet — this is the foundation every later task builds on.

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/motion.css`
- Create: `src/styles/components.css`
- Modify: `src/app/globals.css` (becomes imports only)
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS custom properties consumed by every later task —
  `--porcelain --paper --ink --muted --indigo --coral --mint`,
  `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`),
  `--shell` (container width), `--grain` (data-URI noise),
  `--z-rail --z-header --z-gate --z-dialog`.
  Shared utility classes: `.shell`, `.eyebrow`, `.btn`, `.btn-primary`, `.btn-ghost`, `.surface`, `.hairline`.

- [ ] **Step 1: Snapshot the current stylesheet for reference**

```bash
cp src/app/globals.css docs/superpowers/plans/globals.legacy.css
```

Keep it untracked-but-present during implementation so gallery and dialog rules can be ported verbatim in Task 10. Delete it in Task 13.

- [ ] **Step 2: Write `src/styles/tokens.css`**

Define `:root` custom properties for the palette above, a type scale
(`--step--1` through `--step-6` using `clamp()`), spacing scale, radii,
three shadow levels, the easing token, the container width, and the
z-index scale. One declaration per line.

- [ ] **Step 3: Write `src/styles/base.css`**

Reset, `html`/`body` on `--porcelain`, link and button resets, selection
colour, the grain overlay on `body::before`, and the shared utility classes
listed in Interfaces.

- [ ] **Step 4: Write `src/styles/motion.css`**

Keyframes (`drift`, `marquee`, `pulse`, `curtain`), and a
`@media (prefers-reduced-motion: reduce)` block that neutralises
animation-duration and transition-duration site-wide as a backstop.

- [ ] **Step 5: Write `src/styles/components.css`**

Buttons, the section rail, cursor glow, and empty section-scoped blocks to
be filled by later tasks.

- [ ] **Step 6: Reduce `src/app/globals.css` to imports**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "../styles/tokens.css";
@import "../styles/base.css";
@import "../styles/motion.css";
@import "../styles/components.css";
```

Tailwind's PostCSS pipeline hoists `@import`. Confirm the emitted CSS in
`out/` actually contains the token values before moving on.

- [ ] **Step 7: Wire fonts in `src/app/layout.tsx`**

Use `next/font/google` with `display: "swap"` for a geometric display face
and a UI sans, exposing them as `--font-display` and `--font-ui`. Attach
both variables to `<html>`. `next/font` self-hosts at build time, so this
adds no external request and no new dependency.

- [ ] **Step 8: Update `tailwind.config.ts`**

Point `colors` and `fontFamily` at the new custom properties so Tailwind
utilities and the hand-written CSS cannot drift apart.

- [ ] **Step 9: Verify**

```bash
npx tsc --noEmit && npm run build
```

Expected: build succeeds. The page will look unstyled — every section's CSS
is gone by design and returns in Tasks 6–12.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "Restructure styles into a token layer"
```

---

### Task 2: Motion primitive library

The nine components every section reuses. Building them first is what keeps the motion consistent instead of ad hoc.

**Files:**
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/components/motion/SplitText.tsx`
- Create: `src/components/motion/Parallax.tsx`
- Create: `src/components/motion/Marquee.tsx`
- Create: `src/components/motion/TiltCard.tsx`
- Create: `src/components/motion/CursorGlow.tsx`
- Create: `src/components/motion/StickyStack.tsx`
- Create: `src/components/motion/SectionRail.tsx`
- Create: `src/components/motion/ScrollPath.tsx`
- Keep unchanged: `useMotionPreferences.ts`, `Magnetic.tsx`, `AnimatedCounter.tsx`

**Interfaces:**
- Consumes: `useMotionPreferences(): { mounted: boolean; reduced: boolean }` from Task 0 (already exists).
- Produces — these exact signatures are relied on by Tasks 6–12:

```ts
Reveal({ children, delay?: number, y?: number, className?: string, as?: "div" | "section" | "li" })
SplitText({ text: string, className?: string, delay?: number, as?: "h1" | "h2" | "h3" | "p" })
Parallax({ children, speed?: number, className?: string })      // speed: -1..1
Marquee({ items: string[], reverse?: boolean, speed?: number })
TiltCard({ children, className?: string, strength?: number })
CursorGlow()                                                     // no props
StickyStack({ children: ReactNode[], className?: string })
SectionRail({ sections: { id: string; label: string }[] })
ScrollPath({ targetRef: RefObject<HTMLElement | null>, className?: string })
```

- [ ] **Step 1: `Reveal`** — `whileInView` opacity/y entrance, `viewport={{ once: true, amount: 0.2 }}`, duration 0 when `reduced`.

- [ ] **Step 2: `SplitText`** — split on whitespace, wrap each word in an `overflow: hidden` span, stagger `y: 100% → 0`. The full string must remain in the accessibility tree: put `aria-label={text}` on the wrapper and `aria-hidden` on the word spans.

- [ ] **Step 3: `Parallax`** — `useScroll({ target, offset: ["start end", "end start"] })` into `useTransform` on `y`. Returns children untransformed when `reduced`.

- [ ] **Step 4: `Marquee`** — render the item list twice inside a flex track animated by a CSS transform loop (`animation: marquee` from `motion.css`), not a JS frame loop. `aria-hidden` on the duplicate.

- [ ] **Step 5: `TiltCard`** — pointer-driven `rotateX`/`rotateY` via springs. Returns a plain `div` when `reduced` or when `matchMedia("(pointer: fine)")` does not match.

- [ ] **Step 6: `CursorGlow`** — a fixed radial-gradient div positioned by writing `--cursor-x` / `--cursor-y` custom properties in a `pointermove` listener. Never call `setState` on move. Renders `null` when `reduced` or on coarse pointers.

- [ ] **Step 7: `StickyStack`** — wraps each child in a `position: sticky` item with an increasing `top` and a scroll-linked scale, so cards pin and the next slides over the last. Falls back to a plain stacked list when `reduced`.

- [ ] **Step 8: `SectionRail`** — fixed dot rail; tracks the active section with a single `IntersectionObserver`. Dots are `<a href="#id">` so it is keyboard-navigable and each carries an accessible label. `aria-hidden` is **not** used here — this one is real navigation.

- [ ] **Step 9: `ScrollPath`** — an SVG line whose `pathLength` is driven by the target's scroll progress, for the Journey timeline.

- [ ] **Step 10: Verify and commit**

```bash
npx tsc --noEmit && npm run build
git add -A && git commit -m "Add the shared motion primitive library"
```

---

### Task 3: Data layer

All new copy lives in `src/data` so it can be corrected without touching components.

**Files:**
- Create: `src/data/journey.ts`
- Create: `src/data/beyond.ts`
- Modify: `src/data/skills.ts`
- Modify: `src/data/personal.ts`

**Interfaces:**
- Produces:

```ts
// journey.ts
export type Milestone = { year: string; title: string; org: string; body: string }
export const journey: Milestone[]

// beyond.ts
export type FunFact = { label: string; value: string }
export const beyond: {
  location: string; timezone: string;   // IANA zone for the live clock
  currentlyBuilding: { title: string; body: string };
  facts: FunFact[];
}

// skills.ts  (extended, existing exports kept)
export type Skill = { name: string; note: string }
export const skillGroups: { title: string; items: string[] }[]   // unchanged shape
export const skillDetail: { group: string; skills: Skill[] }[]   // new: hover-reveal grid
export const marqueeItems: string[]                              // new: ticker
export const statistics: { value: string; label: string }[]      // unchanged
```

- [ ] **Step 1: Write `journey.ts`**

Seed from facts already in the repository — project years 2025/2026, Kuala
Lumpur, Software Engineer. Every seeded entry gets a `// TODO: confirm real
date` comment, and a file-header comment stating these are placeholders to
be corrected by the site owner.

- [ ] **Step 2: Write `beyond.ts`** with `timezone: "Asia/Kuala_Lumpur"`.

- [ ] **Step 3: Extend `skills.ts`** with `skillDetail` and `marqueeItems`, keeping `skillGroups` and `statistics` exactly as they are so `AboutSection` keeps working.

- [ ] **Step 4: Extend `personal.ts` navigation** to the seven acts: Home, About, Journey, Skills, Work, Beyond, Contact.

- [ ] **Step 5: Verify and commit**

```bash
npx tsc --noEmit && npm run build
git add -A && git commit -m "Add journey, beyond and expanded skills data"
```

---

### Task 4: Experience shell and the act state machine

**Files:**
- Create: `src/components/experience/ExperienceRoot.tsx`
- Create: `src/components/experience/GateScreen.tsx`
- Create: `src/components/experience/CurtainTransition.tsx`
- Create: `src/components/experience/Portfolio.tsx`
- Create: `src/components/lanyard/preload.ts`
- Create: `src/styles/gate.css`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css` (add the `gate.css` import)

**Interfaces:**
- Consumes: `SplitText`, `Magnetic` (Task 2); `personal` (Task 3).
- Produces:

```ts
type Act = "gate" | "entering" | "portfolio"
export function ExperienceRoot()
export function GateScreen({ onEnter, onSkip }: { onEnter: () => void; onSkip: () => void })
export function CurtainTransition({ active, onComplete }: { active: boolean; onComplete: () => void })
export function Portfolio({ entered }: { entered: boolean })
export function preloadLanyardAssets(): void
export const ENTERED_KEY = "fzh:entered"
```

- [ ] **Step 1: `preload.ts`** — call `useGLTF.preload(cardGLB)` and preload both textures, guarded so it runs at most once. Build asset URLs through `NEXT_PUBLIC_BASE_PATH`.

- [ ] **Step 2: `ExperienceRoot.tsx`** — the machine.

Render `gate` on the server every time. In a mount effect, if
`sessionStorage.getItem(ENTERED_KEY) === "1"`, jump straight to `portfolio`.
This is the hydration-safety pattern the spec requires. Lock
`document.body.style.overflow` while the act is `gate`, and always restore it
on cleanup.

`onEnter` sets `entering`, writes the sessionStorage key, and after the
curtain completes sets `portfolio` and moves focus to the hero heading.
`onSkip` does the same but scrolls to `#work` once mounted.

- [ ] **Step 3: `GateScreen.tsx`** — porcelain full-viewport screen, grain, two drifting blobs, a strap descending from the top edge to an empty clip (pure CSS/SVG — **no WebGL here**, the card is the surprise), the `SplitText` question, a magnetic primary button and a text secondary button. Calls `preloadLanyardAssets()` on mount.

- [ ] **Step 4: `CurtainTransition.tsx`** — staggered vertical panels wiping away via `clipPath`, calling `onComplete` on the last panel's `onAnimationComplete`. When `reduced`, a single 200ms crossfade that still calls `onComplete`.

- [ ] **Step 5: `Portfolio.tsx`** — composes `CursorGlow`, `SectionRail`, `Header`, the seven acts, `Footer`. Sections arrive as stubs in this task and are filled by Tasks 6–12.

- [ ] **Step 6: `page.tsx`** — render `<ExperienceRoot />` and nothing else.

- [ ] **Step 7: Verify in the browser**

```bash
npm run dev
```

Confirm: gate paints, question animates, primary button enters, curtain
plays, sessionStorage key is written, reload in the same tab skips the gate.

- [ ] **Step 8: Verify and commit**

```bash
npx tsc --noEmit && npm run build
git add -A && git commit -m "Add the gate, curtain transition and act state machine"
```

---

### Task 5: Lanyard light-theme tuning and drop-in entrance

The physics stay exactly as they are. Only presentation and mount timing change.

**Files:**
- Modify: `src/components/lanyard/ThreeLanyard.tsx`
- Modify: `src/components/lanyard/StableLanyard.tsx`
- Modify: `src/components/lanyard/PhysicsLanyard.tsx`

**Interfaces:**
- Consumes: `preloadLanyardAssets` (Task 4).
- Produces: `PhysicsLanyard({ dropIn }: { dropIn?: boolean })`.

- [ ] **Step 1: Retune the band for a light background**

In `ThreeLanyard.tsx`, the `meshLineMaterial` currently uses
`color="white"`, which multiplies the texture and will disappear against
porcelain. Change it to a token-matched colour and confirm visually. **This
is the highest-risk visual change in the plan — verify it in the browser
before committing, not after.**

- [ ] **Step 2: Retune lighting** — adjust `Lightformer` intensities for a light ground so the dark card reads with contrast rather than glare. Keep the `Environment` setup.

- [ ] **Step 3: Add the drop-in entrance** — when `dropIn` is true, start the card group above frame and let gravity carry it down as physics engages, so the drop is simulated rather than tweened.

- [ ] **Step 4: Restyle `StableLanyard.tsx`** — the non-WebGL fallback must look correct in the new palette, since it is what appears if WebGL fails.

- [ ] **Step 5: Preserve, do not touch** — the rope joints, spherical joint, drag handling, `webglcontextlost` recovery, mobile DPR clamp, and the error boundary in `PhysicsLanyard.tsx`.

- [ ] **Step 6: Verify in the browser** — card drops after the curtain, hangs, swings, and **drags with the pointer**. Then force a failure (temporarily break the GLB path) and confirm `StableLanyard` appears. Restore the path.

- [ ] **Step 7: Verify and commit**

```bash
npx tsc --noEmit && npm run build
git add -A && git commit -m "Tune the lanyard for the light palette and add its drop-in entrance"
```

---

### Task 6: Act 1 — Hero

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`
- Create: `src/styles/hero.css`
- Modify: `src/app/globals.css` (import)

- [ ] **Step 1:** Rewrite `HeroSection` to compose `SplitText` for the headline, `Reveal` for the supporting copy, `Magnetic` for the two calls to action, and `PhysicsLanyard dropIn`.
- [ ] **Step 2:** The hero heading gets `id="hero-heading"` and `tabIndex={-1}` so Task 4's focus handoff lands somewhere real.
- [ ] **Step 3:** Write `hero.css` — asymmetric two-column grid, collapsing to stacked at 900px, with the lanyard given a fixed minimum height so the canvas never collapses to zero.
- [ ] **Step 4:** Verify in the browser at desktop, 900px and 620px.
- [ ] **Step 5:** `npx tsc --noEmit && npm run build` then commit.

---

### Task 7: Act 2 — About

**Files:**
- Modify: `src/components/sections/AboutSection.tsx`
- Create: `src/styles/about.css`
- Modify: `src/app/globals.css` (import)

- [ ] **Step 1:** Rewrite using `SplitText` + `Reveal`, keeping the existing `AnimatedCounter` for `statistics` and the existing `skillGroups` rendering.
- [ ] **Step 2:** Add a `Parallax` decorative layer behind the copy.
- [ ] **Step 3:** Write `about.css`.
- [ ] **Step 4:** Verify counters animate once on scroll into view, and hold at all breakpoints.
- [ ] **Step 5:** `npx tsc --noEmit && npm run build` then commit.

---

### Task 8: Act 3 — Journey

**Files:**
- Create: `src/components/sections/JourneySection.tsx`
- Create: `src/styles/journey.css`
- Modify: `src/app/globals.css` (import)
- Modify: `src/components/experience/Portfolio.tsx`

- [ ] **Step 1:** Build the section around `ScrollPath` bound to a section ref, with milestones from `journey` alternating left and right.
- [ ] **Step 2:** Each milestone uses `Reveal` with an index-derived delay.
- [ ] **Step 3:** Write `journey.css`. At 620px the timeline collapses to a single left-aligned rail — alternating sides do not work on narrow screens.
- [ ] **Step 4:** Verify the line draws in step with scroll, and that it is fully drawn and static under reduced motion.
- [ ] **Step 5:** `npx tsc --noEmit && npm run build` then commit.

---

### Task 9: Act 4 — Arsenal

**Files:**
- Create: `src/components/sections/ArsenalSection.tsx`
- Create: `src/styles/arsenal.css`
- Modify: `src/app/globals.css` (import)
- Modify: `src/components/experience/Portfolio.tsx`

- [ ] **Step 1:** Two `Marquee` rows from `marqueeItems`, second one `reverse`.
- [ ] **Step 2:** A grid from `skillDetail` where each entry reveals its `note` on hover **and on focus** — hover-only reveals are inaccessible.
- [ ] **Step 3:** Write `arsenal.css`, including a `prefers-reduced-motion` rule that stops the marquee translation.
- [ ] **Step 4:** Verify the marquee loops seamlessly with no visible seam or jump.
- [ ] **Step 5:** `npx tsc --noEmit && npm run build` then commit.

---

### Task 10: Act 5 — Work

The riskiest task, because it must preserve four working galleries and two dialogs while restyling all of them.

**Files:**
- Create: `src/components/sections/WorkSection.tsx`
- Delete: `src/components/sections/ProjectsSection.tsx`
- Modify: `src/components/projects/*.tsx` (styling only)
- Create: `src/styles/work.css`
- Modify: `src/app/globals.css` (import)

- [ ] **Step 1:** Port the gallery, carousel-dialog and case-study-dialog rules from `docs/superpowers/plans/globals.legacy.css` into `work.css`, translated to the new tokens. Port the layout; do not reinvent it.
- [ ] **Step 2:** Build `WorkSection` using `StickyStack` over `projects`, preserving the existing per-project gallery routing (`01` → `EvolystStayGallery`, `02` → `BusinessAdminGallery`, `03` → `RestaurantPosGallery`, else the generic art block) and the `EvolystConsoleGallery` sub-section under project `01`.
- [ ] **Step 3:** Keep `ProjectCaseStudyDialog` and `ImageCarouselDialog` logic **untouched** — restyle only. Their keyboard handling and scroll-lock already work.
- [ ] **Step 4:** Verify in the browser: every gallery advances, expand opens the carousel, arrow keys and Escape work, case-study dialogs open and close, body scroll is restored after closing.
- [ ] **Step 5:** `npx tsc --noEmit && npm run build` then commit.

---

### Task 11: Act 6 — Beyond the Code

**Files:**
- Create: `src/components/sections/BeyondSection.tsx`
- Create: `src/components/motion/LiveClock.tsx`
- Create: `src/styles/beyond.css`
- Modify: `src/app/globals.css` (import)
- Modify: `src/components/experience/Portfolio.tsx`

**Interfaces:** `LiveClock({ timezone }: { timezone: string })`

- [ ] **Step 1:** `LiveClock` renders an empty placeholder on the server and starts its interval only after mount — a clock rendered during SSR is a guaranteed hydration mismatch. Format with `Intl.DateTimeFormat` and the passed IANA zone. Clear the interval on unmount.
- [ ] **Step 2:** Build the bento grid from `beyond`, wrapping tiles in `TiltCard`.
- [ ] **Step 3:** Add the pulsing availability badge using `personal.availability` and the mint token.
- [ ] **Step 4:** Write `beyond.css` — an explicit `grid-template-areas` desktop layout collapsing to one column at 620px.
- [ ] **Step 5:** Verify no hydration warning appears in the console.
- [ ] **Step 6:** `npx tsc --noEmit && npm run build` then commit.

---

### Task 12: Act 7 — Contact, plus Header and Footer

**Files:**
- Modify: `src/components/sections/ContactSection.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Create: `src/styles/contact.css`
- Modify: `src/app/globals.css` (import)

- [ ] **Step 1:** Restyle `ContactSection` to the new palette with `SplitText` on the headline; keep the mailto, socials and résumé download exactly as they are.
- [ ] **Step 2:** Rebuild `Header` against the seven-act navigation, keeping the existing scroll-spy and mobile menu behaviour.
- [ ] **Step 3:** Add the **replay intro** control to `Footer` — clears `ENTERED_KEY` and reloads.
- [ ] **Step 4:** Verify the résumé downloads and both social links resolve.
- [ ] **Step 5:** `npx tsc --noEmit && npm run build` then commit.

---

### Task 13: Final verification pass

**Files:**
- Delete: `docs/superpowers/plans/globals.legacy.css`
- Modify: any file the verification pass turns up

- [ ] **Step 1:** Full clean build.

```bash
npx tsc --noEmit && npm run lint && npm run build
```

- [ ] **Step 2:** Base-path build, matching GitHub Pages.

```bash
NEXT_PUBLIC_BASE_PATH=/lanyard-portfolio npm run build
grep -r "lanyard-portfolio/card.glb" out/ | head
```

Expected: asset URLs carry the prefix.

- [ ] **Step 3:** Browser pass against the spec's eight verification points — gate, transition, drop, drag, skip-to-work, session skip, replay, every act animating.
- [ ] **Step 4:** Force `prefers-reduced-motion: reduce` and confirm the page is fully readable and static, and that the gate still lets you through.
- [ ] **Step 5:** Check 620px, 900px and desktop.
- [ ] **Step 6:** Confirm the console is free of hydration warnings and WebGL errors.
- [ ] **Step 7:** Remove the legacy CSS snapshot and commit.

---

## Self-Review

**Spec coverage:** Gate → Task 4. Preload → Task 4. Palette and fonts → Task 1. Curtain → Task 4. Lanyard preservation and light tuning → Task 5. Acts 1–7 → Tasks 6–12. Motion primitives → Task 2. Reduced motion → Task 2 primitives plus Tasks 8, 9, 13. Accessibility → Tasks 2, 4, 9, 12. Performance → Tasks 2, 4, 5. CSS restructure → Tasks 1 and 10. Verification → every task plus Task 13. Journey placeholder handling → Task 3. All spec sections are covered.

**Placeholder scan:** No TBDs. The only `TODO` markers are the deliberate, spec-mandated ones in `journey.ts`.

**Type consistency:** `ENTERED_KEY` is defined in Task 4 and reused in Task 12. `preloadLanyardAssets` is defined in Task 4 and consumed in Tasks 4 and 5. `PhysicsLanyard`'s new `dropIn` prop is defined in Task 5 and consumed in Task 6. `skillDetail` and `marqueeItems` are defined in Task 3 and consumed in Task 9. `beyond.timezone` is defined in Task 3 and consumed by `LiveClock` in Task 11. Signatures match across tasks.
