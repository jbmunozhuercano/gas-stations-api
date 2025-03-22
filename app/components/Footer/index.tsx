import {ReactNode} from 'react';
import classes from './styles.module.css';

const actualYear = new Date().getFullYear();

export default function Footer(): ReactNode {
  return (
    <footer className={classes.footer}>
      <p>
        <small>
          &copy; {actualYear} - Precio combustible Estaciones de Servicio en
          España
        </small>
      </p>
    </footer>
  );
}
