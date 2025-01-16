'use client';
import { useState } from 'react';

export default function Home() {
  const [comunityCode, setComunityCode] = useState('');
  const [stations, setStations] = useState<any[]>([]);

  const fetchStations = async () => {
    const response = await fetch(`/api/gas-stations/${comunityCode}`);

    if (!response.ok) {
      console.error('Failed to fetch stations');
      return;
    }

    const data = await response.json();
    console.log(data.ListaEESSPrecio);
    setStations(data.ListaEESSPrecio);
  };

  return (
    <div>
      <h1>Estaciones de servicio por Comunidad Autónoma</h1>
      <input
        type="text"
        value={comunityCode}
        onChange={(e) => setComunityCode(e.target.value)}
        placeholder="Introduzca la Comunidad Autónoma"
      />
      <button onClick={fetchStations}>Fetch Stations</button>
      <ul>
        {stations.map((station, index) => (
          <li key={index}>{station.Municipio}</li>
        ))}
      </ul>
    </div>
  );
}
