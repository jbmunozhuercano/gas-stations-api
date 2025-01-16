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
      <button onClick={fetchStations}>Mostrar</button>
      <ul>
        {stations.map((station, index) => (
          <li key={index}>{station.Municipio}</li>
        ))}
      </ul>
    </div>
  );
}
