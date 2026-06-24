import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './GasStationsMap.module.css';
import { StationCard } from '../StationCard';
import type { Station } from '../../types/station';
import { isStationOpen } from '../../utils/stationHours';
import { parseCoordinate } from '../../utils/parseCoordinate';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface GasStationsMapProps {
  stations: Station[];
  center: LatLngExpression;
  showDistance: boolean;
  zoom: number;
  priceKey: keyof Station;
  averagePrice: number;
  focusedStation: Station | null;
}

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
const greyIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function MapController({
  focusedStation,
  markerRefs,
}: {
  focusedStation: Station | null;
  markerRefs: React.MutableRefObject<Map<string, L.Marker>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!focusedStation) return;

    const lat = parseCoordinate(focusedStation.Latitud);
    const lon = parseCoordinate(focusedStation['Longitud (WGS84)']);
    if (isNaN(lat) || isNaN(lon)) return;

    map.flyTo([lat, lon], 16, { duration: 0.5 });

    const key = `${focusedStation.Rótulo}-${focusedStation.Latitud}`;
    const marker = markerRefs.current.get(key);
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 600);
    }
  }, [focusedStation, map, markerRefs]);

  return null;
}

export default function GasStationsMap({
  stations,
  center,
  showDistance,
  zoom,
  priceKey,
  averagePrice,
  focusedStation,
}: GasStationsMapProps) {
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={styles.mapContainer}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater center={center} zoom={zoom} />
      <MapController focusedStation={focusedStation} markerRefs={markerRefs} />
      {stations.map((station) => {
        const lat = parseCoordinate(station.Latitud);
        const lon = parseCoordinate(station['Longitud (WGS84)']);
        const price = parseFloat(String(station[priceKey] ?? '').replace(',', '.'));
        if (isNaN(lat) || isNaN(lon) || isNaN(price)) return null;

        const EPSILON = 0.001;
        const isOpen = isStationOpen(station.Horario);

        let icon = yellowIcon;
        if (isOpen === false) {
          icon = greyIcon;
        } else if (price < averagePrice - EPSILON) {
          icon = greenIcon;
        } else if (price > averagePrice + EPSILON) {
          icon = redIcon;
        }

        const key = `${station.Rótulo}-${station.Latitud}`;

        return (
          <Marker
            key={key}
            position={[lat, lon]}
            icon={icon}
            ref={(ref) => {
              if (ref) {
                markerRefs.current.set(key, ref);
              }
            }}
          >
            <Popup>
              <StationCard station={station} showDistance={showDistance} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
