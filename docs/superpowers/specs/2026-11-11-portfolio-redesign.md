# Portfolio v2: comic-book redesign

Supersedes §6 (look & motion) of `2026-11-11-portfolio-design.md`. Every other section of that spec (constraints, story, projects, skills, placeholders, tech) still applies.

## 1. Why

Ruben rated v1 4/10. What he said was wrong with it:
- The background changed colour mid-scroll.
- It felt like a pre-made template.
- It had no real scroll animation.
- The film and anime references were only text: no easter eggs, no character on screen.

He asked for a whole new experience, informed by references from the web. The last thing a visitor should remember is a nod to Spider-Man: Brand New Day: Ruben at home at night, working with his AI.

## 2. References used

- **Codrops "Ten Years Away":** comic panels assemble as you scroll; halftone cursor trail.
- **Codrops "More Than a Portfolio":** scene-based scroll, a small recurring character, projects as rooms.
- **Spider-Verse CSS write-ups:** halftone dots, misregistered print, motion "on twos" (12fps steps), glitch.
- **Interactive portfolio roundups:** a cursor toy, the Konami code, a console message for developers.

## 3. The concept: one comic issue

The site is issue #01 of a comic, "the origin story of a full-stack developer".

- **Ground:** one constant newsprint paper (`--paper #F4ECDD`). The background never changes. Scenes change inside panels, e.g. night panels.
- **Palette:** the four process inks: ink, red, blue, yellow.
- **Type:** Archivo (wide, black, italic for titles), JetBrains Mono for captions, Bangers only for sound effects.
- **Character:** "Ruben" is an original SVG kid with curly hair, a blue hoodie with a red `{ }` emblem, and red sneakers. Never official Spider-Man or Re:Zero art.

| Page | Section | Scroll moment |
|---|---|---|
| Cover | `Cover.tsx` | The cover swings open on its spine (rotateY 0→-100) to reveal page 01 |
| 01 Starting from zero | `StartingFromZero.tsx` | Panels fly in from the gutters; Minecraft blocks stack one per step |
| Swing | `WebSwing.tsx` | Ruben swings on a web line between pages (stepped ±55°) |
| 02 The server | `TheServer.tsx` | Discord window drops in, bot bubbles arrive one by one |
| 03 Self-made | `SelfMade.tsx` | A staircase of panels; Ruben is inked line by line in a sketchbook |
| Collected issues | `CollectedIssues.tsx` | Desktop: page pins and 4 project covers slide past sideways. Phones: stacked |
| Abilities | `Abilities.tsx` | Skill trading cards deal in, each naming the project that proves it |
| Off-panel | `OffPanel.tsx` | "You are not your code." with a flip "Rule #1" sticker |
| Brand new day | `BrandNewDay.tsx` + `NightScene.tsx` | Night room: city lights switch on as you scroll; Ruben at the desk with an AI companion; a 3-line chat; then the contact panel |

## 4. Easter eggs (`components/eggs/`)

- **Return by Death:**
  - Save points (`SavePoint`) record progress, with a toast.
  - The HUD skull "ATTEMPT #0N" or the Konami code (↑↑↓↓←→←→BA) shows "You died" and rewinds to the last save, one attempt later.
  - The count lives in sessionStorage, with a memory fallback.
  - The 404 page is the same death screen, linking back to the last save.
- **Web-shooter:** a toggle in the nav. When it's on, clicking empty paper shoots a web line with "THWIP!".
- **Halftone cursor trail:** fine pointers only, off under reduced motion.
- **Console message:** printed once per session, for developers who open devtools.

## 5. Motion rules

- **Stepped motion:** scroll-linked transforms use `onTwos(v, steps)` for the hand-drawn feel.
- **Measuring:** measure a wrapper ref and transform an inner element, so `useScroll` isn't skewed by its own transform.
- **Reduced motion:** `useStill()` gives the reduced-motion version. Everything renders in its final state, the cover isn't pinned, and the shelf becomes a stack.
- **No JS:** a `<noscript>` style forces `[data-reveal]` and `[data-draw]` to their final state.
- **Fixed-height pins** (the cover, the shelf) must fit their content at 360×640. The cover hides its barcode on phones, and on short phones its subline too.

## 6. Copy written by Claude, for Ruben to review

- The AI chat lines (`ch04.ai1`, `me1`, `ai2`).
- "Rule #1" (`offscreen.ruleBack`).
- The console message (`hud.console`).
- The footer joke (`credits.footer`).

These are original lines, not film dialogue.

## 7. Verified (2026-11-11)

- tsc, lint and 11/11 tests pass; `pnpm build` passes.
- Routes /en, /pt, 4 case studies and the 404, at 375, 768 and 1440, in normal, reduced and no-JS modes:
  - no horizontal overflow and no console errors;
  - one h1 per page, no heading skips, every image labelled.
  - Exception: the no-JS 404 is Next's blank shell.
- The background is identical at 6 depths. Panel transforms change with scroll.
- The Konami code rewinds and bumps the attempt; the web-shooter draws on click.
- Real-Tab focus is visible on every stop.
