export async function GET(): Promise<Response> {
  const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/`;

  try {
    return await fetch(url);
  } catch (error) {
    console.error(error);
    return Response.json({error: 'Failed to fetch data'}, {status: 500});
  }
}
