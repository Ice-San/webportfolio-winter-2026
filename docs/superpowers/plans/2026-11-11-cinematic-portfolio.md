# Cinematic Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Ruben Costa's bilingual (EN/PT) portfolio as a scroll-driven "film": hero → chapters 01–03 → the work reel → skills → off-screen → ch 04 → credits, plus 4 case-study pages.

**Architecture:** Next 16 App Router with every route under `app/[lang]` (the root layout lives there; `proxy.ts` redirects locale-less paths). Text renders in Server Components from JSON dictionaries and typed content files. Only the motion scenes are Client Components, built with framer-motion on native scroll (sticky panels inside tall sections, driven by `useScroll({ target })`).

**Tech Stack:** Next.js 16.4.6, React 19.3, TypeScript 5, Tailwind CSS 4 (installed), framer-motion, lucide-react, Node 26 built-in test runner (`node --test`, native TS type stripping).

**Spec:** `docs/superpowers/specs/2026-11-11-portfolio-design.md`. Read §2 before every task.

## Global Constraints

- Read `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`, `03-api-reference/03-file-conventions/proxy.md` and `03-api-reference/04-functions/next-root-params.md` before Task 1 (AGENTS.md: this Next differs from training data).
- `next.config.ts` has `cacheComponents: true`, so `app/[lang]/layout.tsx` **must** export `generateStaticParams` returning `[{lang:'en'},{lang:'pt'}]`, or the build fails.
- Only new dependencies: `framer-motion`, `lucide-react`. No smooth-scroll lib, no i18n lib, no test framework.
- Native scroll only: never `preventDefault` on wheel/touch, never `overflow: hidden` on `html`/`body`.
- Featured order is fixed: `pathpals`, `manager`, `budget-builder`, `geekhatch`.
- No source link for `pathpals`, `budget-builder`, `geekhatch`. Demo URLs: geekhatch `https://geekhatch.vercel.app`, manager `https://manager-front-end.vercel.app`. Repos: `https://github.com/Ice-San/manager-front-end`, `https://github.com/Ice-San/manager-back-end`.
- These strings must never appear in content or dictionaries: `pathpals-next`, `932 099 733`, `rubenoliveiracosta`, `instagram`.
- Contact: `rubencosta.dev.2004@gmail.com`, `https://github.com/Ice-San`, `https://www.linkedin.com/in/devrubencosta/`, `/cv-en.pdf` (PT: `/cv-pt.pdf`, a placeholder that falls back to the EN file until Ruben adds it).
- Hero headline EN: "Curiosity brought me here. Building things made me a developer." PT: "A curiosidade trouxe-me até aqui. Construir coisas fez de mim programador."
- Status labels: PathPals "Completed · School final project (PAP)", Manager "Completed", Budget Builder "In progress", GeekHatch "Beta · access only" (with PT equivalents).
- Unknown copy is never invented: missing case-study fields are `null` and render the visible marker "TBD — Ruben to write" ("Por escrever — Ruben").
- Tokens (spec §6): paper `#F3EEE5`, paper-fg `#1F1D1A`, ink `#0F0E0D`, ink-fg `#EDE7DC`, accent `#C4561C` (on ink `#E07A3F`), muted text checked to AA on both. Fonts via `next/font/google`: Archivo (variable, with `wdth` axis) and JetBrains Mono.
- Film/character references are text nods only: short phrases, no stills, logos or long quotes.
- Commits are local only, on branch `feat/cinematic-portfolio`. Never add a remote, never push, never touch Vercel.

## Review Focus

1. **Language switch on a deep page** keeps the path: `/en/projects/manager` → `/pt/projects/manager`. Pinned by `switchLocalePath` tests (Task 1).
2. **Proxy must not redirect assets** (`/cv-en.pdf`, `/favicon.ico`, `/_next/...`), or the CV and CSS break. Pinned by `needsLocalePrefix` tests (Task 1).
3. **Unknown slug or path** (`/en/projects/nope`, `/pt/whatever`) shows the Return by Death 404, not a crash or a blank page. Pinned by `dynamicParams = false` + catch-all, verified in Task 7.
4. **JS disabled or reduced motion:** all text is readable. Elements that animate in carry `data-reveal`, and a `<noscript>` style forces them visible. Pinned scenes render statically when `useReducedMotion()` is true. Verified in Task 9.
5. **PT dictionary drift:** a key added to `en.json` but not `pt.json` renders `undefined`. Pinned by the key-parity test (Task 1), which reruns in every task.

