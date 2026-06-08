import { JSX, useEffect, useState } from 'react';
import styles from './Select.module.css';

type SelectProps = {
  regionCode: string;
  setRegionCode: (regionCode: string) => void;
};

type Community = {
  IDCCAA: string;
  CCAA: string;
};

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

export function Select({
  regionCode,
  setRegionCode,
}: SelectProps): JSX.Element {
  const [communities, setCommunities] = useState<Community[]>([]);
  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await fetch('/api/region/');
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  return (
    <select
      id="region-select"
      className={styles.select}
      value={regionCode}
      onChange={(e) => setRegionCode(e.target.value)}
      aria-label="Selecciona una comunidad autónoma"
    >
      <option value="">Selecciona una comunidad autónoma</option>
      {communities.map((community) => (
        <option key={community.IDCCAA} value={community.IDCCAA}>
          {community.CCAA}
        </option>
      ))}
    </select>
  );
}
