# CLAUDE.md

Personal developer portfolio — single-page, animation-heavy. Owner: **Srikar Chinthala** (`$r!k@r`). Built around scroll-driven GSAP timelines, a Lenis smooth-scroll wrapper, and a Matter.js physics playground.

---

## Commands

```bash
npm run dev     # next dev on port 3000
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint (flat config)
```

Root of the app is the `my.asset/` folder (run all commands there).

---

## Tech Stack

| Layer            | Choice                                             |
|------------------|----------------------------------------------------|
| Framework        | Next.js **16** (App Router) + React **19.2**       |
| Language         | TypeScript 5 (`strict: true`)                      |
| Styling          | Tailwind CSS **v4** (CSS-first, `@import "tailwindcss"`) |
| Animation        | GSAP 3.13 + `@gsap/react` (`useGSAP`), ScrollTrigger, DrawSVGPlugin, TextPlugin, Flip |
| Smooth scroll    | Lenis 1.3 (driven by GSAP ticker)                  |
| Physics          | matter-js 0.20 (math only, no canvas renderer)     |
| Icons            | lucide-react                                       |
| Contact form     | `@emailjs/browser` (client-side; keys in `.env.local` as `NEXT_PUBLIC_EMAILJS_*`) |
| 3D (installed)   | three, @react-three/fiber, @react-three/drei — *not yet used in components* |
| Fonts            | `next/font/google` → **Montserrat** (`--font-fredoka`, body) + **Unica One** (`--font-display`, huge hero words) + **DM Mono** (`--font-mono`, labels) |
| Images           | next/image, remote hosts `res.cloudinary.com`, `images.unsplash.com` (`remotePatterns`) |

Domain `srikar.dev` (package name + SEO metadata).

---

## Architecture

App Router, nested layouts:

```
app/
  layout.tsx            # root: <html>, Montserrat font var, SmoothScrollProvider,
                        #   #smooth-wrapper > #smooth-content, all SEO metadata
  globals.css           # Tailwind import + theme tokens + body/scrollbar styles
  (root)/
    layout.tsx          # pass-through fragment (route-group layout)
    page.tsx            # the single page — composes all sections
```

`(root)/page.tsx` renders the whole site in order:
`HeroSection → Projects → AboutMe → MyCapabilities → Footer`.

### Providers
- `providers/ScrollSmoothProvider.tsx` — instantiates Lenis (`lerp: 0.1` frame-rate-independent smoothing — lighter/snappier than a long fixed duration, avoids "stuck" feel near pins), pumps it from `gsap.ticker`, disables `lagSmoothing`, syncs `ScrollTrigger.update` on scroll, and `ScrollTrigger.refresh()` on rAF + `load`. Exposes `useLenis()` so any component can `lenis.stop()/start()/scrollTo()`. Wraps children in `#smooth-wrapper > #smooth-content`.
- Scroll-smoothness rule: avoid tiny/redundant pins (a since-removed `+=100` "pause" pin in Skills and `anticipatePin` in Projects both caused stutter with Lenis). Keep pins meaningful; prefer `scrub` + `invalidateOnRefresh`.
- Refresh/misplacement: the provider forces `history.scrollRestoration = "manual"` + jump-to-top on every load (browsers otherwise restore scroll BEFORE pins/sticky are measured → elements misplace), calls `ScrollTrigger.refresh()` after rAF, `window load`, and `document.fonts.ready` (font swap shifts layout), and sets `ScrollTrigger.config({ ignoreMobileResize: true })`. `globals.css` includes the official Lenis CSS (`html.lenis…`) to stop native/smooth-scroll conflicts. If you add pinned/sticky content, rely on these — don't add ad-hoc refresh hacks.

### Data (content lives separately from components)
- `data/projects.ts` — hackathon `Project[]` (title, description, category, `type: "website" | "app"`, Cloudinary image URLs, github/live urls, techStack, bgImage, achievement). Default export.
- `data/freelance.ts` — `FreelanceProject[]` (name, category, role, summary, href, `image` = `/freelance/<file>.png` placeholder, accent). Default export. Screenshots go in `public/freelance/`; empty `image` → accent-gradient placeholder card.
- `data/capabilities.ts` — `TABS` array for the physics section. Each item is a discriminated union `{ kind: 'tag' | 'emoji', data }`. Three tabs: Core Capabilities, Tech Stacks, Services.

