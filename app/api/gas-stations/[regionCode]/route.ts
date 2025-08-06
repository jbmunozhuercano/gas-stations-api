/**
 * Handles GET requests to fetch gas station data for a specific region.
 *
 * @param request - The incoming HTTP request object.
 * @param params - An object containing a promise that resolves to the route parameters, including `regionCode`.
 * @returns A promise that resolves to a `Response` object containing the gas station data in JSON format.
 *
 * @remarks
 * - Fetches data from the Spanish Ministry of Industry, Energy and Tourism's public API.
 * - Adds caching headers to the response for improved performance.
 * - Returns a 500 status code with an error message if the fetch operation fails.
 *
 * @example
 * Example usage in a Next.js API route:
 * export { GET } from './route';
 */

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
