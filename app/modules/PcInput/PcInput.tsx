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
