import { useEffect, useState } from 'react';
import styles from './LocationInfo.module.css';

export function LocationInfo({
  count,
  useLocation,
  selectedFuel,
  averagePrice,
}: {
  count: number;
  useLocation: boolean;
  selectedFuel?: string;
  averagePrice: number;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.locationInfo}>
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
        Precio medio para <span>{selectedFuel}</span> es de
        <span>&nbsp;{averagePrice.toFixed(2).replace('.', ',')} €</span>
      </p>
    </div>
  );
}
