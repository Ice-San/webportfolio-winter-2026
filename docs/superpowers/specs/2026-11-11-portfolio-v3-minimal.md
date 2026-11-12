# Portfolio v3: minimal, with the fandom in the details

Supersedes §3–5 of `2026-11-11-portfolio-redesign.md` (the comic look, its easter-egg styling and motion rules).
Story, projects, copy rules and hard constraints are unchanged (design spec §2–5).

## 1. Why

Ruben, on v2: "still lacks of parallax effects, scrollY in and out animations, the spider-verse/Comics design is not
what i was expecting, i expected something more minimalist but that shows my love for games, code, spider-man and
anime/manga". He also asked for no mockups and no questions.

References: Codrops minimal portfolios (Joffrey Spitzer, Stefan Vitasović), Aman Kamboj's manga-style chapter
navigation, matvoyce-style word-by-word text reveal, Japanese web design (vertical text, kanji kickers, "ma" space).

## 2. Look

- One paper ground (`--paper #F6F5F1`) top to bottom, ink `#111110`, one red (`#E0241B`, text `#BA1C14`), focus blue.
  The night scene keeps its own navy palette inside its frame only.
- Archivo 600 headings at tight tracking, JetBrains Mono for kickers (`// EP.01`), system Japanese stack (no webfont).
- Hairline panels, rounded-full buttons, screentone dots (`.tone`) for image placeholders, outlined numerals.

## 3. Where the fandom lives

| Love | Detail |
| --- | --- |
| Code | `// ` kickers, `<Developer role="…" />` hero line, `$ git log --reverse` timeline, file-tree skill branches |
| Games | "Quest log" projects, "Skill tree", "Side quests", Checkpoint rows, Attempt #N HUD, Konami rewind |
| Spider-Man | Web thread down the left margin (xl+), swinging spider between episodes, web-shooter toggle, night scene |
| Anime/manga | Episode numbers 第一話/第二話/第三話/最終話, vertical katakana name, つづく, screentone, "Next episode" cards |

## 4. Motion rules

- **In and out** (`useInOut` / `InOut`): enter window `['start end','start 72%']`, leave window `['end 28%','end start']`;
  `opacity = min(in, 1-out)`, `y = (1-in)·d − out·d·0.6`.
- **Parallax** (`Parallax`): `y` from `400·speed` to `−400·speed` over the element's pass; half travel below 640px.
  Hero: name halves split sideways, figure rises, katakana sinks, rays scale.
- **Words**: statement inks in word by word (opacity 0.14→1).
- **Motion off** (`useStill`): every motion element gets `REST` (opacity 1, no offset), and `Reveal` animates to
  `REST` with zero duration. Never `style={undefined}`: framer keeps the server-rendered starting state.
- No-JS: the `<noscript>` style forces `[data-reveal]` visible and `[data-draw]` fully inked.

## 5. Verified (2026-11-11)

tsc, lint, 11/11 tests, build clean; no forbidden strings in the build. Proof script: background constant at 6 depths,
title entering (opacity 0.12, +35px) / at rest (1, none) / leaving (0.23, −18px), hero layers move different
distances, Konami rewind, web-shooter. 63-run matrix (7 routes × 375/768/1440 × normal/reduced/no-JS): no overflow,
no console errors, one h1, no heading skips, no hidden content when motion is off. Known: the no-JS 404 is an empty
shell (Next.js issue, already reported).

## 6. Round two (2026-11-12)

- **Real photos.** The hero is `ruben1.webp` (clip-path wipe, grayscale to colour on hover) with the drawn Ruben as a
  sticker. EP01/EP02/OffPanel/shelf/case studies use the screenshots in `public/` through `content/images.ts`
  (kept out of `projects.ts` so node tests can import it). The final scene is `ruben-coding.jpg` with the floating
  AI bot (`PhotoScene`). `emilia-tan-bot.png` is Re:Zero art: only at 28px next to the bot name.
- **Reading line.** Text on the left, pictures on the right at `lg`; EP02's picture column is sticky. The spider
  thread on the left margin (xl+) is the "follow this" guide.
- **Byte, the drone** (`components/eggs/Drone.tsx`). It flies loops down the picture side, lags with a spring, leans
  into scroll speed, and gets a spider-sense tingle on fast scrolls. One original line per section, typed into a fixed
  RPG dialogue box (top on phones, bottom-right on `lg`) that hides after 8 s. Decorative: `aria-hidden`. Parked in the
  corner under reduced motion.
- **Navbar** (`AutoHide`) folds up on scroll down and returns on scroll up, top-edge hover or keyboard focus.
- **Copy.** Budget Builder and GeekHatch say Turborepo monorepo, Docker, Playwright end-to-end tests and CI/CD
  (provider unknown, so the wording is generic). Playwright is marked "used". PathPals is "Completed".
- **Unwritten copy is hidden, not shown as TBD.** `CaseSection` returns nothing without a body. Still missing: case-study
  idea/challenge/approach/result/learned where null, the EP03 course name and hard problem, "what I want to learn next".
- **Spacing** tightened (episode headers, sections, web-swing breaks) so the page never feels like it ended.
- **Verified:** tests 11/11, lint, tsc, build, 63-run audit matrix (reduced/no-JS: nothing hidden, every control
  named), motion checks, header shows on focus.

## 7. Round three (2026-11-12)

- **Bots named.** Bot #1 is Estela (moderation), Bot #2 is Emilia-Tan (community), each line with the bot's real avatar.
- **Demos:** Budget Builder `https://budgetb-gamma.vercel.app`, GeekHatch `https://geekhatch.com` (tested in `tests/content.test.ts`).
  Source stays private for both.
- **Ruben's face** (`public/ruben-face.webp`, cropped from `ruben1.webp`) replaces the "RC" circle in the navbar;
  `app/favicon.ico` is the same face, round, at 16/32/48/64 px.
- **The drawn Ruben is gone** from the hero and EP03. `components/comic/Ruben.tsx` is unused.

## 8. SEO and analytics (2026-11-12)

- **Hero chip removed** ("Open to my first developer role"); the kicker stands alone.
- **Vercel Analytics:** `<Analytics />` from `@vercel/analytics/next` in the root layout. Turn on Web Analytics in the
  Vercel dashboard; locally its script 404s (expected).
- **Origin:** `lib/site.ts` `SITE_URL` comes from `VERCEL_PROJECT_PRODUCTION_URL` (set by Vercel on every build), else
  `http://localhost:3000`. Contact constants (email, GitHub, LinkedIn) live there too.
- **Metadata:** every page has title, description, keywords (`meta.keywords` in the dictionaries; case studies add their
  stack), canonical, hreflang en/pt/x-default, Open Graph (with the share image) and a large Twitter card.
- **Structured data** (`components/JsonLd.tsx`): home has Person + WebSite + the four projects; each case study is a
  CreativeWork.
- **Crawl files:** `app/robots.ts` (allow all, sitemap link), `app/sitemap.ts` (8 URLs with language alternates),
  `app/llms.txt/route.ts` (llmstxt.org map built from the project and skill content).
- **Lighthouse** (production build): SEO 100 on home and a case study. Accessibility 96 on home: the statement's
  not-yet-inked words start at 20% opacity (by design). Best practices 96: the local Analytics 404 only.
