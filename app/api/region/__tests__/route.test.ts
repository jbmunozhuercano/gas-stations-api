import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '../route';

vi.mock('node-fetch', () => ({
  default: vi.fn(),
}));

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
    const mockData = [{ IDCCAA: '01', CCAA: 'Andalucía' }];

    const fetchModule = await import('node-fetch');
    vi.mocked(fetchModule.default).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as any);

    const response = await GET();

    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('returns cache-control header', async () => {
    const mockData = [{ IDCCAA: '01', CCAA: 'Andalucía' }];

    const fetchModule = await import('node-fetch');
    vi.mocked(fetchModule.default).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as any);

    const response = await GET();

    expect(response.headers.get('cache-control')).toBe(
      'public, max-age=3600'
    );
  });

  it('returns 500 when external API fails', async () => {
    const fetchModule = await import('node-fetch');
    vi.mocked(fetchModule.default).mockRejectedValueOnce(
      new Error('Network error')
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Error al obtener datos de comunidades' });
  });
});
