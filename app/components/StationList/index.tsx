import { useMemo, useRef, useState, useEffect, JSX } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './StationList.module.css';
import type { Station } from '../../types/station';
import { isStationOpen } from '../../utils/stationHours';

interface StationListProps {
  stations: Station[];
  selectedFuel: string;
  searchTerm: string;
  useLocation: boolean;
  onStationClick: (station: Station) => void;
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
  searchTerm,
  useLocation,
  onStationClick,
}: StationListProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

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

  const isVisible = (searchTerm.trim() !== '' || useLocation) && sortedStations.length > 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScroll(el.scrollHeight > el.clientHeight);
    };

    checkScroll();

    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);

    return () => observer.disconnect();
  }, [sortedStations.length]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    setCanScroll(!atBottom);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className={styles.listContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onScroll={handleScroll}
        >
          {sortedStations.map((station, index) => {
            const isOpen = isStationOpen(station.Horario);
            const price = station[selectedFuel as keyof Station];
            const priceNum = parseFloat(String(price ?? '').replace(',', '.'));

            return (
              <motion.div
                className={styles.item}
                key={`${station.Rótulo}-${index}`}
                onClick={() => onStationClick(station)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStationClick(station);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Ver ${station.Rótulo} en el mapa`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(37, 66, 82, 0.9)' }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={styles.name}>
                  {station.Rótulo}
                  {isOpen === false && (
                    <span className={styles.closed}>Cerrada</span>
                  )}
                </div>
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
              </motion.div>
            );
          })}
          <div className={`${styles.scrollIndicator} ${canScroll ? styles.visible : ''}`}>
            <span className={styles.scrollArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
