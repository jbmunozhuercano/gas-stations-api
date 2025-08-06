/**
 * Handles GET requests to fetch gas station price data for the previous day
 * from the Spanish Ministry of Industry, Commerce and Tourism's public API.
 *
 * - Calculates yesterday's date and formats it as 'DD-MM-YYYY'.
 * - Fetches historical terrestrial gas station prices for that date.
 * - Returns the data as a JSON response with status 200.
 * - On error, returns a JSON error message with status 500.
 *
 * @returns {Promise<Response>} A promise that resolves to a Response object containing the fetched data or an error message.
 */

import fetch from 'node-fetch';

export async function GET() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yesterday = `${date.getDate().toString().padStart(2, '0')}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${date.getFullYear()}`;
  const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/${yesterday}`;
  console.log(yesterday);

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
