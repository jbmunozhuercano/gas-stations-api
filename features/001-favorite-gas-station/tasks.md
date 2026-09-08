# Tasks: Favorite Gas Station

## Task 1: Create favorites utility module

**Files:** `app/utils/favorites.ts` (new), `app/utils/__tests__/favorites.test.ts` (new)

- Implement `getFavorites(): string[]`
- Implement `toggleFavorite(ideess: string): string[]`
- Implement `isFavorite(ideess: string): boolean`
- Handle `typeof window === 'undefined'` guard for SSR
- Handle corrupted localStorage JSON gracefully
- Write unit tests for all three functions

**Acceptance:** Tests pass, 100% coverage on favorites.ts

---

## Task 2: Add favorites state to page.tsx

**Files:** `app/page.tsx`

- Import `getFavorites`, `toggleFavorite` from `app/utils/favorites`
- Add `favorites` state with `useState<string[]>`, initialized lazily from `getFavorites()`
- Create `handleToggleFavorite` callback that calls `toggleFavorite` and updates state
- Pass `favorites` and `onToggleFavorite` to `StationList`

**Acceptance:** Page compiles, favorites state updates on toggle

---

## Task 3: Update StationList to accept favorites props

**Files:** `app/components/StationList/index.tsx`

- Add `favorites: string[]` and `onToggleFavorite: (id: string) => void` to `StationListProps`
- Modify `sortedStations` useMemo to sort favorites first, then by price within each group
- Render heart SVG icon at the start of each station item
- Heart click handler calls `onToggleFavorite(station.IDEESS)` with `e.stopPropagation()`
- Heart aria-label toggles between "Marcar como favorita" and "Quitar de favoritas"

**Acceptance:** Favorites appear at top, heart toggles, click does not trigger station focus

---

## Task 4: Style the heart icon

**Files:** `app/components/StationList/StationList.module.css`

- Add `.heart` base styles: 18px, cursor pointer, flex-shrink 0, transition transform
- Add `.heartFilled`: color `var(--color-3)`, fill solid
- Add `.heartOutline`: color `var(--color-5)`, opacity 0.4, no fill
- Add `.heart:hover`: transform scale(1.15)
- Ensure heart aligns vertically with station name

**Acceptance:** Heart matches DESIGN.md aesthetic, hover feedback visible

---

## Task 5: Write integration tests

**Files:** `app/components/StationList/__tests__/StationList.test.tsx` (extend existing or create)

- Test: heart icon renders for each station
- Test: clicking heart calls onToggleFavorite with correct IDEESS
- Test: favorited stations appear before non-favorited in rendered list
- Test: heart click does not trigger onStationClick

**Acceptance:** All tests pass
