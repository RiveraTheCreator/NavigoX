# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NavigoX is a single-page marketing/landing site (Spanish copy) for a platform connecting tourists with local operators via hotel reception desks (WhatsApp-based recommend/book/charge/settle/learn flow). It is currently a marketing site with a waitlist signup, not the product itself.

## Commands

- `npm run dev` — start Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run `next lint`
- Linting also has an oxlint config (`.oxlintrc.json`, react + oxc plugins); there is no separate npm script for it, run via `npx oxlint` if needed.
- No test suite exists in this repo.
- Docker: `docker-compose up --build` builds and serves the app natively on port 3000 (multi-stage `Dockerfile`, Node 20 alpine, runs `next start`).

## Architecture

This is a Next.js App Router project, but nearly all of the site lives in two files:

- `app/layout.jsx` — root HTML shell, metadata, Google Fonts (`Inter`, `Roboto`, `Cormorant Garamond`, `IBM Plex Mono`), and an SVG noise-overlay filter applied globally.
- `app/page.jsx` — the entire page (~570 lines), a single `"use client"` component tree with no sub-directories/component library. Section components (Navbar, Hero, Features, Philosophy, Protocol, GettingStarted, Footer, WaitlistModal) are all defined inline in this one file in rendering order. When adding a new section, follow this file's existing pattern rather than introducing a `components/` structure unless asked.
- `app/globals.css` — Tailwind layers plus CSS custom properties for the color system (`--color-primary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-dark`, defined as RGB triples) consumed via `tailwind.config.js`'s `rgb(var(--color-x) / <alpha-value>)` pattern. Also defines custom utility classes used throughout `page.jsx`: `.magnetic-btn` / `.hover-slide-bg` (button hover fill animation), `.link-hover`, `.font-drama` / `.font-mono-data` (extra font families outside the Tailwind `fontFamily` config).

### Animation conventions

All scroll/entrance animations use GSAP + ScrollTrigger, registered once at the top of `page.jsx`. The convention throughout is:
```js
useEffect(() => {
  let ctx = gsap.context(() => { /* animations scoped to a ref */ }, containerRef);
  return () => ctx.revert();
}, []);
```
Follow this `gsap.context`/`revert` cleanup pattern for any new animated section to avoid leaking ScrollTrigger instances on unmount.

### Waitlist form

`WaitlistModal` in `app/page.jsx` posts form data directly from the client to a hardcoded n8n webhook URL using `fetch(..., { mode: 'no-cors' })`. Because of `no-cors`, the response is opaque and the code treats both success and network failure as `status: 'success'` (see the `catch` block) — this is intentional given the webhook setup, not a bug to "fix" by adding error handling.

### Styling system

- Tailwind v3 (not v4), config at `tailwind.config.js`, content scanned from `app/**` and `components/**` (the latter doesn't exist yet).
- Custom brand colors are semantic tokens (`primary`, `accent`, `background`, `surface`, `dark`), not raw Tailwind palette names — use these tokens (`bg-primary`, `text-accent`, etc.) instead of introducing new raw colors.
- A visual brand reference exists at `docs/design/brand_kit.md`.

### Deployment

Zero-config deploy target is Vercel (per README); Docker/`docker-compose` is the alternative for self-hosting via the native Next.js server (not `output: 'standalone'` — the Dockerfile copies full `node_modules`).