---

### Task 1: Locale routing, root layout, tokens, dictionaries

**Files:**
- Create: `lib/i18n.ts`, `proxy.ts`, `app/[lang]/layout.tsx`, `app/[lang]/page.tsx` (temporary stub), `app/[lang]/dictionaries.ts`, `dictionaries/en.json`, `dictionaries/pt.json`, `tests/i18n.test.ts`, `tests/dictionaries.test.ts`
- Modify: `app/globals.css` (replace with tokens), `tsconfig.json` (add `"allowImportingTsExtensions": true`), `package.json` (add `"test": "node --test \"tests/**/*.test.ts\""`, deps)
- Delete: `app/layout.tsx`, `app/page.tsx`, `public/{file,globe,next,vercel,window}.svg`

**Interfaces:**
- Produces (`lib/i18n.ts`, no imports so Node can run it):
  - `export const locales = ['en', 'pt'] as const`, `export type Locale = (typeof locales)[number]`
  - `export function isLocale(x: string): x is Locale`
  - `export function pickLocale(acceptLanguage: string | null): Locale`: the first tag (by q order) whose primary subtag is `pt` or `en` wins; the default is `'en'`.
  - `export function needsLocalePrefix(pathname: string): boolean`: false for `/_next/*`, `/api/*`, any last segment containing a `.`, and paths whose first segment is a locale.
  - `export function switchLocalePath(pathname: string, to: Locale): string`
- Produces (`app/[lang]/dictionaries.ts`): `getDictionary(locale: Locale): Promise<Dictionary>`, `type Dictionary = typeof import('../../dictionaries/en.json')`. Top-level keys: `nav`, `hero`, `ch01`, `ch02`, `ch03`, `work`, `skills`, `offscreen`, `ch04`, `credits`, `notFound`, `common` (fill the keys as later tasks need them; the parity test keeps EN and PT aligned).

- [ ] **Step 1:** `git switch -c feat/cinematic-portfolio`, then `pnpm add framer-motion lucide-react`.
- [ ] **Step 2: Write failing tests** in `tests/i18n.test.ts` (`import { … } from '../lib/i18n.ts'`, `node:test` + `node:assert/strict`):
  - `pickLocale('pt-PT,pt;q=0.9,en;q=0.8') === 'pt'`; `pickLocale('en-US,en') === 'en'`; `pickLocale('fr-FR,pt;q=0.5') === 'pt'`; `pickLocale(null) === 'en'`; `pickLocale('de') === 'en'`
  - `needsLocalePrefix('/') === true`; `('/projects/manager') === true`; `('/en') === false`; `('/pt/projects/x') === false`; `('/cv-en.pdf') === false`; `('/favicon.ico') === false`; `('/_next/static/a.js') === false`
  - `switchLocalePath('/en/projects/manager','pt') === '/pt/projects/manager'`; `('/pt','en') === '/en'`; `('/en/','pt') === '/pt/'`

  And `tests/dictionaries.test.ts`: read both JSON files with `fs`, flatten them to dotted key paths, and `assert.deepEqual(sortedKeys(en), sortedKeys(pt))`. Also assert that no value in either file contains any forbidden string from Global Constraints (case-insensitive).
