# Tech Stack

## Core

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.9 | App Router, server-side rendering, API routes |
| React | 19.2.7 | UI components and state management |
| TypeScript | 5 | Type safety across the entire codebase |

## Styling

| Technology | Purpose |
|---|---|
| CSS Modules | Scoped component styles (no Tailwind) |
| DESIGN.md | Design system reference (Urban Explorer theme) |

## Mapping

| Technology | Version | Purpose |
|---|---|---|
| Leaflet | ^1.9.4 | Core map rendering |
| react-leaflet | ^5.0.0 | React bindings for Leaflet |

## Animation

| Technology | Version | Purpose |
|---|---|---|
| motion | ^12.40.0 | UI transitions and micro-interactions |

## Icons

| Technology | Purpose |
|---|---|
| @fortawesome/fontawesome-svg-core | Icon system |
| @fortawesome/free-solid-svg-icons | Icon set |
| @fortawesome/react-fontawesome | React integration |

## Utilities

| Technology | Purpose |
|---|---|
| lodash | General utility functions |

## Testing

| Technology | Version | Purpose |
|---|---|---|
| Vitest | ^4.1.8 | Test runner |
| React Testing Library | ^16.3.2 | Component testing |
| @testing-library/jest-dom | ^6.9.1 | DOM assertions |
| @testing-library/user-event | ^14.6.1 | User interaction simulation |
| msw | ^2.14.6 | API mocking |
| jsdom | ^29.1.1 | DOM environment for tests |
| @vitest/coverage-v8 | ^4.1.8 | Code coverage |
| @vitest/ui | ^4.1.8 | Test UI |

## Linting

| Technology | Purpose |
|---|---|
| ESLint 9 | Code quality |
| eslint-config-next | Next.js-specific rules |

## Build & Deploy

| Technology | Purpose |
|---|---|
| Vercel | Hosting and deployment |
| Turbopack | Dev server bundling (default in Next.js 16) |

## Data Source

| API | Purpose |
|---|---|
| sedeaplicaciones.minetur.gob.es | Spanish government fuel prices REST API |

## Key Decisions

- **No database** — All data fetched at runtime from government API
- **No Tailwind** — CSS Modules chosen for scoped, maintainable styles
- **No state library** — React useState/useReducer sufficient for current complexity
- **No authentication** — Public data, no user accounts needed
- **API routes as proxy** — Avoids CORS issues with external API
- **node-fetch in API routes** — Consistent fetching pattern across API layer
