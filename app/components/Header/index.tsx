import { JSX } from 'react';
import styles from './Header.module.css';

/**
 * The Header component displays the title of the app and the date of the last
 * update.
 *
 * @returns {JSX.Element} The Header component.
 */

export function Header(): JSX.Element {
  const today = new Date(Date.now()).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className={styles.header}>
      <h1>Precio combustible Estaciones de Servicio de España</h1>
      <p>
        <span>Fecha actualización:</span>{' '}
        <time dateTime={new Date().toISOString().split('T')[0]} suppressHydrationWarning>
          {today}
        </time>
      </p>
    </header>
  );
}
