import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '../route';

vi.mock('node-fetch', () => ({
  default: vi.fn(),
}));

describe('GET /api/gas-stations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 200 with station data', async () => {
    const mockData = {
      ListaEESSPrecio: [
        { Rótulo: 'Station A', Municipio: 'Madrid' },
        { Rótulo: 'Station B', Municipio: 'Barcelona' },
      ],
    };

    const fetchModule = await import('node-fetch');
    vi.mocked(fetchModule.default).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as any);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockData);
  });

  it('returns correct content-type header', async () => {
    const mockData = { ListaEESSPrecio: [] };

    const fetchModule = await import('node-fetch');
    vi.mocked(fetchModule.default).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as any);

    const response = await GET();

    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('returns 500 when external API fails', async () => {
    const fetchModule = await import('node-fetch');
    vi.mocked(fetchModule.default).mockRejectedValueOnce(
      new Error('Network error')
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to fetch data' });
  });

  it('fetches data for yesterday\'s date', async () => {
    const mockData = { ListaEESSPrecio: [] };

    const fetchModule = await import('node-fetch');
    vi.mocked(fetchModule.default).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as any);

    await GET();

    const calledUrl = vi.mocked(fetchModule.default).mock.calls[0][0] as string;

    expect(calledUrl).toContain('EstacionesTerrestresHist/');
    expect(calledUrl).toMatch(
      /EstacionesTerrestresHist\/\d{2}-\d{2}-\d{4}$/
    );
  });
});
