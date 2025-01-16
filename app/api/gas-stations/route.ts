import fetch from 'node-fetch';

export async function GET(req: Request) {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yesterday = `${date.getDate()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getFullYear()}`;
  const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/${yesterday}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
