'use client';
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

  const handleFetchStations = () => {
    if (comunityCode) {
      fetchStations(`/api/gas-stations/${comunityCode}`);
    } else {
      setError('Por favor, selecciona una Comunidad Autónoma');
    }
  };

  return (
    <div>
      <h1>Estaciones de servicio por Comunidad Autónoma</h1>
      <select
        value={comunityCode}
        onChange={(e) => setComunityCode(e.target.value)}
      >
        <option value="">Comunidad Autónoma</option>
        <option value="01">Andalucía</option>
        <option value="02">Aragón</option>
        <option value="03">Asturias</option>
        <option value="04">Baleares</option>
        <option value="05">Canarias</option>
        <option value="06">Cantabria</option>
        <option value="07">Castilla-La Mancha</option>
        <option value="08">Castilla y León</option>
        <option value="09">Cataluña</option>
        <option value="10">Valencia</option>
        <option value="11">Extremadura</option>
        <option value="12">Galicia</option>
        <option value="13">Madrid</option>
        <option value="14">Murcia</option>
        <option value="15">Navarra</option>
        <option value="16">País Vasco</option>
        <option value="17">La Rioja</option>
        <option value="18">Ceuta</option>
        <option value="19">Melilla</option>
      </select>
      <button onClick={handleFetchStations} disabled={loading}>
        {loading ? 'Cargando...' : 'Mostrar'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Filtrar por C.P."
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Rótulo</th>
            <th>C.P.</th>
            <th>Municipio</th>
            <th>Horario</th>
            <th>Ir</th>
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
                  Google Maps
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
    </div>
  );
}
