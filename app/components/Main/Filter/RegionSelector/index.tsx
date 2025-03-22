import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';
import classes from './styles.module.css';
import {fetchRegions, Region, RegionCode} from '@/app/api';

type RegionSelectorProps = {
  regionCode: RegionCode;
  onRegionChange: (regionCode: RegionCode) => void;
};

export default function RegionSelector({
  regionCode,
  onRegionChange
}: RegionSelectorProps): ReactNode {
  const [regions, setRegions] = useState<Region[]>([]);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    event => onRegionChange(event.target.value || null),
    [onRegionChange]
  );

  useEffect(() => {
    (async function () {
      setRegions(await fetchRegions());
    })();
  }, []);

  return (
    <select
      className={classes.select}
      value={regionCode || ''}
      onChange={handleChange}
    >
      <option value=''>Comunidad Autónoma</option>
      {regions.map(region => (
        <option key={region.IDCCAA} value={region.IDCCAA}>
          {region.CCAA}
        </option>
      ))}
    </select>
  );
}
