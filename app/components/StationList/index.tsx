import { useMemo, useRef, useState, useEffect, useCallback, JSX } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './StationList.module.css';
import type { Station } from '../../types/station';
import { isStationOpen } from '../../utils/stationHours';
import { sanitizeHtml } from '../../utils/sanitizeHtml';

interface StationListProps {
  stations: Station[];
  selectedFuel: string;
  searchTerm: string;
  useLocation: boolean;
  onStationClick: (station: Station) => void;
  favorites: string[];
  onToggleFavorite: (ideess: string) => void;
}

const MAX_ANIMATION_DELAY = 0.6;

export function StationList({
  stations,
  selectedFuel,
  searchTerm,
  useLocation,
  onStationClick,
  favorites,
  onToggleFavorite,
}: StationListProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const sortedStations = useMemo(() => {
    const sorted = [...stations].sort((a, b) => {
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
    const favs = sorted.filter((s) => favorites.includes(s.IDEESS));
    const nonFavs = sorted.filter((s) => !favorites.includes(s.IDEESS));
    return [...favs, ...nonFavs];
  }, [stations, selectedFuel, favorites]);

  const searchActive = searchTerm.trim() !== '' || useLocation;

  const favoriteStations = useMemo(
    () => sortedStations.filter((s) => favorites.includes(s.IDEESS)),
    [sortedStations, favorites],
  );

  // Desktop default view: show favorites in the right-side list until a search is made
  const showFavoritesOnly = isDesktop && !searchActive;
  const visibleStations = searchActive ? sortedStations : favoriteStations;

  const isVisible =
    (searchActive && sortedStations.length > 0) ||
    (showFavoritesOnly && favoriteStations.length > 0);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScroll(el.scrollHeight > el.clientHeight);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleStations.length, checkScroll]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    setCanScroll(!atBottom);
  }, []);

  const slideOffset = isDesktop ? 50 : 30;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className={styles.listContainer}
          initial={{ opacity: 0, y: slideOffset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: slideOffset }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onScroll={handleScroll}
        >
          {visibleStations.map((station, index) => {
            const isOpen = isStationOpen(station.Horario);
            const price = station[selectedFuel as keyof Station];
            const priceNum = parseFloat(String(price ?? '').replace(',', '.'));
            const delay = Math.min(index * 0.03, MAX_ANIMATION_DELAY);

            return (
              <motion.div
                className={styles.item}
                key={station.IDEESS}
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
                transition={{ delay, duration: 0.2 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(37, 66, 82, 0.9)' }}
                whileTap={{ scale: 0.97 }}
              >
                <button
                  className={`${styles.heart} ${favorites.includes(station.IDEESS) ? styles.heartFilled : styles.heartOutline}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(station.IDEESS);
                  }}
                  aria-label={
                    favorites.includes(station.IDEESS)
                      ? 'Quitar de favoritas'
                      : 'Marcar como favorita'
                  }
                  type="button"
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {favorites.includes(station.IDEESS) ? (
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    ) : (
                      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                    )}
                  </svg>
                </button>
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
