import fetch from 'node-fetch';

interface Params {
  regionCode: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
): Promise<Response> {
  const { regionCode } = await params;
  const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAA/${regionCode}`;

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
      { error: 'Failed to fetch fuel station data' },
      { status: 500 }
    );
  }
}
