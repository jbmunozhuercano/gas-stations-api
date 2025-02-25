import style from './Footer.module.css';

/**
 * The Footer component displays the footer of the app.
 *
 * @returns {JSX.Element} The Footer component.
 */

const actualYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={style.footer}>
      <p>
        &copy; {actualYear} - Precio combustible Estaciones de Servicio en
        España
      </p>
    </footer>
  );
}