- [ ] **Step 3:** Run `pnpm test`. Expected: i18n tests FAIL (module missing).
- [ ] **Step 4:** Implement `lib/i18n.ts`. `proxy.ts`: `export function proxy(request: NextRequest)` that, when `needsLocalePrefix(pathname)`, redirects (307) to `/${pickLocale(request.headers.get('accept-language'))}${pathname}`, with `config.matcher` excluding `_next`, `api` and files with extensions.
- [ ] **Step 5:** `app/[lang]/layout.tsx`: `import { lang } from 'next/root-params'`. Validate it with `isLocale`, else `notFound()`. Set `<html lang>`, load the fonts as CSS variables `--font-archivo` / `--font-mono`, add `generateStaticParams`, and put `<noscript><style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style></noscript>` in `<head>`. `globals.css`: `@import "tailwindcss"`, then expose the Global Constraints tokens through `@theme inline` (`--color-paper`, `--color-ink`, `--color-accent`, …, `--font-sans`, `--font-mono`), plus `html[data-stock="ink"]` swapping `--bg`/`--fg`, with `transition: background-color .6s` on `body`, and `@media (prefers-reduced-motion: reduce)` setting that transition to none. Stub `page.tsx` renders `dict.hero.headline`.
- [ ] **Step 6:** Run `pnpm test` (PASS), then `pnpm build`. Expected: build succeeds, prerendering `/en` and `/pt`. With `pnpm dev`, `curl -sI localhost:3000/` shows a `307` to `/en` and `curl -sI localhost:3000/cv-en.pdf` shows no locale redirect.
- [ ] **Step 7:** Commit `feat: locale routing, root layout, tokens and dictionaries`.

---

### Task 2: Content data (projects, skills) and integrity tests

**Files:**
- Create: `content/projects.ts`, `content/skills.ts`, `tests/content.test.ts`

**Interfaces:**
- Consumes: `Locale` (type-only import from `../lib/i18n.ts`).
- Produces (`content/projects.ts`):
  ```ts
  export type L = Record<Locale, string>
  export type Slug = 'pathpals' | 'manager' | 'budget-builder' | 'geekhatch'
  export type Project = {
    slug: Slug; reel: 1 | 2 | 3 | 4; title: string; period: string
    type: L; status: L; tone: 'done' | 'progress' | 'beta'
    summary: L
    idea: L | null; challenge: L | null; approach: L | null
    implementation: L; technology: { name: string; how: L }[]
    result: L | null; learned: L | null
    demoUrl: string | null; repoUrls: string[]
    cover: L; gallery: L[]           // placeholder descriptions (spec §7)
  }
  export const projects: Project[]   // in reel order
  export function getProject(slug: string): Project | undefined
  ```
- Produces (`content/skills.ts`): `export type Skill = { name: string; group: 'frontend'|'backend'|'data'|'practices'; label: 'used'|'familiar'|'learning'; evidence: Slug[] }`, `export const skills: Skill[]`. Use the mapping in spec §5; every skill with `label: 'used'` has at least one evidence slug.

Facts come only from spec §4 (and read-only from `C:\Users\ruben\Desktop\budgetb\README.md` and `C:\Users\ruben\Desktop\geekhatch\README.md` for implementation and technology details). Subjective fields (`idea`, `challenge`, `result`, `learned`) are `null` unless spec §4 states the fact. Period: PathPals `2024`, Manager `2025`, Budget Builder `2026`, GeekHatch `2026`.

- [ ] **Step 1: Write failing tests** in `tests/content.test.ts`:
  - `projects.map(p => p.slug)` deep-equals `['pathpals','manager','budget-builder','geekhatch']`, and `reel` equals index + 1.
  - For `pathpals`, `budget-builder` and `geekhatch`, `repoUrls` is empty. `pathpals.demoUrl === null`. `geekhatch.demoUrl === 'https://geekhatch.vercel.app'`.
  - `JSON.stringify(projects) + JSON.stringify(skills)` contains no forbidden string (case-insensitive).
  - Every non-null `L` has non-empty `en` and `pt`.
  - Every `skill.evidence` slug exists in `projects`; every `'used'` skill has at least one evidence slug.
