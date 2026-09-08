const STORAGE_KEY = 'favoriteStations';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
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
