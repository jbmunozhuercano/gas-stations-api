import { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styles from './LocationButton.module.css';

interface LocationButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export function LocationButton({
  onClick,
  loading,
  disabled,
}: LocationButtonProps): JSX.Element {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={loading ? 'Obteniendo ubicación...' : 'Buscar gasolineras cerca de mí'}
    >
      <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
      <span className={styles.label}>{loading ? 'Obteniendo...' : 'Cerca de mí'}</span>
    </button>
  );
}
