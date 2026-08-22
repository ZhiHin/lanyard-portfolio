# Foong Zhi Hin Portfolio — Motion Design System

## Product context
A personal software-engineering portfolio that introduces Zhi Hin Foong through an editorial landing page, interactive digital lanyard, selected project galleries and detailed case studies. The experience must communicate quiet confidence, technical craft and thoughtful product design.

## Existing visual identity — preserve exactly
- Background: warm ivory `#f5f2eb`; surfaces: paper `#fcfbf8`.
- Text: near-black ink `#12120f`; secondary copy `#68665e`; rules `#d8d3c8`; accent gold `#aa8b56`.
- Display type: Iowan Old Style / Baskerville / Times New Roman. Use only for large editorial headlines and project titles.
- UI type: Avenir Next / Avenir / Segoe UI / Arial. Use for navigation, labels, buttons and body copy.
- Style: calm editorial composition, thin rules, generous whitespace, one-pixel outlines, discreet shadows, precise small uppercase labels. Never add gradients, neon, glassmorphism, rounded app-card excess, or a completely new colour palette.
- Keep the FZH monogram as a simple outlined circle; do not replace it with another logo or invented mark.

## Layout
- Desktop container maximum: 1320px. Maintain balanced asymmetric project compositions.
- Responsive breakpoints: 900px tablet and 620px mobile.
- Preserve the current content order and project data. Motion adds story and feedback; it must not prevent reading or navigation.

## Motion principles
- Motion should feel like editorial camera movement: composed, slow enough to read, and never bouncy.
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)` for entrances and hover transforms; 180–260ms for hover feedback; 500–900ms for scroll reveals; 900–1400ms for restrained parallax.
- Use `transform` and `opacity` first. Avoid layout animation on large page areas and avoid continuous animation except the lanyard’s subtle idle motion.
- Respect `prefers-reduced-motion`: remove parallax, reveal instantly, disable magnetic translation and progress animation.

## Motion inventory
1. **Page progress** — a 2px gold line at the viewport top that smoothly reflects reading progress.
2. **Hero** — headline lines reveal in sequence; supporting copy fades up after; background editorial glow/parallax stays extremely subtle. Lanyard enters once, then retains its existing idle/drag behavior.
3. **Scroll reveals** — sections enter once when about 15–20% visible, using 18–34px upward translate and opacity only. Child content staggers by 70–110ms.
4. **Parallax depth** — project screenshot panels and decorative orbit lines travel at different, limited scroll rates (maximum 4–8% transform). Never move text far enough to impair reading.
5. **Project galleries** — screenshot frame gets a 1–2% image zoom and soft shadow lift on hover; arrows animate a few pixels; counter transitions without jumpiness.
6. **Project rows** — sticky/scale storytelling is reserved for desktop only and must not trap keyboard focus or block normal scrolling. Keep mobile as a normal vertical stack.
7. **Buttons and links** — magnetic movement must stay under 6px and only activate on fine-pointer devices. The primary dark button gets a small lift; text links extend their underline from left to right.
8. **Cards and modals** — case study/image dialogs fade and scale from 0.98 to 1; close/arrow controls have calm border and fill transitions.
9. **Counters** — about-section statistics count up once when visible, using tabular numerals and no repeated looping.
10. **Section transitions** — thin rules use a clip/reveal sweep as their adjacent section comes into view.

## Accessibility and performance
- Maintain keyboard access and visible focus outlines.
- Do not rely on motion to convey information.
- Make all decorative motion `aria-hidden`.
- Use requestAnimationFrame for scroll progress/parallax and clean up listeners.
- Defer motion on non-visible content; avoid filters and expensive paint operations during scroll.

## Design prompt constraints
Use only the current fonts, colours, spacing and component styles described here. Design a motion-enhanced evolution of the existing portfolio, not a new visual brand. Avoid unnecessary movement, bouncing, spinning, autoplay carousels or decorative noise.