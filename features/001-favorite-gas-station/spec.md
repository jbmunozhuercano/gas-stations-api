# Spec: Favorite Gas Station

## Goal

Allow users to mark gas stations as favorites via a clickable heart icon. Favorited stations appear at the top of the station list regardless of price sorting, giving users quick access to their most-used stations.

## Non-Goals

- No account system or cloud sync — favorites are device-local only
- No limit on number of favorites
- No favorite-based filtering (user can still filter by region/municipality)
- No favorite indicators on the map markers (only in the list)

## User Story

As a driver, I want to save my frequently visited gas stations so I can quickly find them at the top of the list without searching each time.

## Requirements

### REQ-001: Heart Icon Toggle

When viewing the station list, each station item SHALL display a clickable heart icon. Clicking the heart toggles the station between favorited (filled heart) and unfavorited (outline heart) state.

### REQ-002: Persistent Storage

Favorites SHALL be persisted in `localStorage` under the key `favoriteStations` as a `string[]` of station `IDEESS` values. Favorites survive page refreshes and browser restarts.

### REQ-003: Sort Order Priority

Favorited stations SHALL appear at the top of the station list, grouped together, before non-favorited stations. Within each group (favorited / non-favorited), the existing price-sort logic applies.

### REQ-004: Visual Feedback

- Favorited heart: filled, terracotta color (`var(--color-3)`)
- Unfavorited heart: outline, muted color (`var(--color-5)` at reduced opacity)
- Heart icon SHALL have `aria-label` indicating toggle action (e.g., "Marcar como favorita" / "Quitar de favoritas")
- Heart click SHALL NOT propagate to the station item click (no map scroll on heart click)

### REQ-005: Independence from Filters

Favorites persist across region changes. When a user selects a region, favorited stations within that region appear at the top. Favorited stations from other regions are not shown (region filter still applies).

## Acceptance Criteria

1. Heart icon is visible on each station in the list
2. Clicking heart toggles favorite state immediately
3. Favorited stations move to top of list
4. Refreshing the page preserves favorites
5. Heart click does not trigger station map focus
6. Screen readers announce favorite toggle state

## Open Questions

- Should the heart appear in the StationCard popup too, or only in the list? (Decision: list only for v1)
