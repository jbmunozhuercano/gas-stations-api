'use client';
import { useState, useEffect, useMemo, useCallback, useRef, JSX } from 'react';
import debounce from 'lodash/debounce';
import styles from './page.module.css';
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
    loading: () => <div className={styles.mapPlaceholder} />,
  },
);

const FUEL_TYPES: { key: keyof Station; label: string }[] = [
  { key: 'Precio Gasolina 95 E5', label: 'Gasolina 95 E5' },
  { key: 'Precio Gasolina 98 E5', label: 'Gasolina 98 E5' },
  { key: 'Precio Gasoleo A', label: 'Gasóleo A' },
  { key: 'Precio Gasoleo Premium', label: 'Gasóleo Premium' },
];

function getAveragePrice(stations: Station[], priceKey: keyof Station): number {
  const prices = stations
    .map((s) => parseFloat(String(s[priceKey] ?? '').replace(',', '.')))
    .filter((p) => !isNaN(p));
  if (prices.length === 0) return 0;
  return prices.reduce((a, b) => a + b, 0) / prices.length;
}

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'smooth';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';
}

export default function Home(): JSX.Element {
  const [regionCode, setRegionCode] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [focusedStation, setFocusedStation] = useState<Station | null>(null);
  const mapRowRef = useRef<HTMLDivElement>(null);

  const {
    latitude,
    longitude,
    error: locationError,
    loading: locationLoading,
    getCurrentLocation,
    clearError,
  } = useGeolocation();

  const fetchStations = useCallback(async (url: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener datos');
      const data = await response.json();
      setStations(data.ListaEESSPrecio);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (regionCode) {
      fetchStations(`/api/gas-stations/${regionCode}`);
      setUseLocation(false);
      setSearchTerm('');
      setFocusedStation(null);
      clearError();
    } else {
      setStations([]);
    }
  }, [regionCode, fetchStations, clearError]);

  const debouncedFilter = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedFilter.cancel();
    };
  }, [debouncedFilter]);

  const filteredStations = useMemo(() => {
    if (!regionCode || stations.length === 0) return [];
    if (useLocation && latitude && longitude) {
      return filterStationsByDistance(stations, latitude, longitude, 3);
    }
    const term = searchTerm.trim().toLowerCase();
    if (!term) return stations;
    return stations.filter((s) =>
      s['Municipio'].toLocaleLowerCase().includes(term),
    );
  }, [stations, searchTerm, useLocation, latitude, longitude, regionCode]);

  const handleStationClick = useCallback(
    (station: Station) => {
      setFocusedStation(station);
      setTimeout(() => {
        mapRowRef.current?.scrollIntoView({
          behavior: getScrollBehavior(),
          block: 'start',
        });
      }, 150);
    },
    [],
  );

  const handleLocationClick = useCallback(() => {
    if (!regionCode) return;
    setUseLocation(true);
    setSearchTerm('');
    getCurrentLocation();
  }, [regionCode, getCurrentLocation]);

  const clearSelections = useCallback(() => {
    setRegionCode('');
    setSearchTerm('');
    setUseLocation(false);
    setFocusedStation(null);
    clearError();
  }, [clearError]);

  const handleInputChange = useCallback(
    (value: string) => {
      debouncedFilter(value);
      clearError();
      setTimeout(() => {
        mapRowRef.current?.scrollIntoView({
          behavior: getScrollBehavior(),
          block: 'start',
        });
      }, 150);
    },
    [debouncedFilter, clearError],
  );

  const handleFuelChange = useCallback((key: string) => {
    setSelectedFuel(key as keyof Station);
    clearError();
  }, [clearError]);

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

  const mapCenter = useMemo<[number, number]>(
    () =>
      useLocation && latitude && longitude
        ? [latitude, longitude]
        : filteredCenter ??
          (regionCode && REGION_CENTERS[regionCode]
            ? REGION_CENTERS[regionCode]
            : [40.4168, -3.7038]),
    [useLocation, latitude, longitude, filteredCenter, regionCode],
  );

  const zoom = useMemo(() => {
    if (useLocation && latitude && longitude) return 12;
    if (searchTerm) return 10;
    if (regionCode && REGION_CENTERS[regionCode]) return 7;
    return 6;
  }, [useLocation, latitude, longitude, searchTerm, regionCode]);

  const showDistance = !!(useLocation && latitude && longitude);

  const [selectedFuel, setSelectedFuel] = useState<keyof Station>(
    FUEL_TYPES[0].key,
  );

  const averagePrice = useMemo(
    () => getAveragePrice(filteredStations, selectedFuel),
    [filteredStations, selectedFuel],
  );

  const selectedFuelLabel = useMemo(
    () => FUEL_TYPES.find((f) => f.key === selectedFuel)?.label,
    [selectedFuel],
  );

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
              onInputChange={handleInputChange}
              disabled={!regionCode}
            />
          )}
          <GasTypeSelector
            priceKey={selectedFuel as string}
            onChange={handleFuelChange}
          />
          <ClearButton clearSelections={clearSelections} />
        </nav>

        <GasStationsMap
          stations={filteredStations}
          center={mapCenter}
          showDistance={showDistance}
          zoom={zoom}
          priceKey={selectedFuel}
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
