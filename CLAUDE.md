# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (output: dist/)
npm run lint      # ESLint
npm run preview   # Preview the production build locally
npm run deploy    # Build + deploy to GitHub Pages (gh-pages -d dist)
```

There is no test suite. Verify UI changes manually in the browser.

## Architecture

This is a single-page React 19 + Vite portfolio. The entire page is one scrollable document with four `<section>` elements (`#about`, `#resume`, `#projects`, `#contact`). A fixed floating `Navbar` at the bottom syncs its active tab with scroll position via `IntersectionObserver` in `App.jsx`. Clicking a tab calls `scrollIntoView` and temporarily blocks the observer via `isScrollingRef` to prevent the tab from flickering during programmatic scrolls.

**Page sections (rendered in `App.jsx`):**
- `Branding` — hero with profile photo, stats, mouse-tracking spotlight
- `AboutMe` — bio text + tech stack grid, uses `Branding` and `ContextBox`
- `Resume` — work/education timeline
- `Projects` — filterable grid driven by `src/projects.json`
- `Contact` — links and contact form

**Key shared primitives:**
- `ContextBox` (`src/utility/context-box.jsx`) — the glassmorphic `<div>` wrapper used for all content cards. Accepts a `level` prop (1–3) to pick the blur intensity.
- `cn()` (`src/lib/utils.js`) — `clsx` + `tailwind-merge` helper; always use it for conditional Tailwind class lists.
- `AnimatedThemeToggler` — fixed top-right button; toggles `.light` on `document.documentElement` and persists to `localStorage`.

**Project data** lives entirely in `src/projects.json` (array of objects with `title`, `category`, `description`, `tech`, `github`, `live`, `image`). Add new projects there; images go in `public/`.

## Design System

Theme is CSS-variable based. Default is dark; `.light` on `<html>` activates light overrides. All semantic color tokens (`--accent-primary`, `--bright-text`, `--gray-text`, `--card-border`, etc.) are defined in `src/index.css` under `:root` and `.light`.

**Glassmorphism classes** (also in `index.css`):
- `.glass-level-1` / `.glass-card` — subtle (8px blur)
- `.glass-level-2` — medium (16px blur)
- `.glass-level-3` — premium (24px blur)

GPU performance is intentional: avoid `box-shadow` on hover, avoid animating `all`, use only `transform` and `opacity` in transitions.

**Typography:** JetBrains Mono (self-hosted via `src/assets/fonts/`) is the single font for both headings and body. `heading-font` Tailwind class applies it to non-heading elements.

**Vite base path** is `/personal-portfolio/` — keep this in mind when referencing public assets (use relative `./asset.ext` paths, not absolute).

## Coding Patterns

- Components are arrow functions exported as default; `PropTypes` used for prop validation.
- Use the `@` alias for all imports from `src/` (e.g., `import { cn } from "@/lib/utils"`).
- **Animations:** Framer Motion for entry/hover animations; GSAP for complex timeline sequences.
- **Tailwind v4** syntax — no `tailwind.config.js`; configuration is done via `@theme` in `index.css`.
- Always use `cn()` when merging or conditionally applying Tailwind classes.
- Check both `.light` and default (dark) states when touching colors or backgrounds.
