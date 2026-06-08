import type { Station } from '../types/station';

/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

/**
 * Filter stations within a specified radius
 * @param stations - Array of gas stations
 * @param userLat - User's latitude
 * @param userLon - User's longitude
 * @param radius - Radius in kilometers (default: 3)
 * @returns Filtered stations with distance information
 */
export function filterStationsByDistance(
  stations: Station[],
  userLat: number,
  userLon: number,
  radius: number = 3
) {
  return stations
    .map((station) => {
      const stationLat = parseFloat(station.Latitud.replace(',', '.'));
      const stationLon = parseFloat(
        station['Longitud (WGS84)'].replace(',', '.')
      );

      if (isNaN(stationLat) || isNaN(stationLon)) return null;

      const distance = calculateDistance(
        userLat,
        userLon,
        stationLat,
        stationLon
      );

      if (distance > radius) return null;

      return { ...station, distance };
    })
    .filter((s) => s !== null)
    .sort((a, b) => a!.distance - b!.distance);
}
