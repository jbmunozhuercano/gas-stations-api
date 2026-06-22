'use client';
import { useState, useEffect, useMemo, useCallback, useRef, JSX } from 'react';
import debounce from 'lodash/debounce';
import styles from './page.module.css';
import 'leaflet/dist/leaflet.css';
import { Select } from './components/Select';
import { InputField } from './components/InputField';
import { GasTypeSelector } from './components/GasTypeSelector';
import { LocationButton } from './components/LocationButton';
import { ClearButton } from './components/ClearButton';
import { LocationInfo } from './components/LocationInfo';
import { StationList } from './components/StationList';
import { useGeolocation } from './hooks/useGeolocation';
import { filterStationsByDistance } from './utils/distance';
import { REGION_CENTERS } from './constants/regionCenters';
import dynamic from 'next/dynamic';

import type { Station } from './types/station';

const GasStationsMap = dynamic(
  () => import('./components/GasStationsMap').then((mod) => mod.default),
  {
    ssr: false,
  },
);

/**
 * List of available fuel types for selection.
 */
const FUEL_TYPES: { key: keyof Station; label: string }[] = [
  { key: 'Precio Gasolina 95 E5', label: 'Gasolina 95 E5' },
  { key: 'Precio Gasolina 98 E5', label: 'Gasolina 98 E5' },
  { key: 'Precio Gasoleo A', label: 'Gasóleo A' },
  { key: 'Precio Gasoleo Premium', label: 'Gasóleo Premium' },
];

/**
 * Home component that displays a list of gas stations with filtering and pagination.
 * Handles region selection, geolocation, and fuel type selection.
 * @returns {JSX.Element} The rendered component.
 */
