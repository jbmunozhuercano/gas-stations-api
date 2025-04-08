import fetch from 'node-fetch';

export async function GET(): Promise<Response> {
  const url =
    'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/';

  try {
    const response = await fetch(url);
    const data = await response.json();

    return Response.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Added caching
      },
    });
  } catch (error) {
    console.error('API fetch failed:', error);
    return Response.json(
      { error: 'Failed to fetch community data' },
      { status: 500 }
    );
  }
}
