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

import { JSX, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Select.module.css';

type SelectProps = {
  regionCode: string;
  setRegionCode: (regionCode: string) => void;
};

type Community = {
  IDCCAA: string;
  CCAA: string;
};

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
      const response = await axios.get('/api/region/');
      setCommunities(response.data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  return (
    <select
      className={styles.select}
      value={regionCode}
      onChange={(e) => setRegionCode(e.target.value)}
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