- [ ] **Step 2:** Run `pnpm test`. Expected: FAIL (modules missing).
- [ ] **Step 3:** Write `content/projects.ts` and `content/skills.ts`.
- [ ] **Step 4:** Run `pnpm test`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: project and skill content with integrity tests`.

---

### Task 3: Site shell (motion root, nav, film strip, stock backdrop, placeholder, reveal)

**Files:**
- Create: `components/motion/MotionRoot.tsx`, `components/motion/Reveal.tsx`, `components/StockBackdrop.tsx`, `components/Nav.tsx`, `components/LangSwitch.tsx`, `components/FilmStrip.tsx`, `components/Placeholder.tsx`, `components/Scene.tsx`
- Modify: `app/[lang]/layout.tsx` (wrap children in `MotionRoot`; render `Nav`, `FilmStrip`, `StockBackdrop`)

**Interfaces:**
- `MotionRoot({ children })`: client; `<MotionConfig reducedMotion="user">`.
- `Reveal({ children, delay?: number, as?: 'div'|'p'|'li' })`: client; `motion.*` with `data-reveal`, `initial={{opacity:0,y:24}}`, `whileInView={{opacity:1,y:0}}`, `viewport={{once:true, margin:'-10% 0px'}}`, duration 0.6, ease `[0.22,1,0.36,1]`. This is the **only** entrance used outside the set pieces.
- `Scene({ id: string, stock: 'paper'|'ink', label: string, children })`: server; `<section id data-stock aria-label>`. `id` values: `hero`, `ch01`, `ch02`, `ch03`, `work`, `skills`, `offscreen`, `ch04`, `credits`.
- Film grain: in `globals.css`, `[data-stock="ink"]::after` is a fixed, `pointer-events:none` overlay with an inline SVG `feTurbulence` noise `data:` URI at about 6% opacity, static (no animation).
- `StockBackdrop()`: client; an IntersectionObserver on `[data-stock]` (threshold where the section covers the viewport middle) sets `document.documentElement.dataset.stock`.
- `FilmStrip({ chapters: { id: string; label: string }[] })`: client; a fixed thin bar showing `useScroll().scrollYProgress` through `useSpring` as a scaleX strip with sprocket-hole styling, chapter tick marks that link to `#id`, and the active chapter (via IntersectionObserver) shown as accent plus `aria-current="true"`. It also serves as the playbook's active-chapter indicator.
- `Nav({ dict, lang })`: server; compact sticky header (`top: env(safe-area-inset-top, 0px)`): name mark, links Story `#ch01`, Projects `#work`, Skills `#skills`, Now `#ch04`, Contact `#credits`, a CV link (lucide `FileDown`) to `/cv-${lang}.pdf`, and `<LangSwitch/>`. On mobile, links collapse into a `<details>` menu (no JS needed).
- `LangSwitch({ lang })`: client; `usePathname()` + `switchLocalePath`, rendering `<Link hrefLang>` with `aria-label` "Mudar para português" / "Switch to English".
- `Placeholder({ description: string, ratio?: string /* '16/9' */, tone?: 'paper'|'ink' })`: server; a framed box with `role="img"` and `aria-label={description}`, a lucide `ImageIcon`, a mono "IMAGE" label and the description as visible text. It never collapses to zero height.

- [ ] **Step 1:** Implement the components; temporarily render two `Scene`s (one paper, one ink) in the stub page.
- [ ] **Step 2:** `pnpm lint && pnpm build`. Expected: both pass.
- [ ] **Step 3:** Browser check (`pnpm dev`, /en and /pt): the background crossfades between the scenes, the strip fills on scroll, Tab reaches every nav link with a visible focus ring, the language switch keeps the path, and no horizontal scroll at 375px.
- [ ] **Step 4:** Commit `feat: site shell with nav, film strip and scene backdrop`.

---

### Task 4: Hero title card and letterbox exit

**Files:**
- Create: `components/scenes/HeroScene.tsx`
- Modify: `app/[lang]/page.tsx` (start composing the home page from scenes), `dictionaries/*.json` (`hero.*`)

**Interfaces:**
- `HeroScene({ dict: Dictionary['hero'], lang: Locale })`: client. The outer container is about `200vh` tall; inside, a `sticky top-0 h-[100svh]` panel. `useScroll({ target, offset: ['start start','end start'] })` maps progress to: letterbox bars `scaleY` 0→1 (each bar up to 12vh), title `scale` 1→0.92, `letterSpacing` 0→0.04em, opacity 1→0 over the last 30%. The section's `Scene` is `stock="paper"`, and an ink panel follows (Task 5 starts ink).
- Copy: eyebrow "Ruben Costa · Full-stack developer", the headline (Global Constraints), the subline "Open to my first developer role." / "Disponível para a minha primeira função como programador.", primary CTA "Start the story" → `#ch01`, secondary "Skip to the work" → `#work`, tertiary CV link. A slate detail in mono: `SCENE 00 · TAKE 1 · ${lang.toUpperCase()}`. The hero portrait `Placeholder` uses the spec §7 description.
- When `useReducedMotion()` is true, render the panel statically (no tall container, no bars).

