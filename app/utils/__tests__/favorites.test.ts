import { describe, it, expect, beforeEach } from 'vitest';
import { getFavorites, toggleFavorite, isFavorite } from '../favorites';

beforeEach(() => {
  localStorage.clear();
});

describe('getFavorites', () => {
  it('returns empty array when no favorites stored', () => {
    expect(getFavorites()).toEqual([]);
  });

  it('returns stored favorites', () => {
    localStorage.setItem('favoriteStations', JSON.stringify(['123', '456']));
    expect(getFavorites()).toEqual(['123', '456']);
  });

  it('returns empty array for corrupted JSON', () => {
    localStorage.setItem('favoriteStations', 'not-json');
    expect(getFavorites()).toEqual([]);
  });

  it('returns empty array for non-array JSON', () => {
    localStorage.setItem('favoriteStations', JSON.stringify({ not: 'array' }));
    expect(getFavorites()).toEqual([]);
  });

  it('filters out non-string entries', () => {
    localStorage.setItem(
      'favoriteStations',
      JSON.stringify(['123', 456, null, '789']),
    );
    expect(getFavorites()).toEqual(['123', '789']);
  });
});

describe('toggleFavorite', () => {
  it('adds station to favorites', () => {
    const result = toggleFavorite('123');
    expect(result).toEqual(['123']);
    expect(localStorage.getItem('favoriteStations')).toBe('["123"]');
  });

  it('removes station from favorites', () => {
    localStorage.setItem('favoriteStations', JSON.stringify(['123', '456']));
    const result = toggleFavorite('123');
    expect(result).toEqual(['456']);
  });

  it('returns updated list after toggle', () => {
    toggleFavorite('123');
    toggleFavorite('456');
    expect(getFavorites()).toEqual(['123', '456']);
  });

  it('handles toggling same station twice', () => {
    toggleFavorite('123');
    const result = toggleFavorite('123');
    expect(result).toEqual([]);
  });
});

describe('isFavorite', () => {
  it('returns false when not favorited', () => {
    expect(isFavorite('123')).toBe(false);
  });

  it('returns true when favorited', () => {
    toggleFavorite('123');
    expect(isFavorite('123')).toBe(true);
  });

  it('returns false after unfavoriting', () => {
    toggleFavorite('123');
    toggleFavorite('123');
    expect(isFavorite('123')).toBe(false);
  });
});
