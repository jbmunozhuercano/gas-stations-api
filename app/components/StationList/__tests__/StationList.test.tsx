import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StationList } from '..';
import type { Station } from '../../../types/station';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockStations: Station[] = [
  {
    IDEESS: '001',
    Rótulo: 'Station A',
    Municipio: 'Madrid',
    'C.P.': '28001',
    Horario: 'L-D: 06:00-22:00',
    Latitud: '40,4168',
    'Longitud (WGS84)': '-3,7038',
    'Precio Gasolina 95 E5': '1,45',
    'Precio Gasolina 98 E5': '1,65',
    'Precio Gasoleo A': '1,35',
    'Precio Gasoleo Premium': '1,55',
  },
  {
    IDEESS: '002',
    Rótulo: 'Station B',
    Municipio: 'Barcelona',
    'C.P.': '08001',
    Horario: 'L-V: 07:00-21:00',
    Latitud: '41,3874',
    'Longitud (WGS84)': '2,1686',
    'Precio Gasolina 95 E5': '1,30',
    'Precio Gasolina 98 E5': '1,50',
    'Precio Gasoleo A': '1,25',
    'Precio Gasoleo Premium': '1,45',
  },
  {
    IDEESS: '003',
    Rótulo: 'Station C',
    Municipio: 'Valencia',
    'C.P.': '46001',
    Horario: 'L-D: 06:00-23:00',
    Latitud: '39,4699',
    'Longitud (WGS84)': '-0,3763',
    'Precio Gasolina 95 E5': '1,50',
    'Precio Gasolina 98 E5': '1,70',
    'Precio Gasoleo A': '1,40',
    'Precio Gasoleo Premium': '1,60',
  },
];

const defaultProps = {
  selectedFuel: 'Precio Gasolina 95 E5',
  searchTerm: 'test',
  useLocation: false,
  onStationClick: vi.fn(),
  favorites: [],
  onToggleFavorite: vi.fn(),
};

function renderList(overrides = {}) {
  return render(
    <StationList
      {...defaultProps}
      stations={mockStations}
      {...overrides}
    />,
  );
}

describe('StationList favorites', () => {
  it('renders heart icon for each station', () => {
    renderList();
    const hearts = screen.getAllByRole('button', { name: /marcar como favorita|quitar de favoritas/i, hidden: true });
    expect(hearts).toHaveLength(3);
  });

  it('shows outline heart for non-favorited stations', () => {
    renderList();
    const hearts = screen.getAllByRole('button', { name: /marcar como favorita/i, hidden: true });
    expect(hearts).toHaveLength(3);
  });

  it('shows filled heart for favorited stations', () => {
    renderList({ favorites: ['001'] });
    const filled = screen.getAllByRole('button', { name: 'Quitar de favoritas', hidden: true });
    expect(filled).toHaveLength(1);
    const outline = screen.getAllByRole('button', { name: 'Marcar como favorita', hidden: true });
    expect(outline).toHaveLength(2);
  });

  it('calls onToggleFavorite with correct IDEESS on heart click', () => {
    const onToggleFavorite = vi.fn();
    renderList({ onToggleFavorite });
    const hearts = screen.getAllByRole('button', { name: /marcar como favorita/i, hidden: true });
    fireEvent.click(hearts[0]);
    expect(onToggleFavorite).toHaveBeenCalledWith('002');
  });

  it('does not call onStationClick when heart is clicked', () => {
    const onStationClick = vi.fn();
    const onToggleFavorite = vi.fn();
    renderList({ onStationClick, onToggleFavorite });
    const heart = screen.getAllByRole('button', { name: /marcar como favorita/i, hidden: true })[0];
    fireEvent.click(heart);
    expect(onStationClick).not.toHaveBeenCalled();
  });

  it('sorts favorited stations before non-favorited', () => {
    renderList({ favorites: ['003'] });
    const items = screen.getAllByRole('button', { name: /ver .* en el mapa/i, hidden: true });
    expect(items[0]).toHaveTextContent('Station C');
    expect(items[1]).toHaveTextContent('Station B');
    expect(items[2]).toHaveTextContent('Station A');
  });

  it('sorts by price within favorited and non-favorited groups', () => {
    renderList({ favorites: ['003', '001'] });
    const items = screen.getAllByRole('button', { name: /ver .* en el mapa/i, hidden: true });
    expect(items[0]).toHaveTextContent('Station A');
    expect(items[1]).toHaveTextContent('Station C');
    expect(items[2]).toHaveTextContent('Station B');
  });

  it('does not show favorites without search on mobile', () => {
    renderList({ searchTerm: '', favorites: ['001'] });
    const items = screen.queryAllByRole('button', { name: /ver .* en el mapa/i, hidden: true });
    expect(items).toHaveLength(0);
  });
});

describe('StationList desktop default favorites view', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('min-width: 1024px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('shows only favorites sorted by price when there is no search', () => {
    renderList({ searchTerm: '', favorites: ['003', '001'] });
    const items = screen.getAllByRole('button', { name: /ver .* en el mapa/i, hidden: true });
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Station A');
    expect(items[1]).toHaveTextContent('Station C');
  });

  it('does not render when there is no search and no favorites', () => {
    renderList({ searchTerm: '', favorites: [] });
    const items = screen.queryAllByRole('button', { name: /ver .* en el mapa/i, hidden: true });
    expect(items).toHaveLength(0);
  });

  it('shows the full list with favorites first when searching', () => {
    renderList({ searchTerm: 'test', favorites: ['003'] });
    const items = screen.getAllByRole('button', { name: /ver .* en el mapa/i, hidden: true });
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Station C');
  });
});
