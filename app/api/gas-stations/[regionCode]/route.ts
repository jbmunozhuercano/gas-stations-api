import {NextApiRequest} from 'next';

type Params = {
  regionCode: string;
};

export async function GET(
  req: NextApiRequest,
  {params}: {params: Params}
): Promise<Response> {
  const {regionCode} = await params;
  const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAA/${regionCode}`;

  try {
    return await fetch(url);
  } catch (error) {
    console.error(error);
    return Response.json({error: 'Failed to fetch data'}, {status: 500});
  }
}
