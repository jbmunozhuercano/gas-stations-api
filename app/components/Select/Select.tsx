import { JSX } from 'react';
import styles from './Select.module.css';

/**
 * The Select component is a dropdown that allows the user to select a region
 * of Spain.
 *
 * @param {Object} props - The props object.
 * @param {string} props.regionCode - The code of the selected region.
 * @param {function} props.setRegionCode - A function to update the selected region.
 *
 * @returns {JSX.Element} The Select component.
 */

type SelectProps = {
  regionCode: string;
  setRegionCode: (regionCode: string) => void;
};

export function Select({
  regionCode,
  setRegionCode,
}: SelectProps): JSX.Element {
  return (
    <select
      className={styles.select}
      value={regionCode}
      onChange={(e) => setRegionCode(e.target.value)}
    >
      <option value="">Comunidad Autónoma</option>
      <option value="01">Andalucía</option>
      <option value="02">Aragón</option>
      <option value="03">Asturias</option>
      <option value="04">Baleares</option>
      <option value="05">Canarias</option>
      <option value="06">Cantabria</option>
      <option value="07">Castilla-La Mancha</option>
      <option value="08">Castilla y León</option>
      <option value="09">Cataluña</option>
      <option value="10">Valencia</option>
      <option value="11">Extremadura</option>
      <option value="12">Galicia</option>
      <option value="13">Madrid</option>
      <option value="14">Murcia</option>
      <option value="15">Navarra</option>
      <option value="16">País Vasco</option>
      <option value="17">La Rioja</option>
      <option value="18">Ceuta</option>
      <option value="19">Melilla</option>
    </select>
  );
}
