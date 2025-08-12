import { JSX } from 'react';
import sytles from './GasTypeSelector.module.css';

/**
 * GasTypeSelector component allows the user to select the type of fuel for price comparison.
 *
 * @param {Object} props - The props for GasTypeSelector.
 * @param {string} props.priceKey - The currently selected fuel price key.
 * @param {(key: string) => void} props.onChange - Callback function to handle fuel type change.
 * @returns {JSX.Element} The rendered GasTypeSelector component.
 */
export function GasTypeSelector({
  priceKey,
  onChange,
}: {
  priceKey: string;
  onChange: (key: string) => void;
}): JSX.Element {
  return (
    <div className={sytles.container}>
      <select
        className={sytles.select}
        value={priceKey}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Precio Gasoleo A">Gasóleo A</option>
        <option value="Precio Gasoleo Premium">Gasóleo Premium</option>
        <option value="Precio Gasolina 95 E5">Gasolina 95 E5</option>
        <option value="Precio Gasolina 98 E5">Gasolina 98 E5</option>
      </select>
    </div>
  );
}
