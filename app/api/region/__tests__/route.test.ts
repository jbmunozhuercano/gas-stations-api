import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '../route';

describe('GET /api/region', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 200 with community data', async () => {
    const mockData = [
      { IDCCAA: '01', CCAA: 'Andalucía' },
      { IDCCAA: '02', CCAA: 'Aragón' },
    ];

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
    const mockData = [{ IDCCAA: '01', CCAA: 'Andalucía' }];

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const response = await GET();

    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('returns cache-control header', async () => {
    const mockData = [{ IDCCAA: '01', CCAA: 'Andalucía' }];

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const response = await GET();

    expect(response.headers.get('cache-control')).toBe(
      'public, max-age=3600'
    );
  });

  it('returns 500 when external API fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(
      new Error('Network error')
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Error al obtener datos de comunidades' });
  });

  it('returns 502 when upstream API returns error status', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as Response);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data).toEqual({ error: 'Error al obtener datos de comunidades' });
  });
});
