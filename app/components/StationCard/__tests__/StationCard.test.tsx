import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StationCard } from '..';
import type { Station } from '../../../types/station';

const mockStation: Station = {
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
};

describe('StationCard', () => {
  it('renders station name and prices', () => {
    render(<StationCard station={mockStation} />);
    expect(screen.getByText('Station A')).toBeDefined();
    expect(screen.getByText('Madrid')).toBeDefined();
    expect(screen.getByText('1,45€')).toBeDefined();
  });

  it('does not render heart when onToggleFavorite is not provided', () => {
    render(<StationCard station={mockStation} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('renders heart icon when onToggleFavorite is provided', () => {
    render(
      <StationCard
        station={mockStation}
        onToggleFavorite={vi.fn()}
      />,
    );
    const heart = screen.getByRole('button', { name: 'Marcar como favorita' });
    expect(heart).toBeDefined();
  });

  it('renders filled heart when isFavorite is true', () => {
    render(
      <StationCard
        station={mockStation}
        isFavorite
        onToggleFavorite={vi.fn()}
      />,
    );
    const heart = screen.getByRole('button', { name: 'Quitar de favoritas' });
    expect(heart).toBeDefined();
  });

  it('calls onToggleFavorite with correct IDEESS on heart click', () => {
    const onToggleFavorite = vi.fn();
    render(
      <StationCard
        station={mockStation}
        onToggleFavorite={onToggleFavorite}
      />,
    );
    const heart = screen.getByRole('button', { name: 'Marcar como favorita' });
    fireEvent.click(heart);
    expect(onToggleFavorite).toHaveBeenCalledWith('001');
  });

  it('shows closed status when station is closed', () => {
    const closedStation: Station = {
      ...mockStation,
      Horario: 'L-V: 02:00-04:00',
    };
    render(<StationCard station={closedStation} />);
    expect(screen.getByText('Cerrada')).toBeDefined();
  });
});
