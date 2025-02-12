'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import styles from './page.module.css';
import { Select } from './modules/Select/Select';
import { InputField } from './modules/InputField/InputField';
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
  const [searchTerm, setSearchTerm] = useState('');
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

  const debouncedFilterStations = useCallback(
    debounce((stations: Station[], municipality: string) => {
      setFilteredStations(
        stations.filter((station) =>
          station['Municipio']
            .toLocaleLowerCase()
            .includes(municipality.toLowerCase())
        )
      );
    }, 300),
    []
  );

  useEffect(() => {
    fetchStations('/api/gas-stations');
  }, []);

  useEffect(() => {
    if (stations.length > 0) {
      debouncedFilterStations(stations, searchTerm);
    }
  }, [searchTerm, stations, debouncedFilterStations]);

  useEffect(() => {
    if (comunityCode) {
      fetchStations(`/api/gas-stations/${comunityCode}`);
    }
  }, [comunityCode]);

  const clearSelections = () => {
    setComunityCode('');
    setSearchTerm('');
    setStations(stations);
  };

  return (
    <main className={styles.container}>
      <div className={styles.listHeader}>
        <Select comunityCode={comunityCode} setComunityCode={setComunityCode} />
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
