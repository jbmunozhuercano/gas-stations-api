import { JSX } from 'react';
import styles from './StationCard.module.css';
import type { Station } from '../../types/station';
import { isStationOpen } from '../../utils/stationHours';

function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;br\s*\/?&gt;/gi, '<br />');
}

interface StationCardProps {
  station: Station;
  showDistance?: boolean;
}

/**
 * Generates a gas station card component with all the elements.
 *
 * @param {StationCardProps} props - The props for the StationCard component.
 * @param {Station} props.station - The gas station data to display.
 * @returns {JSX.Element} The StationCard component.
 */

export function StationCard({
  station,
  showDistance = false,
}: StationCardProps): JSX.Element {
  const isOpen = isStationOpen(station.Horario);

  return (
    <div className={styles.card}>
      <h4>
        {station.Rótulo}
        {isOpen === false && (
          <span className={styles.closed}> — Cerrada</span>
        )}
      </h4>
      <dl>
        <dt>Municipio</dt>
        <dd>{station.Municipio}</dd>

        <dt>C.P.</dt>
        <dd>{station['C.P.']}</dd>

        <dt>Horario</dt>
        <dd
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(station.Horario.replace(';', '<br />')),
          }}
        ></dd>

        <dt>Gasoleo A</dt>
        <dd>
          {station['Precio Gasoleo A']
            ? `${station['Precio Gasoleo A']}€`
            : 'N/D'}
        </dd>

        <dt>Gasoleo Prem.</dt>
        <dd>
          {station['Precio Gasoleo Premium']
            ? `${station['Precio Gasoleo Premium']}€`
            : 'N/D'}
        </dd>

        <dt>Gasolina 95</dt>
        <dd>
          {station['Precio Gasolina 95 E5']
            ? `${station['Precio Gasolina 95 E5']}€`
            : 'N/D'}
        </dd>

        <dt>Gasolina 98</dt>
        <dd>
          {station['Precio Gasolina 98 E5']
            ? `${station['Precio Gasolina 98 E5']}€`
            : 'N/D'}
        </dd>

        {showDistance && station.distance && (
          <>
            <dt>Distancia</dt>
            <dd>{station.distance.toString().replace('.', ',')} km</dd>
          </>
        )}
      </dl>
      <a
        className={styles.link}
        href={`https://www.google.es/maps/place/${station.Latitud.replace(
          ',',
          '.'
        )},${station['Longitud (WGS84)'].replace(',', '.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${station.Rótulo} en Google Maps`}
      >
        <h5>Google Maps</h5>
      </a>
    </div>
  );
}
