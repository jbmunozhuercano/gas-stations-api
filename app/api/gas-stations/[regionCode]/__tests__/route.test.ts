import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '../route';

describe('GET /api/gas-stations/[regionCode]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 200 with filtered station data', async () => {
    const mockData = {
      ListaEESSPrecio: [
        { Rótulo: 'Station A', Municipio: 'Valencia' },
      ],
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const request = new Request('http://localhost/api/gas-stations/10');
    const params = Promise.resolve({ regionCode: '10' });

    const response = await GET(request, { params });
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

    const request = new Request('http://localhost/api/gas-stations/10');
    const params = Promise.resolve({ regionCode: '10' });

    const response = await GET(request, { params });

    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('returns cache-control header', async () => {
    const mockData = { ListaEESSPrecio: [] };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const request = new Request('http://localhost/api/gas-stations/10');
    const params = Promise.resolve({ regionCode: '10' });

    const response = await GET(request, { params });

    expect(response.headers.get('cache-control')).toBe(
      'public, max-age=3600'
    );
  });

  it('returns 500 when external API fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(
      new Error('Network error')
    );

    const request = new Request('http://localhost/api/gas-stations/10');
    const params = Promise.resolve({ regionCode: '10' });

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Error al obtener datos de estaciones de servicio' });
  });

  it('returns 502 when upstream API returns error status', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: () => Promise.resolve({}),
    } as Response);

    const request = new Request('http://localhost/api/gas-stations/10');
    const params = Promise.resolve({ regionCode: '10' });

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data).toEqual({ error: 'Error al obtener datos de estaciones de servicio' });
  });

  it('returns 400 for invalid regionCode', async () => {
    const request = new Request('http://localhost/api/gas-stations/abc');
    const params = Promise.resolve({ regionCode: 'abc' });

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Código de región no válido' });
  });

  it('passes regionCode to external API URL', async () => {
    const mockData = { ListaEESSPrecio: [] };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const request = new Request('http://localhost/api/gas-stations/10');
    const params = Promise.resolve({ regionCode: '10' });

    await GET(request, { params });

    const calledUrl = vi.mocked(global.fetch).mock.calls[0][0] as string;

    expect(calledUrl).toContain('FiltroCCAA/10');
  });
});
