import { JSX } from 'react';
import styles from './Header.module.css';
/**
 * The Header component displays the title of the app and the date of the last
 * update.
 *
 * @returns {JSX.Element} The Header component.
 */

export function Header(): JSX.Element {
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString(
    'es-ES',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <header className={styles.header}>
      <h1>Precio combustible Estaciones de Servicio en España</h1>
      <h2>
        <span>Fecha actualización:</span> {yesterday}
      </h2>
    </header>
  );
}
