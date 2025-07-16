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
 * @param radius - Radius in kilometers (default: 2.5)
 * @returns Filtered stations with distance information
 */
export function filterStationsByDistance(
  stations: any[],
  userLat: number,
  userLon: number,
  radius: number = 3
) {
  console.log(`=== DISTANCE FILTERING DEBUG ===`);
  console.log(
    `Filtering ${stations.length} stations within ${radius}km radius`
  );
  console.log(`User location: ${userLat}, ${userLon}`);

  let withinRadius = 0;

  const filteredStations = stations
    .map((station, index) => {
      const stationLat = parseFloat(station.Latitud.replace(',', '.'));
      const stationLon = parseFloat(
        station['Longitud (WGS84)'].replace(',', '.')
      );

      if (isNaN(stationLat) || isNaN(stationLon)) {
        if (index < 5) {
          // Log first 5 invalid stations
          console.log(`Invalid coordinates for station ${index}:`, {
            lat: station.Latitud,
            lon: station['Longitud (WGS84)'],
            name: station.Rótulo,
          });
        }
        return null;
      }

      const distance = calculateDistance(
        userLat,
        userLon,
        stationLat,
        stationLon
      );

      const isWithinRadius = distance <= radius;
      if (isWithinRadius) {
        withinRadius++;
        if (withinRadius <= 5) {
          // Log first 5 stations within radius
          console.log(`Station within radius:`, {
            name: station.Rótulo,
            distance: distance,
            lat: stationLat,
            lon: stationLon,
          });
        }
      }

      return {
        ...station,
        distance,
      };
    })
    .filter((station) => station !== null && station.distance <= radius)
    .sort((a, b) => a.distance - b.distance);

  console.log(`=== FILTERING RESULTS ===`);
  console.log(`Within ${radius}km radius: ${withinRadius}`);
  console.log(`Final filtered count: ${filteredStations.length}`);

  if (filteredStations.length > 0) {
    console.log(
      `Closest station: ${filteredStations[0].Rótulo} at ${filteredStations[0].distance}km`
    );
    console.log(
      `Farthest station: ${
        filteredStations[filteredStations.length - 1].Rótulo
      } at ${filteredStations[filteredStations.length - 1].distance}km`
    );
  }

  return filteredStations;
}
