/**
 * The PcInput component is an input field that allows the user to filter stations by postal code.
 *
 * @param {Object} props - The props object.
 * @param {string} props.postalCode - The current postal code value.
 * @param {function} props.setPostalCode - A function to update the postal code value.
 *
 * @returns {React.JSX.Element} The PcInput component.
 */

import { JSX } from 'react';
import styles from './InputField.module.css';

type InputProps = {
  type: string;
  placeholder: string;
  searchTerm: string;
  onInputChange: (searchTerm: string) => void;
};

export function InputField({
  type = 'text',
  placeholder,
  searchTerm,
  onInputChange,
}: InputProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(value)) {
      onInputChange(value);
    }
  };

  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleChange}
    />
  );
}
