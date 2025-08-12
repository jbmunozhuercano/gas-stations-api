'use client';
import { useState, useEffect, useMemo, JSX } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import styles from './page.module.css';
import 'leaflet/dist/leaflet.css';
import { Select } from './components/Select';
import { InputField } from './components/InputField';
import { GasTypeSelector } from './components/GasTypeSelector';
import { LocationButton } from './components/LocationButton';
import { ClearButton } from './components/ClearButton';
import { LocationInfo } from './components/LocationInfo';
import { useGeolocation } from './hooks/useGeolocation';
import { filterStationsByDistance } from './utils/distance';
import { REGION_CENTERS } from './constants/regionCenters';
import dynamic from 'next/dynamic';

const GasStationsMap = dynamic(
  () => import('./components/GasStationsMap').then((mod) => mod.default),
  {
    ssr: false,
  }
);

/**
 * Interface representing a gas station.
 */
interface Station {
  Municipio: string;
  Rótulo: string;
  'C.P.': string;
  Horario: string;
  Latitud: string;
  'Longitud (WGS84)': string;
  'Precio Gasolina 95 E5': string;
  'Precio Gasolina 98 E5': string;
  'Precio Gasoleo A': string;
  'Precio Gasoleo Premium': string;
}

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

  // Custom hook for geolocation
  const {
    latitude,
    longitude,
    error: locationError,
    loading: locationLoading,
    getCurrentLocation,
  } = useGeolocation();

  /**
   * Fetches stations data from the API and updates state.
   * @param {string} url - The API endpoint to fetch data from.
   */
  const fetchStations = async (url: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(url);
      setStations(response.data.ListaEESSPrecio);
      console.log(
        `Mostrando ${response.data.ListaEESSPrecio.length} estaciones desde ${url}`
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ha ocurrido un error');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Debounced function to filter stations based on the search term.
   * @param {Station[]} stations - The list of stations to filter.
   * @param {string} municipality - The municipality to filter by.
   */
  const debouncedFilterStations = useMemo(() => {
    return debounce((stations: Station[], municipality: string) => {
      setFilteredStations(
        stations.filter((station) =>
          station['Municipio']
            .toLocaleLowerCase()
            .includes(municipality.toLowerCase())
        )
      );
    }, 300);
  }, [setFilteredStations]);

  /**
   * Effect to fetch stations when the region changes.
   */
  useEffect(() => {
    if (regionCode) {
      fetchStations(`/api/gas-stations/${regionCode}`);
      setUseLocation(false); // Reset geolocation when region changes
      setSearchTerm(''); // Reset search term when region changes
    } else {
      setStations([]);
      setFilteredStations([]);
    }
  }, [regionCode]);

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
        3
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
    if (!regionCode) return; // Require region selection
    setUseLocation(true);
    setSearchTerm('');
    getCurrentLocation();
    fetchStations(`/api/gas-stations/${regionCode}`);
  };

  /**
   * Clears all selections and resets the state.
   */
  const clearSelections = () => {
    setRegionCode('');
    setSearchTerm('');
    setUseLocation(false);
    setFilteredStations([]);
  };

  /**
   * Calculates the map center based on location or region.
   */
  const mapCenter: [number, number] =
    useLocation && latitude && longitude
      ? [latitude, longitude]
      : regionCode && REGION_CENTERS[regionCode]
      ? REGION_CENTERS[regionCode]
      : [40.4168, -3.7038]; // Default center (Madrid)

  const defaultZoom = 6;
  const regionZoom = 7;
  const locationZoom = 12; // or any zoom level you prefer for GPS

  /**
   * Calculates the zoom level based on location or region.
   */
  const zoom =
    useLocation && latitude && longitude
      ? locationZoom
      : regionCode && REGION_CENTERS[regionCode]
      ? regionZoom
      : defaultZoom;

  /**
   * Determines whether to show distance information.
   */
  const showDistance = useLocation && latitude && longitude ? true : false;

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
   * State for the selected fuel type.
   */
  const [selectedFuel, setSelectedFuel] = useState<keyof Station>(
    FUEL_TYPES[0].key
  );

  /**
   * Calculates the average price for the selected fuel type.
   * @param stations - Array of stations.
   * @param priceKey - Selected fuel price key.
   * @returns Average price as a number.
   */
  const getAveragePrice = (stations: Station[], priceKey: keyof Station) => {
    const prices = stations
      .map((s) => parseFloat(s[priceKey].replace(',', '.')))
      .filter((p) => !isNaN(p));
    if (prices.length === 0) return 0;
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  };

  /**
   * Memoized value for the average price of the selected fuel type.
   */
  const averagePrice = useMemo(
    () => getAveragePrice(filteredStations, selectedFuel as keyof Station),
    [filteredStations, selectedFuel]
  );

  return (
    <main className={styles.container}>
      <div className={styles.listHeader}>
        <Select regionCode={regionCode} setRegionCode={setRegionCode} />
        <LocationButton
          onClick={handleLocationClick}
          loading={locationLoading}
          disabled={!regionCode || (useLocation && !latitude && !longitude)}
        />
        {(error || locationError) && <p style={{ color: 'red' }}>{error}</p>}
        {!useLocation && (
          <InputField
            type="text"
            placeholder="Introduce el municipio_"
            searchTerm={searchTerm}
            onInputChange={setSearchTerm}
            disabled={!regionCode}
          />
        )}
        <GasTypeSelector
          priceKey={selectedFuel as string}
          onChange={(key) => setSelectedFuel(key as keyof Station)}
        />
        <ClearButton clearSelections={clearSelections} />
        {!loading &&
          useLocation &&
          latitude &&
          longitude &&
          filteredStations.length > 0 && (
            <LocationInfo count={filteredStations.length} />
          )}
      </div>

      <GasStationsMap
        stations={filteredStations}
        center={mapCenter}
        showDistance={showDistance}
        zoom={zoom}
        priceKey={selectedFuel as keyof Station}
        averagePrice={averagePrice}
      />
    </main>
  );
}
