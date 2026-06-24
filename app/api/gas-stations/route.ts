export async function GET() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yesterday = `${date.getDate().toString().padStart(2, '0')}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${date.getFullYear()}`;
  const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/${yesterday}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`External API returned ${response.status}`);
      return Response.json(
        { error: 'Error al obtener los datos' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return Response.json(data, {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Error al obtener los datos' }, { status: 500 });
  }
}
