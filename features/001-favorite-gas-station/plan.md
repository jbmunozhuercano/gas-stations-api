# Plan: Favorite Gas Station

## Architecture

### Storage Layer

New utility module `app/utils/favorites.ts`:

```ts
const STORAGE_KEY = 'favoriteStations';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function toggleFavorite(ideess: string): string[] {
  const current = getFavorites();
  const next = current.includes(ideess)
    ? current.filter((id) => id !== ideess)
    : [...current, ideess];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function isFavorite(ideess: string): boolean {
  return getFavorites().includes(ideess);
}
```

### State Management

Favorites state lives in `app/page.tsx` via `useState<string[]>`, initialized from `localStorage` on mount. The state is passed down to `StationList` and individual items.

```
page.tsx
  ├── favorites: string[]            (state)
  ├── toggleFavorite: (id) => void   (callback)
  └── <StationList favorites={favorites} onToggleFavorite={toggleFavorite} />
```

### Sorting Logic Change

In `StationList/index.tsx`, modify `sortedStations` useMemo to partition into favorites-first:

```ts
const sortedStations = useMemo(() => {
  const withPrice = [...stations].sort(priceSort);
  const favs = withPrice.filter((s) => favorites.includes(s.IDEESS));
  const nonFavs = withPrice.filter((s) => !favorites.includes(s.IDEESS));
  return [...favs, ...nonFavs];
}, [stations, selectedFuel, favorites]);
```

### Heart Icon

Inline SVG heart icon in StationList item (no new dependency). Two variants:
- Outline: `<path stroke="currentColor" fill="none" ...>`
- Filled: `<path fill="currentColor" ...>`

### Event Handling

Heart button uses `onClick={(e) => { e.stopPropagation(); toggleFavorite(station.IDEESS); }}` to prevent the parent item click from firing.

## Files to Modify

| File | Change |
|---|---|
| `app/utils/favorites.ts` | **New** — localStorage read/write/toggle |
| `app/page.tsx` | Add favorites state, pass to StationList |
| `app/components/StationList/index.tsx` | Accept favorites props, render heart, sort favorites first |
| `app/components/StationList/StationList.module.css` | Heart icon styles |

## Files Unchanged

- `app/components/StationCard/` — not used in the list view (only map popups)
- `app/components/GasStationsMap/` — no map marker changes
- API routes — no backend changes

## Design Tokens

- Heart size: 18px × 18px
- Heart gap from station name: 0.25em
- Filled color: `var(--color-3)` (terracotta)
- Outline color: `var(--color-5)` at 0.4 opacity
- Hover: scale 1.15 transition

## Testing Strategy

- Unit test `favorites.ts` — toggle adds/removes, getFavorites returns array, handles corrupted localStorage
- Component test — heart renders, click calls toggleFavorite, stopPropagation works
- Integration test — favorites persist after re-render, sort order places favorites first
