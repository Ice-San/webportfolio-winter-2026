# Ruben Costa · Portfolio (v3)

A bilingual (English / Portuguese) portfolio told as a short anime-style series. Next.js 16 (App Router),
React 19, Tailwind CSS 4, framer-motion. Built for Vercel (not deployed yet).

## Commands

```bash
pnpm dev     # local site at http://localhost:3000 (redirects to /en or /pt)
pnpm test    # content, dictionary, i18n and line-limit tests (node --test)
pnpm lint    # ESLint, including the 100-line rule below
pnpm build   # production build
```

## House rules

- **No file over 100 lines.** `pnpm lint` checks TS/TSX/JS, and `pnpm test` checks the CSS in `app/` and the JSON
  in `dictionaries/`.
- **When a file gets too big, split it into a same-name folder next to it.** The original file keeps its path and
  exports, so nothing that imports it changes. Examples: `content/projects.ts` + `content/projects/`,
  `components/eggs/Drone.tsx` + `components/eggs/drone/`.
- Translated copy lives in `dictionaries/` (page text) and `content/` (projects, skills), each with an `en` and a
  `pt` version (the tests check this). A few decorative strings stay inline in their component: the Japanese
  titles (第一話…最終話, ルーベン・コスタ, つづく), "Byte", "EP.00 / 04", and the name/handles in the footer and nav.

## Where to change what

| I want to change… | Go to |
|---|---|
| Any page text (headlines, story, buttons, nav, 404, the drone's lines) | `dictionaries/en/*.json` **and** `dictionaries/pt/*.json`, same key in both |
| A project's text, links, status or tech list | `content/projects/<slug>.ts` |
| Project order, or adding a project | `content/projects.ts` (+ `Slug` in `content/projects/types.ts`) |
| Skills on the skill tree | `content/skills.ts` |
| Which image a section or project shows | `content/images.ts` (files are in `public/`) |
| Name, email, GitHub, LinkedIn, site URL | `lib/site.ts` |
| The CV file | `public/cv-en.pdf` (linked from `components/Nav.tsx` → `CV_HREF`) |
| Colours and fonts | `app/styles/tokens.css` |
| Shared CSS classes (`kicker`, `title`, `btn`, `chip`…) | `app/styles/typography.css`, `app/styles/controls.css` |
| Animations (keyframes, reduced motion) | `app/styles/motion.css` |
| SEO: titles, share image, sitemap, robots, llms.txt | `app/[lang]/layout.tsx`, `opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/` |
| Language detection / redirect | `proxy.ts` + `lib/i18n.ts` |

### Dictionary files

| File | Keys |
|---|---|
| `site.json` | `meta` (SEO), `common`, `nav`, `hud`, `notFound`, `drone` |
| `opening.json` | `cover`, `ch01`, `save`, `swing` |
| `chapters.json` | `ch02`, `ch03` |
| `work.json` | `work`, `case`, `skills` |
| `ending.json` | `offscreen`, `ch04`, `credits` |

## The home page, top to bottom

`app/[lang]/page.tsx` stacks these sections (`components/sections/`):

| `id` | Section | Component |
|---|---|---|
| `top` | Cover (name, photo, CTAs) | `Cover.tsx` (+ `cover/Figure.tsx`) |
| `ch01` | EP.01 Minecraft | `StartingFromZero.tsx` |
| `ch02` | EP.02 Animes Cold (Discord, bots) | `TheServer.tsx` |
| `ch03` | EP.03 Self-made (commit log) | `SelfMade.tsx` |
| `work` | The four projects (sideways shelf) | `CollectedIssues.tsx` (+ `collected-issues/IssueCard.tsx`) |
| `skills` | Skill tree | `Abilities.tsx` |
| `offscreen` | Side quests | `OffPanel.tsx` |
| `ch04` / `credits` | EP.04, AI chat, contact | `BrandNewDay.tsx` (+ `brand-new-day/Chat.tsx`, `Credits.tsx`) |

Each case study is `app/[lang]/projects/[slug]/page.tsx`, built from `components/case-study/`.

## Folders

```
app/                 routes (Next.js App Router), globals.css + styles/
  [lang]/            /en and /pt: layout, home page, case studies, 404, share image
components/
  sections/          one file per home-page section (table above)
  case-study/        header, sections, tech list, gallery, next link of a case study
  comic/             manga building blocks: Episode, Panel, Title, PhotoScene, BlockBuild
  motion/            scroll animation helpers: InOut, Parallax, Words, Reveal, useStill, useMedia
  eggs/              easter eggs: Byte the drone, Return by Death (Konami code), save points, web shooter
  *.tsx              shared bits: Nav, Scene, Placeholder, Screenshot, Stamp, ProjectLinks, CopyEmail…
content/             projects, skills, image map
dictionaries/        en/ and pt/ copy, one JSON per page area
lib/                 site constants, locale helpers
tests/               node --test suites
docs/                specs, plans, second-brain backup (start at docs/README.md)
```
