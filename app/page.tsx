'use client';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import styles from './page.module.css';
import { Select } from './modules/Select/Select';
import { PcInput } from './modules/PcInput/PcInput';
import { ClearButton } from './modules/ClearButton/ClearButton';
import { StationCard } from './modules/StationCard/StationCard';
import { Pagination } from './modules/Pagination/Pagination';

interface Station {
  Municipio: string;
  Rótulo: string;
  'C.P.': string;
  Horario: string;
  Latitud: string;
  'Longitud (WGS84)': string;
  'Precio Gasolina 95 E5': string;
  'Precio Gasolina 98 E5': string;
}

export default function Home(): JSX.Element {
  const itemsPerPage = 20;
  const [comunityCode, setComunityCode] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [postalCode, setPostalCode] = useState('');
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const fetchStations = async (url: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error('Error al cargar las estaciones');
        return;
      }

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
  };

  const debouncedFilterStations = useCallback(
    debounce((stations: Station[], postalCode: string) => {
      setFilteredStations(
        stations.filter((station) => station['C.P.'].includes(postalCode))
      );
    }, 300),
    []
  );

  useEffect(() => {
    fetchStations('/api/gas-stations');
  }, []);

  useEffect(() => {
    if (stations.length > 0) {
      debouncedFilterStations(stations, postalCode);
    }
  }, [postalCode, stations, debouncedFilterStations]);

  useEffect(() => {
    if (comunityCode) {
      fetchStations(`/api/gas-stations/${comunityCode}`);
    }
  }, [comunityCode]);

  const clearSelections = () => {
    setComunityCode('');
    setPostalCode('');
    setStations(stations);
  };

  return (
    <main className={styles.container}>
      <div className={styles.listHeader}>
        <Select comunityCode={comunityCode} setComunityCode={setComunityCode} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <PcInput postalCode={postalCode} setPostalCode={setPostalCode} />
        <ClearButton clearSelections={clearSelections} />
      </div>
      {loading ? (
        <h3 className={styles.loading}>Cargando...</h3>
      ) : (
        <div className={styles.cardsContainer}>
          {currentItems.map((station, index) => (
            <StationCard key={index} station={station} />
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