export default function Home(): JSX.Element {
  const [regionCode, setRegionCode] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [focusedStation, setFocusedStation] = useState<Station | null>(null);
  const mapRowRef = useRef<HTMLDivElement>(null);

  const handleStationClick = (station: Station) => {
    setFocusedStation(station);
    mapRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Custom hook for geolocation
  const {
    latitude,
    longitude,
    error: locationError,
    loading: locationLoading,
    getCurrentLocation,
    clearError,
  } = useGeolocation();

  /**
   * Fetches stations data from the API and updates state.
   */
  const fetchStations = useCallback(async (url: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener datos');
      const data = await response.json();
      setStations(data.ListaEESSPrecio);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ha ocurrido un error');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Debounced function to filter stations based on the search term.
   */
  const debouncedFilterStations = useMemo(() => {
    return debounce((stations: Station[], municipality: string) => {
      const term = municipality.trim().toLowerCase();
      setFilteredStations(
        stations.filter((station) =>
          station['Municipio'].toLocaleLowerCase().includes(term),
        ),
      );
    }, 300);
  }, []);

  /**
   * Effect to fetch stations when the region changes.
   */
  useEffect(() => {
    if (regionCode) {
      fetchStations(`/api/gas-stations/${regionCode}`);
      setUseLocation(false); // Reset geolocation when region changes
      setSearchTerm(''); // Reset search term when region changes
      setFocusedStation(null); // Reset focused station when region changes
      clearError(); // Clear any geolocation error
    } else {
      setStations([]);
      setFilteredStations([]);
    }
  }, [regionCode, fetchStations, clearError]);

  /**
   * Effect to filter stations by geolocation or municipality.
   */
  useEffect(() => {
    if (!regionCode || stations.length === 0) {
      setFilteredStations([]);
      return;
    }
    if (useLocation && latitude && longitude) {
      // Filter stations by distance if geolocation is enabled
      const nearbyStations = filterStationsByDistance(
        stations,
        latitude,
        longitude,
        3,
      );
      setFilteredStations(nearbyStations);
    } else {
      // Filter stations by municipality search term
      debouncedFilterStations(stations, searchTerm);
    }
  }, [
    useLocation,
    latitude,
    longitude,
    stations,
    searchTerm,
    debouncedFilterStations,
    regionCode,
  ]);

  /**
   * Handles location button click to enable geolocation and fetch stations.
   */
  const handleLocationClick = () => {
    if (!regionCode) return;
    setUseLocation(true);
    setSearchTerm('');
    getCurrentLocation();
  };

  /**
   * Clears all selections and resets the state.
   */
  const clearSelections = () => {
    setRegionCode('');
    setSearchTerm('');
    setUseLocation(false);
    setFilteredStations([]);
    setFocusedStation(null);
    clearError();
  };

  /**
   * Calculates the center of filtered stations for map positioning.
   */
  const filteredCenter = useMemo<[number, number] | null>(() => {
    if (filteredStations.length === 0) return null;
    const coords = filteredStations
      .map((s) => ({
        lat: parseFloat(s.Latitud.replace(',', '.')),
        lon: parseFloat(s['Longitud (WGS84)'].replace(',', '.')),
      }))
      .filter((c) => !isNaN(c.lat) && !isNaN(c.lon));
    if (coords.length === 0) return null;
    const avgLat = coords.reduce((sum, c) => sum + c.lat, 0) / coords.length;
    const avgLon = coords.reduce((sum, c) => sum + c.lon, 0) / coords.length;
    return [avgLat, avgLon];
  }, [filteredStations]);

  /**
   * Calculates the map center based on location, search results, or region.
   */
  const mapCenter: [number, number] =
    useLocation && latitude && longitude
      ? [latitude, longitude]
      : filteredCenter
        ? filteredCenter
        : regionCode && REGION_CENTERS[regionCode]
          ? REGION_CENTERS[regionCode]
          : [40.4168, -3.7038]; // Default center (Madrid)

  const defaultZoom = 6;
  const regionZoom = 7;
  const locationZoom = 12;
  const municipalityZoom = 10;

  /**
   * Calculates the zoom level based on location or region.
   */
  const zoom =
    useLocation && latitude && longitude
      ? locationZoom
      : searchTerm
        ? municipalityZoom
        : regionCode && REGION_CENTERS[regionCode]
          ? regionZoom
          : defaultZoom;

  /**
   * Determines whether to show distance information.
   */
  const showDistance = useLocation && latitude && longitude ? true : false;

  /**
   * State for the selected fuel type.
   */
  const [selectedFuel, setSelectedFuel] = useState<keyof Station>(
    FUEL_TYPES[0].key,
  );

  /**
   * Calculates the average price for the selected fuel type.
   * @param stations - Array of stations.
   * @param priceKey - Selected fuel price key.
   * @returns Average price as a number.
   */
  const getAveragePrice = (stations: Station[], priceKey: keyof Station) => {
    const prices = stations
      .map((s) => parseFloat(String(s[priceKey] ?? '').replace(',', '.')))
      .filter((p) => !isNaN(p));
    if (prices.length === 0) return 0;
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  };

  /**
   * Memoized value for the average price of the selected fuel type.
   */
  const averagePrice = useMemo(
    () => getAveragePrice(filteredStations, selectedFuel as keyof Station),
    [filteredStations, selectedFuel],
  );

  const selectedFuelLabel = FUEL_TYPES.find(
    (f) => f.key === selectedFuel,
  )?.label;

  return (
    <main id="main-content">
      {(error || locationError) && (
        <p className={styles.error} role="alert">
          {error || locationError}
        </p>
      )}

      <div className={styles.mapRow} ref={mapRowRef}>
        <nav className={styles.listHeader} aria-label="Filtros de búsqueda">
          <Select regionCode={regionCode} setRegionCode={setRegionCode} />
          <LocationButton
            onClick={handleLocationClick}
            loading={locationLoading}
            disabled={!regionCode || (useLocation && !latitude && !longitude)}
          />
          {!useLocation && (
            <InputField
              type="text"
              placeholder="Introduce el municipio"
              searchTerm={searchTerm}
              onInputChange={(value) => {
                setSearchTerm(value);
                clearError();
              }}
              onFocus={() => {
                mapRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              disabled={!regionCode}
            />
          )}
          <GasTypeSelector
            priceKey={selectedFuel as string}
            onChange={(key) => {
              setSelectedFuel(key as keyof Station);
              clearError();
            }}
          />
          <ClearButton clearSelections={clearSelections} />
        </nav>

        <GasStationsMap
          stations={filteredStations}
          center={mapCenter}
          showDistance={showDistance}
          zoom={zoom}
          priceKey={selectedFuel as keyof Station}
          averagePrice={averagePrice}
          focusedStation={focusedStation}
        />
        <StationList
          stations={filteredStations}
          selectedFuel={selectedFuel as string}
          searchTerm={searchTerm}
          useLocation={useLocation}
          onStationClick={handleStationClick}
        />
        {!loading && filteredStations.length > 0 && (
          <LocationInfo
            count={filteredStations.length}
            useLocation={useLocation}
            selectedFuelLabel={selectedFuelLabel}
            averagePrice={averagePrice}
          />
        )}
      </div>
    </main>
  );
}
