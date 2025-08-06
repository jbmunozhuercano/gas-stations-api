'use client';
import { useState, useEffect, useMemo, JSX } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import styles from './page.module.css';
import { Select } from './components/Select';
import { InputField } from './components/InputField';
import { ClearButton } from './components/ClearButton';
import { LocationButton } from './components/LocationButton';
import { StationCard } from './components/StationCard';
import { Pagination } from './components/Pagination';
import { useGeolocation } from './hooks/useGeolocation';
import { filterStationsByDistance } from './utils/distance';

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
  const itemsPerPage = 20; // Number of items to display per page
  const [regionCode, setRegionCode] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [useLocation, setUseLocation] = useState(false);

  const {
    latitude,
    longitude,
    error: locationError,
    loading: locationLoading,
    getCurrentLocation,
  } = useGeolocation();

  // Calculate the indices for the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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

  // Filter stations whenever the search term or stations data changes
  useEffect(() => {
    if (useLocation && latitude && longitude && stations.length > 0) {
      const nearbyStations = filterStationsByDistance(
        stations,
        latitude,
        longitude,
        3
      );
      setFilteredStations(nearbyStations);
    } else if (stations.length > 0 && !useLocation) {
      debouncedFilterStations(stations, searchTerm);
    }
  }, [
    useLocation,
    latitude,
    longitude,
    stations,
    searchTerm,
    debouncedFilterStations,
  ]);

  // Fetch stations data for the selected community code
  useEffect(() => {
    if (regionCode) {
      fetchStations(`/api/gas-stations/${regionCode}`);
    }
  }, [regionCode]);

  // Fetch all stations when using location
  useEffect(() => {
    if (useLocation && latitude && longitude) {
      fetchStations('/api/gas-stations');
    }
  }, [useLocation, latitude, longitude]);

  // Handle location button click
  const handleLocationClick = () => {
    setUseLocation(true);
    setRegionCode('');
    setSearchTerm('');
    getCurrentLocation();
  };

  // Clears all selections and resets the state
  const clearSelections = () => {
    setRegionCode('');
    setSearchTerm('');
    setUseLocation(false);
    setStations(stations);
    setFilteredStations([]);
  };

  return (
    <main className={styles.container}>
      <div className={styles.listHeader}>
        <Select regionCode={regionCode} setRegionCode={setRegionCode} />
        <LocationButton
          onClick={handleLocationClick}
          loading={locationLoading}
          disabled={useLocation && !latitude}
        />
        {(error || locationError) && <p style={{ color: 'red' }}>{error}</p>}
        {!useLocation && (
          <InputField
            type="text"
            placeholder="Introduce el municipio_"
            searchTerm={searchTerm}
            onInputChange={setSearchTerm}
          />
        )}
        <ClearButton clearSelections={clearSelections} />
      </div>
      {useLocation && latitude && longitude && filteredStations.length > 0 && (
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
      {loading ? (
        <h3 className={styles.loading}>Cargando...</h3>
      ) : (
        <div className={styles.cardsContainer}>
          {currentItems.map((station, index) => (
            <StationCard
              key={index}
              station={station}
              loading={loading}
              showDistance={useLocation}
            />
          ))}
        </div>
      )}
      {itemsPerPage < filteredStations.length && (
        <Pagination
          filteredStations={filteredStations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </main>
  );
}
