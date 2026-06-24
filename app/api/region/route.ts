export async function GET(): Promise<Response> {
  const url =
    'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`External API returned ${response.status}`);
      return Response.json(
        { error: 'Error al obtener datos de comunidades' },
        { status: 502 }
      );
    }

    const data = await response.json();

    return Response.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('API fetch failed:', error);
    return Response.json(
      { error: 'Error al obtener datos de comunidades' },
      { status: 500 }
    );
  }
}
