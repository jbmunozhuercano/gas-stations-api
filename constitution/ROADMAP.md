# Roadmap

## Current State (v2.4.2)

Stable production application with:

- Full map visualization with price-colored markers
- Region and municipality filtering
- GPS geolocation centering
- Opening hours detection (open/closed status)
- Responsive layout (mobile, tablet, desktop)
- Station list sorted by price (desktop)
- Motion animations for UI transitions
- Vitest test suite with coverage

## Phase 1: Quality & Reliability

- [ ] Increase test coverage to 80%+
- [ ] Add integration tests for API routes
- [ ] Add E2E tests for critical user flows
- [ ] Implement error boundary for map component
- [ ] Add loading skeletons for better UX during data fetch

## Phase 2: Enhanced Filtering

- [ ] Filter by fuel type price range
- [ ] Sort stations by distance from GPS location
- [ ] Save preferred fuel type in localStorage
- [ ]Remember last selected region

## Phase 3: Offline & Performance

- [ ] Service worker for offline map tiles
- [ ] Cache API responses in localStorage (TTL: 24h)
- [ ] Lazy-load station list on scroll
- [ ] Optimize bundle size (dynamic imports for Leaflet)

## Phase 4: Accessibility & i18n

- [ ] WCAG 2.2 AA compliance audit
- [ ] Keyboard navigation for map markers
- [ ] Screen reader announcements for filter changes
- [ ] English language support

## Phase 5: Advanced Features

- [ ] Price history charts (if API supports historical data)
- [ ] Favorite stations (localStorage)
- [ ] Share station via URL
- [ ] PWA manifest for installability

## Principles

- Ship small, ship often
- Each feature must be spec'd before implementation
- No breaking changes without version bump
- Tests before merge
