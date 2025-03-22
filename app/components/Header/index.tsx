import {ReactNode} from 'react';
import classes from './styles.module.css';

const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export default function Header(): ReactNode {
  return (
    <header className={classes.header}>
      <h1>Precio combustible Estaciones de Servicio en España</h1>
      <h2>
        <span>Fecha actualización:</span> {yesterday}
      </h2>
    </header>
  );
}
