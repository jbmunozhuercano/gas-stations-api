'use client';
import { useState, useEffect, useMemo, JSX } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import styles from './page.module.css';
import { Select } from './components/Select';
import { InputField } from './components/InputField';
import { ClearButton } from './components/ClearButton';
import { StationCard } from './components/StationCard';
import { Pagination } from './components/Pagination';

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
    if (stations.length > 0) {
      debouncedFilterStations(stations, searchTerm);
    }
  }, [searchTerm, stations, debouncedFilterStations]);

  // Fetch stations data for the selected community code
  useEffect(() => {
    if (regionCode) {
      fetchStations(`/api/gas-stations/${regionCode}`);
    }
  }, [regionCode]);

  // Clears all selections and resets the state
  const clearSelections = () => {
    setRegionCode('');
    setSearchTerm('');
    setStations(stations);
  };

  return (
    <main className={styles.container}>
      <div className={styles.listHeader}>
        <Select regionCode={regionCode} setRegionCode={setRegionCode} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <InputField
          type="text"
          placeholder="Introduce el municipio"
          searchTerm={searchTerm}
          onInputChange={setSearchTerm}
        />
        <ClearButton clearSelections={clearSelections} />
      </div>
      {loading ? (
        <h3 className={styles.loading}>Cargando...</h3>
      ) : (
        <div className={styles.cardsContainer}>
          {currentItems.map((station, index) => (
            <StationCard key={index} station={station} loading={loading} />
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
