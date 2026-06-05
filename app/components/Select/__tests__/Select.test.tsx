import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '..';

vi.mock('axios');

const mockCommunities = [
  { IDCCAA: '01', CCAA: 'Andalucía' },
  { IDCCAA: '02', CCAA: 'Aragón' },
  { IDCCAA: '03', CCAA: 'Asturias' },
];

describe('Select', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with default option', () => {
    render(<Select regionCode="" setRegionCode={() => {}} />);
    expect(
      screen.getByText('Selecciona una comunidad autónoma')
    ).toBeInTheDocument();
  });

  it('fetches and renders communities on mount', async () => {
    const axios = await import('axios');
    vi.mocked(axios.default.get).mockResolvedValueOnce({
      data: mockCommunities,
    });

    render(<Select regionCode="" setRegionCode={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Andalucía')).toBeInTheDocument();
      expect(screen.getByText('Aragón')).toBeInTheDocument();
      expect(screen.getByText('Asturias')).toBeInTheDocument();
    });
  });

  it('calls setRegionCode when option is selected', async () => {
    const setRegionCode = vi.fn();
    const axios = await import('axios');
    vi.mocked(axios.default.get).mockResolvedValueOnce({
      data: mockCommunities,
    });

    render(<Select regionCode="" setRegionCode={setRegionCode} />);

    await waitFor(() => {
      expect(screen.getByText('Andalucía')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '01');

    expect(setRegionCode).toHaveBeenCalledWith('01');
  });

  it('has correct aria-label', () => {
    render(<Select regionCode="" setRegionCode={() => {}} />);
    expect(
      screen.getByLabelText('Selecciona una comunidad autónoma')
    ).toBeInTheDocument();
  });

  it('displays selected value', async () => {
    const axios = await import('axios');
    vi.mocked(axios.default.get).mockResolvedValueOnce({
      data: mockCommunities,
    });

    render(<Select regionCode="01" setRegionCode={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Andalucía')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('01');
  });
});
