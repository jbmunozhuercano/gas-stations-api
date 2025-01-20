'use client';
import styles from './page.module.css';
import { Select } from './modules/Select/Select';
import { PcInput } from './modules/PcInput/PcInput';
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

export default function Home() {
  const [comunityCode, setComunityCode] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [postalCode, setPostalCode] = useState('');
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError(err.message);
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

  const clearSelections = () => {
    setComunityCode('');
    setPostalCode('');
    fetchStations('/api/gas-stations');
  };

  return (
    <main className={styles.container}>
      <Select comunityCode={comunityCode} setComunityCode={setComunityCode} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <PcInput postalCode={postalCode} setPostalCode={setPostalCode} />
      <button onClick={clearSelections}>Limpiar selección</button>
      {loading ? (
        <h3>Cargando...</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rótulo</th>
              <th>C.P.</th>
              <th>Municipio</th>
              <th>Horario</th>
              <th>Google Maps</th>
              <th>Gasoleo A</th>
              <th>Gasoleo Premium</th>
              <th>Gasolina 95</th>
              <th>Gasolina 98</th>
            </tr>
          </thead>
          <tbody>
            {filteredStations.map((station, index) => (
              <tr key={index}>
                <td>{station.Rótulo}</td>
                <td>{station['C.P.']}</td>
                <td>{station.Municipio}</td>
                <td>{station.Horario}</td>
                <td>
                  <a
                    href={`https://www.google.es/maps/place/${station.Latitud.replace(
                      ',',
                      '.'
                    )},${station['Longitud (WGS84)'].replace(',', '.')}`}
                    target="blank"
                  >
                    Abrir
                  </a>
                </td>
                <td>
                  {station['Precio Gasoleo A']
                    ? `${station['Precio Gasoleo A']}€`
                    : ''}
                </td>
                <td>
                  {station['Precio Gasoleo Premium']
                    ? `${station['Precio Gasoleo Premium']}€`
                    : ''}
                </td>
                <td>
                  {station['Precio Gasolina 95 E5']
                    ? `${station['Precio Gasolina 95 E5']}€`
                    : ''}
                </td>
                <td>
                  {station['Precio Gasolina 98 E5']
                    ? `${station['Precio Gasolina 98 E5']}€`
                    : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
