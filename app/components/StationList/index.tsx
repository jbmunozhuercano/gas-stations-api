import { useMemo, JSX } from 'react';
import styles from './StationList.module.css';
import type { Station } from '../../types/station';
import { isStationOpen } from '../../utils/stationHours';

interface StationListProps {
  stations: Station[];
  selectedFuel: string;
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;br\s*\/?&gt;/gi, '<br />');
}

export function StationList({
  stations,
  selectedFuel,
}: StationListProps): JSX.Element {
  const sortedStations = useMemo(() => {
    return [...stations].sort((a, b) => {
      const priceA = parseFloat(
        String(a[selectedFuel as keyof Station] ?? '').replace(',', '.'),
      );
      const priceB = parseFloat(
        String(b[selectedFuel as keyof Station] ?? '').replace(',', '.'),
      );
      const nanA = isNaN(priceA);
      const nanB = isNaN(priceB);
      if (nanA && nanB) return 0;
      if (nanA) return 1;
      if (nanB) return -1;
      return priceA - priceB;
    });
  }, [stations, selectedFuel]);

  if (sortedStations.length === 0) return <></>;

  return (
    <div className={styles.listContainer}>
      {sortedStations.map((station, index) => {
        const isOpen = isStationOpen(station.Horario);
        const price = station[selectedFuel as keyof Station];
        const priceNum = parseFloat(String(price ?? '').replace(',', '.'));
        const lat = station.Latitud.replace(',', '.');
        const lon = station['Longitud (WGS84)'].replace(',', '.');

        return (
          <div className={styles.item} key={`${station.Rótulo}-${index}`}>
            <div className={styles.name}>
              {station.Rótulo}
              {isOpen === false && (
                <span className={styles.closed}>Cerrada</span>
              )}
              <a
                className={`${styles.pinLink} ${isOpen === false ? styles.pinLinkDisabled : ''}`}
                href={`https://www.google.es/maps/place/${lat},${lon}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${station.Rótulo} en Google Maps`}
                aria-disabled={isOpen === false}
                tabIndex={isOpen === false ? -1 : 0}
              >
                <svg
                  className={styles.pinIcon}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </a>
            </div>
            <div className={styles.details}>
              <span
                className={styles.horario}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    station.Horario.replace(';', ' '),
                  ),
                }}
              />
              {!isNaN(priceNum) ? (
                <span className={styles.price}>{price}€</span>
              ) : (
                <span className={styles.noPrice}>N/D</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
