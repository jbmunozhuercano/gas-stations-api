/**
 * The ClearButton component is a button that clears the current selections.
 *
 * @param {Object} props - The props object.
 * @param {function} props.clearSelections - A function to clear the current selections.
 *
 * @returns {JSX.Element} The ClearButton component.
 */

import styles from './ClearButton.module.css';

type ClearButtonProps = {
  clearSelections: () => void;
};

export function ClearButton({
  clearSelections,
}: ClearButtonProps): JSX.Element {
  return (
    <button className={styles.button} onClick={clearSelections}>
      Limpiar selección
    </button>
  );
}
