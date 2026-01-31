# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (Korean/English) portfolio website for a freelance sound engineer. Built with React 19 + TypeScript + Vite, styled with Tailwind CSS (CDN), animated with GSAP + ScrollTrigger.

## Commands

```bash
npm run dev        # Start dev server (port 3000)
npm run build      # Production build
npm run preview    # Preview production build
```

No test framework is configured.

## Architecture

**Routing:** Custom client-side routing in `App.tsx` using `page` state (`'home'` | `'pricing'`). No React Router — pages render conditionally via a `pages[page]` object map.

**i18n:** Language state (`'KR'` | `'EN'`) in `App.tsx` passed as props. All text content lives in `data/content.ts` as a `Record<Language, ...>` object. Access pattern: `content[language].sectionName`.

**Data flow:** App.tsx owns top-level state (language, page) and passes props down. No state management library.

**Animations:** GSAP loaded via CDN in `index.html`. Hero section uses `gsap.fromTo()` with staggered timelines. Scroll animations use IntersectionObserver with `.scroll-reveal` class (defined in inline styles in `index.html`).

**Styling:** Tailwind via CDN (no tailwind.config file). Custom CSS classes (`.text-glow`, `.hero-bg`, `.scroll-reveal`) defined inline in `index.html`. Dark theme with red (#ff0f0f) accent.

**Key files:**
- `data/content.ts` — all bilingual text, portfolio items, pricing data
- `types.ts` — shared TypeScript types (Language, PortfolioItem, Client)
- `App.tsx` — routing, language state, scroll observer setup
- `pages/HomePage.tsx` — main page composing Hero, About, Portfolio, Contact, Footer
- `pages/PricingPage.tsx` — pricing tiers and policies

**Path alias:** `@/*` maps to project root (configured in tsconfig.json and vite.config.ts).
