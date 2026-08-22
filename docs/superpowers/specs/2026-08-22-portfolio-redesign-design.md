# Portfolio Redesign — "The Card" — Design Spec

Date: 2026-08-22
Status: Approved

## Purpose

Rebuild the Foong Zhi Hin portfolio as a story-driven, motion-led experience on a
light palette, without losing the 3D physics lanyard that gives the site its
identity.

The site currently presents as a single flat scroll — hero, about, projects,
contact — in a warm ivory editorial style. It is calm and competent but it does
not surprise anyone, and the lanyard, its most distinctive asset, is spent in the
first second before a visitor has any reason to care about it.

The redesign spends that asset deliberately instead. A welcome gate withholds the
card, asks "Do you want to know me?", and only on a click does the card fall into
frame on its lanyard. Everything after that is a sequence of acts rather than a
list of sections.

## Success criteria

1. A first-time visitor lands on a gate, clicks through, and sees the 3D card
   drop onto its lanyard — and the card is immediately draggable.
2. The 3D lanyard retains its rapier physics, rope joints, drag interaction and
   its error-boundary fallback.
3. `npm run build` still produces a working static export for GitHub Pages under
   `NEXT_PUBLIC_BASE_PATH`.
4. Every section animates on scroll, and every animation collapses to a static
   state under `prefers-reduced-motion: reduce`.
5. Layout holds at 620px, 900px and desktop widths.
6. No new runtime dependencies.

## Non-goals

- No dark mode. The brief is a light palette.
- No CMS, blog, or backend. The site stays a static export.
- No rewrite of the physics simulation inside `ThreeLanyard.tsx`.
- No new animation library. framer-motion 12 and CSS only.

## Decisions taken

| Decision | Choice | Why |
|---|---|---|
| Gate handoff | Same-page cinematic overlay | Keeps the 3D scene warm across the transition, so the card drop is continuous rather than a page reload |
| Gate memory | `sessionStorage`, plus a footer replay control | Returning visitors in the same tab skip the intro; the story still plays for everyone new |
| Palette | Soft Studio (porcelain / ink / indigo / coral / mint) | Light as requested, modern, and it makes the existing dark card texture pop |
| New sections | Journey, Arsenal, Beyond the Code | Chosen by the user; "How I work" was declined |
| Motion tech | framer-motion 12 only | Zero install risk on a static export; leaves frame budget for the physics scene |
| Fonts | Self-hosted via `next/font` | No external request, no layout shift, works offline and under a base path |

## Architecture

### The act state machine

`ExperienceRoot` is a client component owning one piece of state:

```
type Act = "gate" | "entering" | "portfolio"
```

- `gate` — only `GateScreen` is mounted. 3D assets preload in the background.
  Body scroll is locked.
- `entering` — `CurtainTransition` plays. The portfolio mounts underneath,
  including the 3D canvas, so the card is live the instant the curtain clears.
- `portfolio` — the gate unmounts, scroll unlocks, the full page is interactive.

On mount, if `sessionStorage.getItem("fzh:entered") === "1"`, the machine starts
at `portfolio` and skips the gate entirely.

Server and first client render must agree, so the machine always renders `gate`
markup on the server and reconciles to `portfolio` in an effect — the same
mounted-guard pattern already used by `useMotionPreferences`.

### Preloading

`GateScreen` calls a `preloadLanyardAssets()` helper on mount, which invokes
`useGLTF.preload(cardGLB)` and preloads both textures. The gate itself is
lightweight HTML and CSS, so it paints immediately while the heavy assets stream
in behind it. By the time the visitor reads the question and clicks, the card is
ready to drop.

### File layout

```
src/
  app/
    layout.tsx           fonts, metadata
    page.tsx             renders <ExperienceRoot />
    globals.css          @tailwind directives + @import of the style layer
  styles/
    tokens.css           colour, type, spacing, easing, shadow, z-index
    base.css             reset, typography, shared utilities
    motion.css           keyframes, reduced-motion overrides
    gate.css  hero.css  about.css  journey.css
    arsenal.css  work.css  beyond.css  contact.css
    components.css       buttons, dialogs, galleries, rail, cursor
  components/
    experience/
      ExperienceRoot.tsx   act state machine
      GateScreen.tsx       act 0
      CurtainTransition.tsx
      Portfolio.tsx        composes header, acts 1-7, footer
    lanyard/
      ThreeLanyard.tsx     preserved; light-theme + drop-in tuning
      PhysicsLanyard.tsx   preserved error boundary
      StableLanyard.tsx    restyled fallback
      preload.ts           new
    motion/
      useMotionPreferences.ts  Magnetic.tsx  AnimatedCounter.tsx   (kept)
      Reveal.tsx  SplitText.tsx  Parallax.tsx  Marquee.tsx
      TiltCard.tsx  CursorGlow.tsx  StickyStack.tsx  SectionRail.tsx
      ScrollPath.tsx
    sections/
      HeroSection  AboutSection  JourneySection  ArsenalSection
      WorkSection  BeyondSection  ContactSection
    layout/  Header.tsx  Footer.tsx
    projects/  galleries and dialogs (restyled, logic unchanged)
  data/
    personal.ts  projects.ts  skills.ts  journey.ts  beyond.ts
```

### Why the CSS is being restructured

`src/app/globals.css` is 53KB across 157 lines; individual lines run into the
thousands of characters. It is the file this redesign touches most, and in its
current form it cannot be reviewed or safely edited. It is replaced by a token
layer plus one readable stylesheet per section, keeping the same global
class-name approach already in use. Gallery and dialog layout rules are ported
rather than reinvented.

This is scoped to the CSS the redesign already rewrites. No unrelated
refactoring.

