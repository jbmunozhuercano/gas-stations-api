/**
 * A button component that triggers a location-based action, such as fetching the user's current location.
 *
 * @param onClick - Callback function to be called when the button is clicked.
 * @param loading - Boolean indicating whether the location is currently being fetched.
 * @param disabled - Optional boolean to disable the button.
 * @returns A button element with a location icon and dynamic label based on loading state.
 */

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
