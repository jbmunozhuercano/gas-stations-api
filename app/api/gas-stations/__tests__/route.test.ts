import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '../route';

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

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockData);
  });

  it('returns correct content-type header', async () => {
    const mockData = { ListaEESSPrecio: [] };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const response = await GET();

    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('returns 500 when external API fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(
      new Error('Network error')
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Error al obtener los datos' });
  });

  it('returns 502 when upstream API returns error status', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 503,
      json: () => Promise.resolve({}),
    } as Response);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data).toEqual({ error: 'Error al obtener los datos' });
  });

  it('fetches data for yesterday\'s date', async () => {
    const mockData = { ListaEESSPrecio: [] };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    await GET();

    const calledUrl = vi.mocked(global.fetch).mock.calls[0][0] as string;

    expect(calledUrl).toContain('EstacionesTerrestresHist/');
    expect(calledUrl).toMatch(
      /EstacionesTerrestresHist\/\d{2}-\d{2}-\d{4}$/
    );
  });
});
