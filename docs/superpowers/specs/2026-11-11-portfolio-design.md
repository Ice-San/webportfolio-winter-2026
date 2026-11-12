# Ruben Costa — Cinematic Portfolio · Design

Date: 2026-11-11 · Status: **approved 2026-11-11** · Source brief: `portfolio-redesign-playbook.md` (the playbook)

Legend: **[Ruben]** = decided by Ruben in the brainstorm. **[Claude]** = builder's call, open to change. **TBD** = needs Ruben's answer (see §10).

---

## 1. Intent

A bilingual (EN/PT) portfolio that tells how Ruben became a full-stack developer as a **film**: title card → chapters → the work → end credits. It follows the playbook's structure and honesty rules (no invented facts, evidence over claims) but turns the motion up to "cinematic" while keeping native scrolling. **[Ruben]**

Audience: recruiters and teams hiring a **first developer role** (Ruben is looking for one). **[Ruben]** A recruiter must be able to skip the film and land on the projects in one click.

### Goals
- Within seconds a visitor sees: Ruben Costa, full-stack developer, open to a first role.
- The story runs from the Animes Cold Discord server to GeekHatch, told truthfully. **[Ruben]**
- Four featured projects prove the skills, each with a case-study page.
- A smooth, cinematic feel: scroll-scrubbed scenes, pinned sections, parallax, transitions between light and dark. **[Ruben]**
- References to Spider-Man, Subaru Natsuki (Re:Zero), Fight Club and The Social Network, woven into the structure and copy. **[Ruben]**

### Non-goals
- No CMS, database, blog, analytics, contact form or 3D/WebGL.
- No project archive page in v1 (the playbook allows one "if needed"; nothing calls for it yet).
- No deployment changes. This local repo has no remote, and it must **not** be pushed to `Ice-San/webportfolio` or the live Vercel site without asking Ruben.

### Anti-goals (a failure even if it "works")
- Scroll-jacking or a smooth-scroll library. Native scroll only. **[Ruben]**
- Content hidden until an animation finishes, or available only on hover.
- Invented dates, member counts, metrics or motivations.
- Film stills, logos, character art, or quotes longer than a short phrase. References are **nods**, and every image is a placeholder (§7).
- The generic dev look: neon gradients, glowing borders, floating code.

---

## 2. Hard content constraints [Ruben]

