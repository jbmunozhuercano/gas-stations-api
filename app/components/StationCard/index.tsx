import { JSX } from 'react';
import styles from './StationCard.module.css';
import type { Station } from '../../types/station';
import { isStationOpen } from '../../utils/stationHours';
import { sanitizeHtml } from '../../utils/sanitizeHtml';

interface StationCardProps {
  station: Station;
  showDistance?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (ideess: string) => void;
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
  isFavorite = false,
  onToggleFavorite,
}: StationCardProps): JSX.Element {
  const isOpen = isStationOpen(station.Horario);

  return (
    <div className={styles.card}>
      <h4>
        {onToggleFavorite && (
          <button
            className={`${styles.heart} ${isFavorite ? styles.heartFilled : styles.heartOutline}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(station.IDEESS);
            }}
            aria-label={
              isFavorite ? 'Quitar de favoritas' : 'Marcar como favorita'
            }
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isFavorite ? (
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              ) : (
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              )}
            </svg>
          </button>
        )}
        {station.Rótulo}
        {isOpen === false && (
          <span className={styles.closed}> Cerrada</span>
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
        className={`${styles.link} ${isOpen === false ? styles.linkDisabled : ''}`}
        href={`https://www.google.es/maps/place/${station.Latitud.replace(
          ',',
          '.'
        )},${station['Longitud (WGS84)'].replace(',', '.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${station.Rótulo} en Google Maps`}
        aria-disabled={isOpen === false}
        tabIndex={isOpen === false ? -1 : 0}
      >
        <h5>Google Maps</h5>
      </a>
    </div>
  );
}