### Components (`components/`)
| File | Role |
|------|------|
| `HeroSection.tsx` | Reference-matched hero (font = **Unica One** via raw `var(--font-display)` — NOT the `@theme inline` token, which isn't emitted as a CSS var). Curly braces (`LeftBrace`/`RightBrace`) frame HELLO!+intro upper-center and **draw themselves in via DrawSVGPlugin** (`drawSVG 0%→100%`, "rendering"). **One `flex-wrap` row** holds `creative` · image · `Dev`: `creative` is `basis-full` on mobile (own line) → `basis-auto` on desktop (image lands in the `justify-between` gap "between" the words); mobile wraps to `[image · Dev]`. Words = white fill + swept **yellow `-webkit-text-stroke`** outline; **hovering a word is magnetic** (`gsap.quickTo` inner x/y follows cursor, clamped, springs back). Intro (CustomEase `hero`): chrome fade → braces draw → ABOUT stagger → image scale-in → words rise. **Scroll** → hero **pinned** (`+=140%`), text frozen, image measured-expands to **full screen** (`imageMouseRef`→centre + `imageFloatRef` scale→cover, `borderRadius`→0; `onRefresh`/`invalidateOnRefresh`; float paused while expanding). Projects per-section pins had `anticipatePin` removed (smooth-scroll stutter fix). |
| `Navbar.tsx` | `forwardRef`. Desktop link row + mobile fullscreen overlay with animated hamburger. Uses `lenis.scrollTo` for in-page nav, gates scroll while menu open. Drives `NavTransitionOverlay`. |
| `NavTransitionOverlay.tsx` | `forwardRef` + `useImperativeHandle` exposing `run(onMidpoint)`. Slides a "Loading" panel up from bottom, fires the scroll at midpoint, slides away. |
| `Projects.tsx` | Hackathon projects. **Native sticky stacking** (each card wrapper `sticky top-0 h-screen`, increasing z-index → next slides up over previous; no GSAP pin = smooth). Depth: each card scrub-scales/fades as the next covers it (triggered off the untransformed `wrapperRefs`, not the animated card). Fixed counter pill + SVG progress ring driven by scrub/enter triggers (also off wrappers). |
| `FreelanceWork.tsx` | Freelance section (`data/freelance.ts`). **Sticky stacked "pages"**: each project is a `sticky top-0 h-screen` panel with rounded top + shadow and increasing `z-index`, so the next screen slides up and sits on top of the previous (native sticky → smooth with Lenis, no pin glitch). Per-panel GSAP reveal on enter (`start top 60%`, once): card rises/scales in, info (`.fw-rise`) staggers up. Card left, info right (name in **Montserrat `font-black`** to match the hackathon `ProjectSection` titles — Unica One is hero-only — `[OPEN]`, mono category/role, summary, VISIT SITE). Accent gradient card = placeholder; real screenshots at `p.image` (`/creonex.png`, `/nala-armoire.png`, `/treekart.png`) overlay it, `onError`-hidden if missing. |
| `ProjectSection.tsx` | `forwardRef`. Big per-project card: blurred bg layer, category strip, title/desc/links entry timeline, and an `ImageStack` of phone (`AppFrame`) or browser (`WebFrame`) mockups that auto-cycle via GSAP **Flip**. Separate desktop/mobile stacks. |
| `MyCapabilities.tsx` | Matter.js physics stage. Tags/emojis drop in as DOM divs positioned by physics each tick (GSAP ticker drives `Matter.Engine.update`); pointer-drag, IntersectionObserver pause, tab switching clears+respawns bodies. Pinned briefly on scroll-enter. |
| `AboutMe.tsx` | Scroll-triggered reveal: vertical line grows, heading animates word-by-word, paragraphs + stat chips stagger in. Static `PARAGRAPHS`/`STATS` arrays inline. |
| `Contact.tsx` | `id="contact"` (nav Contact + footer CTA scroll here). EmailJS contact form (`@emailjs/browser` `sendForm`): fields `from_name` / `reply_to` / `message` (match the EmailJS template vars). Keys from `NEXT_PUBLIC_EMAILJS_{SERVICE_ID,TEMPLATE_ID,PUBLIC_KEY}` in `.env.local`. AboutMe-style reveal; idle/sending/success/error states; minimal underline inputs. |
| `Footer.tsx` | Reference-matched: big tagline → braced (DrawSVG) "LET'S WORK TOGETHER ↗" mailto CTA → animated divider → mono meta row (email, INSTAGRAM, LINKEDIN / live **IST clock** `Asia/Kolkata`, BACK TO TOP via `useLenis().scrollTo(0)`, DESIGNED BY) → giant full-bleed **SRIKAR DEV** name (Montserrat `font-bold`, `text-[16.5vw]`, negative-margin break-out, clip-reveal up). Scroll-triggered reveal timeline (`once`). |
| `Button.tsx` | Shared brace-wrapped button/link. Renders `<Link>` when `href` given, else `<button>`. Wraps content in `LeftBrace`/`RightBrace`. (Interface is named `BraceButtonProps`; default export `Button`.) |
| `LeftBrace.tsx` / `RightBrace.tsx` | SVG `{` / `}` glyphs. Accept `pathRef` so DrawSVGPlugin can animate the stroke; `color`/`visibility` props. |

---

## globals.css

`app/globals.css` — Tailwind v4 CSS-first config (no `tailwind.config.js`).

```css
@import "tailwindcss";
```

### Theme tokens
`:root` defines raw vars; `@theme inline` maps them into Tailwind's color/font namespace so utilities like `bg-background`, `text-foreground`, `text-primary` work.

| Token | Value | Notes |
|-------|-------|-------|
| `--background` | `#0a0a0a` | near-black, dark theme |
| `--foreground` | `#ededed` | off-white text |
| `--primary` | `#6366f1` | indigo accent |
| `--border` | `#27272a` | |
| `--border-focus` | `var(--primary)` | |
| `--font-family-sans` | `var(--font-fredoka), system-ui, …` | Montserrat under the hood |

`--surface` (`#18181b`), `--accent` (`#818cf8`), `--gray-600` (`#52525b`), and `--glow-purple` (box-shadow) are also defined — used by `@theme inline` and the scrollbar styles.

### Body
Dark bg/fg, Montserrat, `line-height: 1.6`, font smoothing, and **`text-transform: uppercase` globally** — the whole site renders uppercase by default. Custom `::-webkit-scrollbar` (10px, primary-colored thumb on hover). Commented-out `cursor: none`.

### Utilities
```css
@layer utilities { .common-padding { @apply px-5 py-5; } }
```
`common-padding` is the standard section gutter used across sections.

---

## Conventions & gotchas

- All animated components are `'use client'`; register GSAP plugins at module top (`gsap.registerPlugin(...)`).
- Always wrap GSAP in `useGSAP(() => {...}, { scope: ref })` and return cleanup that kills timelines / ScrollTriggers.
- To control scroll programmatically use `useLenis()` — never raw `window.scrollTo` for smooth motion (Lenis owns scroll).
- Section anchors for nav: `#about` (AboutMe), `#work` (Projects), `#skills` (MyCapabilities), `#contact` (Footer).
- Path alias `@/*` → project root (`tsconfig.json`).
- Remote images must come from a host in `next.config.ts` `images.remotePatterns` (`res.cloudinary.com`, `images.unsplash.com`); add hosts there before using new sources.
- Hero display font is `--font-display` (Unica One, condensed — matches reference); labels use `--font-mono` (DM Mono). Hero overrides the global uppercase with `normal-case` so `creative`/`Dev` keep their casing.
- Physics tags read inline styles, not Tailwind — colors live in `data/capabilities.ts`.
- `public/` is expected to hold `favicon.ico`, `og-image.png`, `github.svg`.
