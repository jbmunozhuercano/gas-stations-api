/**
 * The Footer component displays the footer of the app.
 *
 * @returns {JSX.Element} The Footer component.
 */

import { JSX } from 'react';
import style from './Footer.module.css';

const actualYear = new Date().getFullYear();

export function Footer(): JSX.Element {
  return (
    <footer className={style.footer}>
      <p>
        <small>
          &copy; {actualYear} - Precio combustible Estaciones de Servicio en
          España
        </small>
      </p>
    </footer>
  );
}
