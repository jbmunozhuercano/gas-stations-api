/**
 * The PcInput component is an input field that allows the user to filter stations by postal code.
 *
 * @param {Object} props - The props object.
 * @param {string} props.postalCode - The current postal code value.
 * @param {function} props.setPostalCode - A function to update the postal code value.
 *
 * @returns {React.JSX.Element} The PcInput component.
 */

import styles from './PcInput.module.css';

type PcInputProps = {
  postalCode: string;
  setPostalCode: (postalCode: string) => void;
};

export function PcInput({
  postalCode,
  setPostalCode,
}: PcInputProps): JSX.Element {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Filtrar por C.P."
      value={postalCode}
      onChange={(e) => setPostalCode(e.target.value)}
    />
  );
}