- [ ] **Step 1:** Implement it and compose it into `page.tsx`.
- [ ] **Step 2:** `pnpm test && pnpm build`. Expected: pass (dictionary parity included).
- [ ] **Step 3:** Browser: the first frame shows name, role, headline and CTAs without scrolling at 375×667 and 1440×900; scrolling closes the letterbox smoothly; with DevTools reduced-motion emulation, the panel is static.
- [ ] **Step 4:** Commit `feat: hero title card with letterbox scroll exit`.

---

### Task 5: Chapters 01–03 (attempts, the server, self-made)

**Files:**
- Create: `components/scenes/AttemptsScene.tsx`, `components/scenes/ServerScene.tsx`, `components/Chapter.tsx`, `components/AttemptCounter.tsx`
- Modify: `app/[lang]/page.tsx`, `dictionaries/*.json` (`ch01`, `ch02`, `ch03`)

**Interfaces:**
- `Chapter({ number: string /* '01' */, title: string, when: string, nod: string, children })`: server; the editorial layout: mono slate (`CHAPTER 01 · AGE 12–15`), large condensed title (Archivo `font-stretch: 75%`), a small italic nod line, and body text at most `65ch`, using the milestone shape from the playbook §4 (what happened / why it mattered / learned / what came next) as paragraphs, not labels.
- `AttemptCounter({ value: number, final?: boolean })`: client; a mono `ATTEMPT #n` that rolls its digit with `AnimatePresence` (y-slide) when `value` changes. With `final`, it reads "SAVE POINT".
- `AttemptsScene({ dict })` (ch01, `stock="ink"`): about `250vh` tall with a sticky panel; three attempt cards ("Server with friends · never shipped" ×3, text in the dict, with no invented server names) stack and drop away (`y`, `rotate`, `opacity` from `useTransform`); the counter goes 1→3, then "SAVE POINT" + the Re:Zero nod "Starting from zero." Body copy per spec §3.
- `ServerScene({ dict })` (ch02, `stock="ink"`): about `300vh` with a sticky panel in three beats from progress `[0,.33,.66,1]`: (1) one Discord-like channel list mock in HTML/CSS (generic `#general`, no real usernames), (2) two bot "messages" slide in (moderation, community engagement; one bot named Emilia-Tan), (3) the panel frames into a browser window with the `Placeholder` "The old Animes Cold informative website". Title card nod (Social Network): "You don't build a community alone. Sometimes you build the bots too." Also give the counter's `#2` context in the copy: AniColds (2024), "an earlier attempt at a web app for the community". No member counts.
- Ch 03 "Self-made" (`stock="paper"`, server, `Chapter` + `Reveal`): self-taught + curso profissional → the PathPals PAP (2024) as the first full-stack app → the CTeSP at IPCB, finishing the last subject (course name as a visible "TBD" placeholder) → the hard problem shown as the visible `TBD — Ruben to write` marker. Spider-Man nod: "No mentor, no kit. Just a homemade suit and a lot of trial and error." Placeholder: the PathPals PAP image (spec §7).
- Both pinned scenes fall back to stacked static content under reduced motion.

- [ ] **Step 1:** Implement and compose (order: hero, ch01, ch02, ch03).
- [ ] **Step 2:** `pnpm test && pnpm build`. Expected: pass.
- [ ] **Step 3:** Browser: each scene scrubs both ways with no jumps at 375 and 1440 px; keyboard PageDown passes through without traps; reduced motion shows all beats stacked; all text is visible with JS disabled (DevTools → Disable JavaScript).
- [ ] **Step 4:** Commit `feat: story chapters 01-03 with pinned attempt and server scenes`.

---

### Task 6: The work reel (homepage)

**Files:**
- Create: `components/scenes/WorkReel.tsx`, `components/ProjectReel.tsx`, `components/StatusChip.tsx`
- Modify: `app/[lang]/page.tsx`, `dictionaries/*.json` (`work.*`)