## Motion system

Every section composes the same primitives, which is what makes the motion read
as one language rather than a pile of effects.

| Primitive | Responsibility |
|---|---|
| `Reveal` | opacity + y entrance on viewport entry, `once: true` |
| `SplitText` | headline mask reveal, staggered per word |
| `Parallax` | `useScroll`-driven translate on decorative layers |
| `ScrollPath` | SVG `pathLength` tied to a section's scroll progress |
| `StickyStack` | pins a card while the next slides over it |
| `Marquee` | infinite dual-direction ticker |
| `TiltCard` | pointer-driven 3D tilt, fine pointers only |
| `CursorGlow` | soft radial spotlight following the pointer |
| `SectionRail` | fixed dot rail marking the current act |

Shared timing, defined once in `tokens.css`:

- Entrance easing `cubic-bezier(0.22, 1, 0.36, 1)`
- Hover feedback 180–240ms
- Scroll reveals 500–800ms
- Parallax and pinning 900–1400ms

All motion animates `transform` and `opacity` only. No layout-affecting property
is animated on a large area.

### Reduced motion

`useMotionPreferences` already returns a `reduced` flag that stays false until
mount. Every primitive accepts that flag and degrades to its final state with
zero duration. `CursorGlow` and `TiltCard` do not mount at all when reduced or
when the pointer is coarse. `motion.css` carries a
`@media (prefers-reduced-motion: reduce)` block as a backstop for CSS-driven
animation. The curtain transition shortens to a plain crossfade.

## The acts

### Act 0 — The Threshold

Full-viewport porcelain, grain overlay, two drifting accent blobs. A lanyard
strap descends from the top edge and terminates in an empty clip — the card is
conspicuously missing. Kinetic headline "Do you want to know me?" reveals word by
word. Primary action "Get to know me" is magnetic; secondary "Just browsing"
enters the portfolio and scrolls straight to Work.

Both actions are real `<button>` elements, focusable, and operable by keyboard.

### Act 1 — The Reveal (hero)

The curtain clears onto the hero. The strap extends and the 3D card falls into
frame on the lanyard, physics live. Alongside it: the introduction, role,
location, and two calls to action.

### Act 2 — Who I Am (about)

Editorial two-column introduction, animated statistics via the existing
`AnimatedCounter`, and the working philosophy.

### Act 3 — The Journey

Vertical scroll-scrubbed timeline. An SVG line draws itself through the section
as scroll progresses; milestones snap in alternating left and right.

Content lives in `src/data/journey.ts`. It is seeded from facts already present
in the repository — project years, Kuala Lumpur, Software Engineer — and every
seeded entry carries a `TODO` comment so the real dates can be corrected in one
file without touching component code.

### Act 4 — The Arsenal

Two movements: an infinite marquee of technology chips running in opposite
directions, then a grid where hovering a technology reveals how it is actually
used. Driven by an expanded `skills.ts`.

### Act 5 — The Work

The four existing projects, presented as sticky-stacking cards. The existing
screenshot galleries, the image carousel dialog and the case-study dialog are all
preserved — their logic is untouched, their styling is brought into the new
system.

### Act 6 — Beyond the Code

A bento grid of oversized tilt-reactive tiles: a live Kuala Lumpur clock, a
pulsing availability badge, "currently building", fun facts, a compact stat wall.
Content lives in `src/data/beyond.ts`.

### Act 7 — Let's Talk

Contact. Email as the primary action, GitHub, LinkedIn, résumé download.

## Accessibility

- The gate is keyboard-operable and its actions are buttons, not divs.
- Focus moves into the portfolio when the curtain completes.
- Scroll is locked only while the gate is displayed and is always restored.
- The 3D canvas keeps its descriptive `aria-label`; the card drag is an
  enhancement, never the only path to information.
- All decorative layers — blobs, grain, rail, cursor glow — are `aria-hidden`.
- Contrast: ink on porcelain and indigo on porcelain both clear WCAG AA.
- Every animation respects `prefers-reduced-motion`.

## Performance

- The 3D canvas mounts only after the gate, so the first paint carries no WebGL
  cost. Assets preload during the gate, so the drop is not delayed.
- Blobs and grain are transform-only and static-texture respectively.
- `CursorGlow` is pointer-fine only and writes CSS custom properties rather than
  triggering React renders.
- The existing WebGL context-loss recovery and mobile DPR clamp in
  `ThreeLanyard.tsx` are retained.
- Marquee runs on a CSS transform loop, not a JS frame loop.

## Verification

The project has no test framework, so verification is build plus manual
browser confirmation:

1. `npm run build` succeeds and emits the static export.
2. `npm run build` with `NEXT_PUBLIC_BASE_PATH` set still resolves assets.
3. In a browser: gate renders, "Get to know me" transitions, card drops, card
   drags.
4. "Just browsing" enters and lands on Work.
5. Reload in the same tab skips the gate; the footer replay control restores it.
6. Every act animates on scroll.
7. With reduced motion forced, the page is fully readable and static.
8. Layout holds at 620px, 900px and desktop.

## Risks

| Risk | Mitigation |
|---|---|
| Band renders white-on-white against porcelain | Retune `meshLineMaterial` colour and verify in browser before calling it done |
| Curtain and physics competing for frames on mount | Physics mounts under the curtain, so the cost lands during an opaque transition |
| Hydration mismatch from `sessionStorage` | Always render the gate on the server; reconcile in an effect |
| CSS restructure regressing gallery layout | Port gallery rules rather than rewriting; verify each gallery in browser |
| Journey dates are placeholders | Seeded values are marked `TODO` and isolated in one data file |
