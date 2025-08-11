'use client';
import { useState, useEffect, useMemo, JSX } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import styles from './page.module.css';
import 'leaflet/dist/leaflet.css';
import { Select } from './components/Select';
import { InputField } from './components/InputField';
import { ClearButton } from './components/ClearButton';
import { LocationButton } from './components/LocationButton';
import { useGeolocation } from './hooks/useGeolocation';
import { filterStationsByDistance } from './utils/distance';
import { GasStationsMap } from './components/GasStationsMap';
import { REGION_CENTERS } from './components/GasStationsMap/regionCenters';

// Interface representing a gas station.
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

  const {
    latitude,
    longitude,
    error: locationError,
    loading: locationLoading,
    getCurrentLocation,
  } = useGeolocation();

  /**
   * Fetches stations data from the API.
   * @param {string} url - The API endpoint to fetch data from.
   */
  const fetchStations = async (url: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(url);
      setStations(response.data.ListaEESSPrecio);
      console.log(
        `Fetched ${response.data.ListaEESSPrecio.length} stations from ${url}`
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

  // Fetch stations for the selected region
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

  // Filter stations by geolocation or municipality
  useEffect(() => {
    if (!regionCode || stations.length === 0) {
      setFilteredStations([]);
      return;
    }
    if (useLocation && latitude && longitude) {
      const nearbyStations = filterStationsByDistance(
        stations,
        latitude,
        longitude,
        3
      );
      setFilteredStations(nearbyStations);
    } else {
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

  // Fetch all stations when using location
  useEffect(() => {
    if (useLocation && latitude && longitude) {
      fetchStations(`/api/gas-stations/${regionCode}`);
    }
  }, [useLocation, latitude, longitude, regionCode]);

  // Handle location button click
  const handleLocationClick = () => {
    if (!regionCode) return; // Require region selection
    setUseLocation(true);
    setSearchTerm('');
    getCurrentLocation();
  };

  // Clears all selections and resets the state
  const clearSelections = () => {
    setRegionCode('');
    setSearchTerm('');
    setUseLocation(false);
    setFilteredStations([]);
  };

  const mapCenter: [number, number] =
    regionCode && REGION_CENTERS[regionCode]
      ? REGION_CENTERS[regionCode]
      : [40.4168, -3.7038]; // Default center (Madrid)

  const defaultZoom = 6;
  const regionZoom = 7;

  const zoom =
    regionCode && REGION_CENTERS[regionCode] ? regionZoom : defaultZoom;

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
        <ClearButton clearSelections={clearSelections} />
        {!loading &&
          useLocation &&
          latitude &&
          longitude &&
          filteredStations.length > 0 && (
            <div className={styles.locationInfo}>
              <p>
                Mostrando gasolineras en un radio de <span>3km</span> de tu
                ubicación actual.
              </p>
              <p>
                Encontradas: <span>{filteredStations.length} gasolineras.</span>
              </p>
            </div>
          )}
      </div>

      <GasStationsMap
        stations={filteredStations}
        center={mapCenter}
        zoom={zoom}
      />
    </main>
  );
}