**Interfaces:**
- Consumes: `projects`, `Project`, `L` from `content/projects.ts`.
- `StatusChip({ tone, label })`: server; pill with a lucide icon per tone (`CheckCircle2` done, `Hammer` progress, `FlaskConical` beta) **and** text, so status isn't shown by color alone.
- `ProjectReel({ project, lang, index })`: client; one sticky full-height panel per project inside a `WorkReel` container about `(projects.length * 120)vh` tall. It shows the slate `REEL 0{reel} · {TITLE} · {period}`, the title, the summary, `StatusChip`, up to 4 technology names, and the cover `Placeholder` with parallax (`y` −8%→8%) plus gallery placeholders that drift at a different rate. Links: "Read the case study" → `/${lang}/projects/${slug}` (primary), plus "Live demo" (lucide `ExternalLink`) if `demoUrl`, "Source" (lucide `Github`) per `repoUrls`; if neither exists, the muted text "Demo and source not public" / "Demo e código não públicos". A section intro title "The work" sits above with a skip-friendly list of the 4 titles as anchor links.
- GeekHatch panel payoff (spec §6 item 5): its slate line reads "The server grew up." and its frame reuses the ch02 channel-list motif scaled into the cover frame (a `layoutId` is not needed; a static echo is fine).
- Reduced motion: panels are stacked, not sticky.

- [ ] **Step 1:** Implement and compose (after ch03), `Scene id="work" stock="ink"`.
- [ ] **Step 2:** `pnpm test && pnpm build`. Expected: pass.
- [ ] **Step 3:** Browser: the order is PathPals → Manager → Budget Builder → GeekHatch; no source link is rendered for the three private projects (inspect the DOM); the case-study links resolve (404 until Task 7 is fine); the nav "Projects" lands on the reel intro.
- [ ] **Step 4:** Commit `feat: project reel on the homepage`.

---

### Task 7: Case-study pages and the 404

**Files:**
- Create: `app/[lang]/projects/[slug]/page.tsx`, `app/[lang]/not-found.tsx`, `app/[lang]/[...missing]/page.tsx`, `components/CaseSection.tsx`
- Modify: `dictionaries/*.json` (`common.tbd`, `notFound.*`, case-study headings)

**Interfaces:**
- `projects/[slug]/page.tsx`: `export const dynamicParams = false`; `generateStaticParams()` returns the 4 slugs (the layout supplies `lang`); `generateMetadata` gives the title `${project.title} · Ruben Costa` and the summary as description; it calls `notFound()` when `getProject` misses. The layout follows the playbook §5 template: header (title, one-line summary, Type / Status / Role "Designed and built everything" only where spec §2 says personal / Timeline / Live demo / Source, or "not public"), then `CaseSection` for The idea · The challenge · My approach · Implementation · Technology (name + how) · The result · What I learned, then the gallery placeholders, then "Next reel →" linking to the next project (GeekHatch → back to `/${lang}#work`).
- `CaseSection({ heading, body: string | null, tbdLabel })`: server; renders `body` paragraphs, or when `null` a dashed box with lucide `PenLine` and `tbdLabel`. Wrap it in `Reveal`.
- `[...missing]/page.tsx`: calls `notFound()`. `not-found.tsx` (Return by Death nod): mono "YOU DIED", the line "Returning to the last save point…" / "A regressar ao último ponto de gravação…", and a home link to `/${lang}`. Under cacheComponents, read `lang` via `next/root-params`.

- [ ] **Step 1:** Implement.
- [ ] **Step 2:** `pnpm test && pnpm build`. Expected: pass; build output lists 8 project pages (4 × 2 locales).
- [ ] **Step 3:** Browser: `/en/projects/manager` shows demo + 2 repos; `/pt/projects/geekhatch` shows the demo, "Código não público", and TBD boxes for the null fields; `/en/projects/nope` and `/pt/whatever` show the 404 with a working home link; the language switch on a case study keeps the slug.
- [ ] **Step 4:** Commit `feat: case-study pages and Return by Death 404`.

---

### Task 8: Skills, off-screen, ch 04 and credits

