import {ChangeEventHandler, ReactNode, useCallback} from 'react';
import classes from './styles.module.css';

type SearchTermProps = {
  type: string;
  placeholder: string;
  term: string | null;
  onTermChange: (searchTerm: string) => void;
};

export default function SearchTerm({
  type = 'text',
  placeholder,
  term,
  onTermChange
}: SearchTermProps): ReactNode {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const value = event.target.value;
      const regex = /^[a-zA-Z]*$/;
      if (regex.test(value)) {
        onTermChange(value);
      }
    },
    [onTermChange]
  );

  return (
    <input
      className={classes.input}
      type={type}
      placeholder={placeholder}
      value={term || ''}
      onChange={handleChange}
    />
  );
}
