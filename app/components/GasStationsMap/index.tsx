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
  showDistance: boolean;
  zoom: number;
  priceKey: keyof GasStation;
  averagePrice: number;
}

// Custom marker icons
const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const yellowIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function GasStationsMap({
  stations,
  center,
  showDistance,
  zoom,
  priceKey,
  averagePrice,
}: GasStationsMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={styles.mapContainer}
      key={center.toString() + zoom}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stations.map((station, idx) => {
        const lat = parseFloat(station.Latitud.replace(',', '.'));
        const lon = parseFloat(station['Longitud (WGS84)'].replace(',', '.'));
        const price = parseFloat(station[priceKey].replace(',', '.'));
        if (isNaN(lat) || isNaN(lon) || isNaN(price)) return null;

        const EPSILON = 0.001; // tolerance for floating point comparison

        let icon = yellowIcon;
        if (price < averagePrice - EPSILON) icon = greenIcon;
        else if (price > averagePrice + EPSILON) icon = redIcon;
        // If price === averagePrice, keep yellowIcon

        return (
          <Marker key={idx} position={[lat, lon]} icon={icon}>
            <Popup>
              <StationCard station={station} showDistance={showDistance} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
