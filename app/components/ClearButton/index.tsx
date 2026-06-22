import { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './ClearButton.module.css';

type ClearButtonProps = {
  clearSelections: () => void;
};

export function ClearButton({
  clearSelections,
}: ClearButtonProps): JSX.Element {
  return (
    <button
      className={styles.button}
      onClick={clearSelections}
      aria-label="Limpiar todas las selecciones"
    >
      <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
      <span className={styles.label}>Limpiar</span>
    </button>
  );
}