**Files:**
- Create: `components/SkillsSection.tsx`, `components/OffScreen.tsx`, `components/BrandNewDay.tsx`, `components/scenes/Credits.tsx`, `components/CopyEmail.tsx`
- Modify: `app/[lang]/page.tsx`, `dictionaries/*.json` (`skills`, `offscreen`, `ch04`, `credits`)

**Interfaces:**
- Consumes: `skills`, `projects`.
- `SkillsSection({ dict, lang })` (`stock="paper"`, server): 4 groups from `skill.group`; each skill shows its label as text ("Used in projects" / "Familiar" / "Learning") plus evidence links to `/${lang}/projects/${slug}` by project title. No percentages or meters. A one-line intro on evidence over claims.
- `OffScreen({ dict })` (`stock="paper"`): title "You are not your code." (Fight Club nod), 2–3 short sentences about games, anime and films (from the GitHub README: movies/series and video games; anime is the Animes Cold/GeekHatch thread), and the collage `Placeholder` (spec §7). No invented specifics such as favourite titles beyond the four references Ruben named.
- `BrandNewDay({ dict })` (`stock="paper"`, ch 04): "Brand new day." (Spider-Man nod), looking for a first full-stack role, finishing the CTeSP's last subject, now building Budget Builder and the GeekHatch beta, and "What I want to learn next" as a TBD marker. Workspace `Placeholder`.
- `Credits({ dict, lang })` (`stock="ink"`, client): a sticky panel; credit lines roll up (`y` 40%→−40% from scroll progress). "Written, directed and built by Ruben Costa", then the role groups as credit pairs: Email (shown as selectable text + `CopyEmail` button, plus a `mailto:` link), GitHub, LinkedIn, CV. The last line nods to the films: "No Minecraft servers were harmed in the making of this site." Reduced motion: static list.
- `CopyEmail({ email, labels })`: client; `navigator.clipboard.writeText` inside the click, showing "Copied" for 2s; on rejection, select the text.

- [ ] **Step 1:** Implement and compose (order: …work, skills, offscreen, ch04, credits).
- [ ] **Step 2:** `pnpm test && pnpm build`. Expected: pass.
- [ ] **Step 3:** Browser: every evidence link resolves; the email is selectable and the copy button works; the credits roll is readable at 375px.
- [ ] **Step 4:** Commit `feat: skills, off-screen, now and credits sections`.

---

### Task 9: Metadata, CV, accessibility and motion pass, final verification

**Files:**
- Create: `app/[lang]/opengraph-image.tsx` (OG title card from `next/og`: "Ruben Costa · Full-stack developer" on ink with the accent rule), `public/cv-en.pdf` (copied from the old repo)
- Modify: `app/[lang]/layout.tsx` (`generateMetadata`), `components/Nav.tsx` (PT CV fallback)

**Interfaces:**
- `generateMetadata` per locale: title "Ruben Costa · Full-stack developer" / "Ruben Costa · Programador full-stack"; description from `dict.hero`; `alternates.languages` `{ en: '/en', pt: '/pt' }`; `openGraph` locale `en_US` / `pt_PT`.
- CV: `gh api repos/Ice-San/webportfolio/contents/public/cv.pdf --jq .content | base64 -d > public/cv-en.pdf`. Until `public/cv-pt.pdf` exists, the PT nav links to `/cv-en.pdf` (a `ponytail:` comment names the upgrade).

- [ ] **Step 1:** Implement metadata, OG and CV.
- [ ] **Step 2:** `pnpm test && pnpm lint && pnpm build`. Expected: all pass, no warnings about dynamic params or missing Suspense.
- [ ] **Step 3: Full browser pass** (`pnpm build && pnpm start`) at 375, 768 and 1440 px, in each of: normal; reduced motion (DevTools emulation); JS disabled; keyboard only. Check: no horizontal scroll; every interactive element has a visible focus state; heading order h1 → h2 → h3 (one h1 per page); every `Placeholder` exposes its description; the console has no errors; `/cv-en.pdf` downloads; `/` redirects by Accept-Language.
- [ ] **Step 4:** Grep the built output for the forbidden strings: `grep -riE "pathpals-next|932 099 733|rubenoliveiracosta|instagram" .next/server/app` returns nothing.
- [ ] **Step 5:** Commit `feat: metadata, OG image, CV and final a11y pass`.
