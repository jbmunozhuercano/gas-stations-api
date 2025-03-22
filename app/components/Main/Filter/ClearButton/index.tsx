import {ReactNode} from 'react';
import classes from './styles.module.css';

type ClearButtonProps = {
  onClear: () => void;
};

export default function ClearButton({onClear}: ClearButtonProps): ReactNode {
  return (
    <button className={classes.button} onClick={onClear}>
      Limpiar selección
    </button>
  );
}
