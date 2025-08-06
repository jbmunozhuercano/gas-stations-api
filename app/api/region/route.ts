import fetch from 'node-fetch';

/**
 * Handles GET requests to fetch the list of autonomous communities from the Spanish Ministry of Industry, Commerce and Tourism's public API.
 *
 * @async
 * @function
 * @returns {Promise<Response>} A promise that resolves to a Response object containing the JSON data of autonomous communities.
 *
 * @remarks
 * - Uses `node-fetch` to perform the HTTP request.
 * - Sets response headers for content type and caching.
 * - Returns a 500 status code with an error message if the fetch fails.
 */

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
