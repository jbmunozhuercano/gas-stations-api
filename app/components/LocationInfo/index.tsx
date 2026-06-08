import { useEffect, useState } from 'react';
import styles from './LocationInfo.module.css';

export function LocationInfo({
  count,
  useLocation,
  selectedFuelLabel,
  averagePrice,
}: {
  count: number;
  useLocation: boolean;
  selectedFuelLabel?: string;
  averagePrice: number;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [count, useLocation, selectedFuelLabel, averagePrice]);

  if (!visible) return null;

  return (
    <div className={styles.locationInfo} role="status" aria-live="polite">
      {useLocation && (
        <p>
          Mostrando gasolineras en un radio de <span>3km</span> de tu ubicación
          actual.
        </p>
      )}
      <p>
        Encontradas: <span>{count} gasolineras.</span>
      </p>
      <p>
        Precio medio para <span>{selectedFuelLabel}</span> es de
        <span>&nbsp;{averagePrice.toFixed(2).replace('.', ',')} €</span>
      </p>
    </div>
  );
}
