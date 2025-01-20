'use client';
import styles from './page.module.css';
import { Select } from './modules/Select/Select';
import { PcInput } from './modules/PcInput/PcInput';
import { ClearButton } from './modules/ClearButton/ClearButton';
import { StationCard } from './modules/StationCard/StationCard';
import { useState, useEffect } from 'react';

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

/**
 * The Home component fetches and displays gas stations information.
 *
 * @returns {JSX.Element} The Home component.
 */
export default function Home(): JSX.Element {
  const [comunityCode, setComunityCode] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [postalCode, setPostalCode] = useState('');
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Fetches the gas stations data from the given URL.
   *
   * @param {string} url - The URL to fetch the gas stations data from.
   */
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
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations('/api/gas-stations');
  }, []);

  useEffect(() => {
    if (stations.length > 0) {
      setFilteredStations(
        stations.filter((station) => station['C.P.'].includes(postalCode))
      );
    }
  }, [postalCode, stations]);

  useEffect(() => {
    if (comunityCode) {
      fetchStations(`/api/gas-stations/${comunityCode}`);
    }
  }, [comunityCode]);

  /**
   * Clears the community code and postal code selections.
   */
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
          {filteredStations.map((station, index) => (
            <StationCard key={index} station={station} />
          ))}
        </div>
      )}
    </main>
  );
}
