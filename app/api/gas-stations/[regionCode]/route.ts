interface Params {
  regionCode: string;
}

const VALID_REGION_CODES = /^\d{1,2}$/;

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
): Promise<Response> {
  const { regionCode } = await params;

  if (!VALID_REGION_CODES.test(regionCode)) {
    return Response.json(
      { error: 'Código de región no válido' },
      { status: 400 }
    );
  }

  const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAA/${regionCode}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`External API returned ${response.status}`);
      return Response.json(
        { error: 'Error al obtener datos de estaciones de servicio' },
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
      { error: 'Error al obtener datos de estaciones de servicio' },
      { status: 500 }
    );
  }
}
