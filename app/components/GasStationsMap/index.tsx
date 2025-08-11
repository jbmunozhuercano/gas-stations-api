import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './GasStationsMap.module.css';
import { StationCard } from '../StationCard';

// Fix default icon issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface GasStation {
  Latitud: string;
  'Longitud (WGS84)': string;
  Rótulo: string;
  Municipio: string;
  'C.P.': string;
  Horario: string;
  'Precio Gasoleo A': string;
  'Precio Gasoleo Premium': string;
  'Precio Gasolina 95 E5': string;
  'Precio Gasolina 98 E5': string;
}

interface GasStationsMapProps {
  stations: GasStation[];
  center: LatLngExpression;
  zoom: number;
}

export function GasStationsMap({
  stations,
  center,
  zoom,
}: GasStationsMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '720px', width: '100%' }}
      key={center.toString() + zoom} // Ensures map recenters and zooms when changed
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stations.map((station, idx) => {
        const lat = parseFloat(station.Latitud.replace(',', '.'));
        const lon = parseFloat(station['Longitud (WGS84)'].replace(',', '.'));
        if (isNaN(lat) || isNaN(lon)) return null;
        return (
          <Marker key={idx} position={[lat, lon]}>
            <Popup className={styles.popup}>
              <StationCard station={station} showDistance={false} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
