# Agent Instructions

## Project

Next.js 15 (App Router) + React 19 + TypeScript. Displays Spanish gas station prices from a government API (`sedeaplicaciones.minetur.gob.es`). Deployed on Vercel. UI is in Spanish (`lang="es"`).

## Commands

```bash
npm run dev          # Dev server with Turbopack (--turbopack)
npm run build        # Production build (use to verify changes)
npm run start        # Production server
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
```

No test framework is configured. No typecheck script exists — `npm run build` is the only full verification step. No formatter is configured.

## Architecture

- **App Router** — all routes under `app/`. No `pages/` directory.
- **API routes** — `app/api/` proxies the external Spanish government API:
  - `GET /api/region` — list of autonomous communities
  - `GET /api/gas-stations` — all stations (previous day's prices)
  - `GET /api/gas-stations/[regionCode]` — stations filtered by region code (e.g. `10` for Valencia)
- **Single page** — `app/page.tsx` is the entire client-side app (`'use client'`).
- **Leaflet map** — `GasStationsMap` is dynamically imported with `ssr: false` (required for Leaflet in Next.js).
- **Path alias** — `@/*` maps to the project root.

## Key Gotchas

- **Leaflet icon fix** — `GasStationsMap/index.tsx` deletes `L.Icon.Default.prototype._getIconUrl` to fix broken default icons in webpack/Next.js. Do not remove this.
- **Comma decimal separator** — The external API returns coordinates and prices with commas as decimal separators (e.g. `"39,4699"`). Always `.replace(',', '.')` before `parseFloat()`.
- **Date-based API** — `/api/gas-stations` uses yesterday's date. The external API only provides historical data.
- **API routes use `node-fetch`** — not Next.js built-in `fetch`. Keep this consistent.
- **No env files** — No `.env` required. All data is fetched from public APIs at runtime.

## Conventions

- Components: one folder per component in `app/components/`, each with `index.tsx` and CSS module.
- CSS modules for all styling (no Tailwind, no global utility classes).
- No monorepo — single package only.
- No CI/CD config, no pre-commit hooks.

## Skills

Located in `.agents/skills/`. Load with the skill tool when a task matches.

| Skill | Use when... |
|-------|-------------|
| `react-best-practices` | Writing, reviewing, or refactoring React/Next.js code. Covers waterfalls, bundle size, re-renders, rendering perf, JS perf, advanced patterns. |
| `next-best-practices` | Working with Next.js App Router: file conventions, RSC boundaries, async patterns, route handlers, metadata, images, fonts, bundling. |
| `composition-patterns` | Refactoring components with boolean prop proliferation, building compound components, designing flexible component APIs. |
| `accessibility` | Improving a11y: keyboard nav, screen reader support, WCAG compliance, color contrast, focus management. |
| `seo` | Optimizing meta tags, structured data, sitemaps, crawlability, on-page SEO. |
| `frontend-design` | Building distinctive UI that avoids generic AI aesthetics. Design thinking, typography, motion, spatial composition. |
| `nodejs-backend-patterns` | Building Node.js backend services (Express/Fastify), not directly used here but available for API route patterns. |
| `nodejs-best-practices` | Node.js architecture decisions, async patterns, security, validation. |
| `typescript-advanced-types` | Complex type logic: generics, conditional types, mapped types, type-safe API clients. |
| `next-upgrade` | Upgrading Next.js versions with official migration guides and codemods. |
| `next-cache-components` | Next.js 16+ cache components, PPR, `use cache` directive, cacheLife, cacheTag. |
