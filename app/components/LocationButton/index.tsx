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
    >
      <FontAwesomeIcon icon={faLocationDot} />
      {loading ? 'Obteniendo ubicación...' : 'Cerca de mí'}
    </button>
  );
}