- **Featured projects, in this order:** PathPals → Manager → Budget Builder → GeekHatch.
- **PathPals** is presented as the very first full-stack project (the PAP, 2024). **Never mention the new Next.js rebuild (`pathpals-next`)** anywhere: projects, timeline or skills.
- **Code links:** show **no** source links for PathPals, Budget Builder or GeekHatch. Everything else may link to code.
- **Demo links** allowed: GeekHatch (`https://geekhatch.vercel.app`), Manager (`https://manager-front-end.vercel.app`). Budget Builder demo: **TBD**. PathPals has no demo, so it uses the fallback state "Demo and source not public".
- **Status labels:** PathPals: *Completed · School final project (PAP)*. Manager: *Completed* [Claude: repo last pushed 2025-11; confirm]. Budget Builder: *In progress*. GeekHatch: *Beta · access only*.
- **Context:** all four are personal projects (PathPals was also the PAP).
- **Contact:** `rubencosta.dev.2004@gmail.com`, GitHub `https://github.com/Ice-San`, LinkedIn `https://www.linkedin.com/in/devrubencosta/` (found in the old portfolio's source), and a CV download. Instagram is **not** included.
- **Never publish** the phone number or the older email from the PathPals footer.
- Only confirmed dates. Repo creation dates may be used as "≈" periods.

---

## 3. The story (chapter content)

Each milestone follows the playbook's When / What / Why it mattered / Learned / Next shape. Copy below is the **substance**; the final wording gets written during the build and reviewed by Ruben. PT copy is a translation for Ruben to review.

| # | Title (EN) [Claude] | Film nod | When | What happened |
|---|---|---|---|---|
| Hero | "Curiosity brought me here. Building things made me a developer." **[Ruben]** | Opening title card | — | Name, "Full-stack developer", "Open to my first role". |
| 01 | **Starting from zero** | Re:Zero | Age 12–15 **[Ruben]** | Playing Minecraft made him curious how games and servers work. He tried, with friends, to build Minecraft servers, and **none ever shipped**. |
| 02 | **The server** | The Social Network | ≈2022 (repo dates) | He created the **Animes Cold** Discord server, a simple server that grew into a community. He built **two Discord bots** to improve its moderation and community engagement (one is *Emilia-Tan*, named after the Re:Zero character), plus small informative pages in vanilla HTML/CSS/JS, including the Animes Cold website. **[Ruben]** |
| 03 | **Self-made** | Spider-Man (the homemade suit) | Curso profissional → 2024 PAP → CTeSP at IPCB | Self-taught alongside the curso profissional. His PAP, **PathPals** (2024), was his **first full-stack app**, the moment "I can actually do this". **[Ruben]** Then a CTeSP at IPCB, where he is now finishing the last subject **[Ruben]** (exact course name: placeholder). One real hard problem: TBD. |
| Work | **The work** | Each project = a reel | 2024–2026 | Four case studies (§4). The reel ends on GeekHatch: "the server grew up". |
| Off-screen | **You are not your code** | Fight Club ("you are not your job") | — | Who he is outside code: games, anime, films (including these films). Short. **[Ruben]** |
| 04 | **Brand new day** | Spider-Man: Brand New Day (a fresh start) | Now | Looking for a first role as a full-stack developer; current interests; what he wants to learn next (TBD, but can be derived from GeekHatch/Budget Builder work). |
| End | **Credits** | Film end credits | — | Contact as rolling credits: "Written, directed and built by Ruben Costa", followed by email, GitHub, LinkedIn and CV. |

**Spine [Ruben]:** "A simple Discord server → a community with bots and a website → now a web app, GeekHatch." Chapter 02 sets it up; GeekHatch pays it off.

**Subaru [Ruben: Return by Death = retrying; stubborn for people you care about; starting from zero]:**
- Ch 01 "Starting from zero": the servers that never shipped, framed as attempts.
- A recurring **"Attempt #N"** motif: a small mono counter in the chapter margin that ticks up on scroll at each retry [Claude]: #1 the Minecraft servers → #2 **AniColds** (2024, an earlier attempt at the community web app **[Ruben]**) → GeekHatch, the attempt that ships.
- Being "stubborn for people you care about" frames why he kept building for the Animes Cold community.

**Spider-Man [Ruben: self-made, figuring it out; Brand New Day = fresh start]:** Ch 03 and Ch 04, as above.

---

## 4. Projects

Each project has a homepage reel plus a case-study page, `/[lang]/projects/[slug]`, using the playbook's template (idea, challenge, approach, implementation, technology and how it was used, result, what I learned). Unknown sections show a visible **"TBD — Ruben to write"** placeholder; they are never invented.

| Slug | Name | Type / status | Known facts (from repos) | Links |
|---|---|---|---|---|
| `pathpals` | PathPals | Personal · PAP · Completed (2024) | School-transport app in PHP: students request a ride to school, the school confirms, the trip is done; profiles linked to a school; notifications; a one-tap "ask for help" alert to the school if something dangerous happens on the trip. Sign-in/sign-up, privacy policy, terms and cookie pages. | none (fallback state) |
| `manager` | Manager | Personal · Completed | User management dashboard. React + TypeScript front end with i18n (language context), a users list, add user, stats/KPIs, profile. Express API with JWT auth (`verifyJWT` middleware), bcrypt passwords, PostgreSQL (`pg`, raw SQL), and user create/update/delete/reactivate plus password update. | demo + both repos |
| `budget-builder` | Budget Builder | Personal · In progress | Lets Portuguese contractors (plumbers, electricians, builders) write quotes and email them to clients as PDFs; PT-first with EN. Catalogue of services (unit, price, VAT), clients with NIF check and RGPD erasure, sectioned quotes with live totals that match the DB to the cent, PDF preview, email sent exactly once (idempotent), delivery tracking (sent/delivered/opened) and history. Express + Next.js Turbo monorepo, PostgreSQL in Docker. | demo TBD, no code |
| `geekhatch` | GeekHatch | Personal · Beta (access only) | The anime and manga community: Turbo monorepo (pnpm). Next.js 16 web app, Express 5 + Prisma 7 API on PostgreSQL 18, shared locales package. The browser talks only to the web origin; `/api/*` is rewritten to the API, which refuses requests without a proxy secret. | demo, no code |

The builder fills in more facts by reading each project's docs (local `C:\Users\ruben\Desktop\budgetb`, `…\geekhatch`; GitHub for the others), with read-only access and facts only. Anything subjective ("the hardest part was…") stays TBD for Ruben.

---

## 5. Skills: evidence, not percentages

Grouped (Frontend, Backend, Data, Engineering practices), each with a label (*Used in projects / Familiar / Learning*) and a link to the project that proves it. **[Ruben: used in real projects: React/Next.js, Node/Express/APIs, SQL + ORM]**. Evidence mapping [Claude]: React → Manager, GeekHatch; Next.js → GeekHatch, Budget Builder; Express/APIs → Manager, GeekHatch; JWT/bcrypt auth → Manager; PostgreSQL → Manager, GeekHatch, Budget Builder; Prisma → GeekHatch; PHP/MySQL → PathPals; Turbo monorepos/Docker → Budget Builder, GeekHatch; i18n → Manager, Budget Builder, this site. Anything not proven stays off the list or gets the *Familiar* label (Ruben to confirm the labels).

---

## 6. Look and motion

### Visual system [Ruben: hybrid] [Claude: specifics]
- **Two "film stocks":** *Paper* (warm off-white `#F3EEE5`, charcoal text `#1F1D1A`) for the journal and story text; *Ink* (near-black `#0F0E0D`, text `#EDE7DC`) for cinema set pieces (hero exit, Ch 02 server scene, the projects reel, credits). The page background crossfades between them as scenes enter, driven by scroll.
- **Accent:** burnt orange `#C4561C` (lighter `#E07A3F` on Ink, checked for AA contrast). Used sparingly.
- **Type:** an expressive variable sans with a width axis for title cards (e.g. *Archivo*, condensed and expanded) for headings and body; *JetBrains Mono* for dates, labels, the attempt counter and "scene" slates. Loaded with `next/font`.
- **Texture:** a subtle static film-grain overlay (CSS/SVG noise) on Ink scenes only. Optional letterbox bars.
- Strong grid, generous whitespace, readable measure (~65ch) for story paragraphs.

### Motion [Ruben: cinematic, native scroll] [Claude: choreography]
Library: **framer-motion** (`useScroll`, `useTransform`, `useSpring`, `motion`, `AnimatePresence`, `MotionConfig`). Icons: **lucide-react**. **[Ruben]**

Set pieces (only these are scroll-scrubbed; everything else uses one shared fade/slide entrance):
1. **Hero → letterbox:** as you scroll past the hero, black bars close in from top and bottom and the title scales and tracks out, crossfading into Ink.
2. **Ch 01 attempts:** pinned; three "attempt" cards for the server tries stack and fall away, and the counter ticks `#1 → #3`, landing on "save point".
3. **Ch 02 server → community:** a pinned scene in three beats tied to scroll progress (one channel → bots join → the website), with the Social Network nod as a title card.
4. **The work reel:** each project gets a pinned "reel" panel with parallax screenshot placeholders, a slate (`REEL 01 · PATHPALS · 2024`) and its status chip. Projects advance as you scroll.
5. **GeekHatch payoff:** the Ch 02 server icon morphs into the GeekHatch frame ("the server grew up").
6. **Credits:** contact lines roll up, with the scroll position driving the roll.

Global: compact sticky nav (Story · Projects · Skills · Now · Contact · CV · EN/PT), a **film-strip scroll progress bar** with chapter markers that also serves as the active-chapter indicator, and page transitions into case studies.

**Reduced motion:** `MotionConfig reducedMotion="user"`, and pinned scenes fall back to static stacked layouts (no pinning, no scrub). Content is fully readable with JS off and animations disabled: scenes render their final state in HTML, and motion only enhances it. Keyboard focus is visible everywhere.

---

## 7. Image placeholders

One `Placeholder` component: a framed box at a fixed aspect ratio that shows a mono label "IMAGE" and a **description of what should go there**, used as the accessible description. Initial list [Claude]:

| Where | Description to show |
|---|---|
| Hero | Portrait of Ruben, cinematic side-lighting, warm tones, at his desk or in a doorway |
| Ch 01 | Minecraft screenshot from back then: a half-built server spawn with friends |
| Ch 02 | Screenshot of the Animes Cold Discord server: channels list and bot messages (crop out usernames) |
| Ch 02 | Emilia-Tan bot responding to a command |
| Ch 02 | The old Animes Cold informative website |
| Ch 03 | PathPals PAP presentation day, or the PathPals home screen |
| Each project | Cover screenshot plus 2–3 gallery shots (specific per project, e.g. "Budget Builder: quote builder with live totals") |
| Off-screen | Collage: games, anime shelf, film posters (personal photo, not official art) |
| Ch 04 | Workspace at night, monitor glow |
| OG image | 1200×630 title card: "Ruben Costa · Full-stack developer" in the site's type |

---

## 8. Technical shape

- **Stack:** Next.js 16.4 (App Router, already scaffolded), React 19, Tailwind CSS 4 (already installed), TypeScript, plus `framer-motion` and `lucide-react`. No other dependencies. **[Ruben for motion/icons; Claude for no others]**
- **i18n (per Next 16 docs `02-guides/internationalization.md`):** `proxy.ts` redirects `/` by `Accept-Language` to `/en` or `/pt`, and all routes live under `app/[lang]`. Dictionaries are `dictionaries/en.json` and `pt.json`, loaded server-side with `generateStaticParams` for both locales. The language switch is a link to the same path in the other locale. No i18n library.
- **Content:** UI strings and story copy in the dictionaries; projects as structured data (`content/projects.ts`, fields from the playbook's model, localized text keyed by locale). Repeated layouts are components, not hand-written blocks.
- **Client JS:** only motion components are client components; text renders on the server.
- **SEO:** per-locale title/description, Open Graph, `hreflang` alternates, favicon, OG placeholder image.
- **Routes:** `/[lang]` (home), `/[lang]/projects/[slug]` (4 case studies), plus a not-found page (a tiny Return by Death nod: "You died. Returning to the last save point…" with a home link) [Claude].
- **CV:** `/cv-en.pdf` and `/cv-pt.pdf` slots in `public/`. Reuse the old portfolio's `cv.pdf` as `cv-en.pdf` for now **[Ruben]**; the PT slot is a placeholder.

---

## 9. Done means

- `pnpm build` and `pnpm lint` pass with no console errors.
- A small check script asserts that `en.json` and `pt.json` have identical keys, and that no featured project has a source link when its slug is pathpals, budget-builder or geekhatch.
- Manually verified in the browser at 375 / 768 / 1440 px, with reduced motion on and off, and keyboard-only navigation.
- Every placeholder and TBD is visibly marked, so none can ship unnoticed.

---

## 10. Answered 2026-11-11 / still open

- CTeSP: finishing the last subject (the course name stays a placeholder).
- AniColds: yes, it's Attempt #2.
- CV: reuse the old `cv.pdf`.
- **Still open (placeholders until answered):** Ch 03's hard problem; Budget Builder demo URL; whether to make the PathPals repo private (Ruben's call; the site never links it).
