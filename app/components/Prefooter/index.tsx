import { JSX } from 'react';
import styles from './Prefooter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGasPump,
  faCarSide,
  faSquareCheck,
  faMagnifyingGlass,
  faThumbTack,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';

/**
 * The SeoText component displays the SEO text for the app.
 *
 * @returns {JSX.Element} The SeoText component.
 */
export function SeoText(): JSX.Element {
  return (
    <section className={styles.preFooter}>
      <div className={styles.seoText__inner}>
        <h2>
          <FontAwesomeIcon icon={faGasPump} color="#f9982f" /> Precios de
          Gasolina y Diésel en España - Encuentra la Gasolinera Más Barata Cerca
          de Ti
        </h2>
        <p>
          ¿Buscas <strong>las gasolineras más baratas en España</strong>?
          Consulta en tiempo real el{' '}
          <strong>precio de la gasolina y el diésel</strong> en todas las
          estaciones de servicio del país. Ahorra en cada repostaje con nuestra
          herramienta fácil y rápida.{' '}
          <FontAwesomeIcon icon={faCarSide} color="#f9982f" />
        </p>

        <h3>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="#f9982f" /> ¿Qué
          puedes hacer en nuestra web?
        </h3>
        <ul>
          <li>
            <FontAwesomeIcon icon={faSquareCheck} color="#f9982f" /> Comparar
            precios de gasolina y diésel por municipio.
          </li>
          <li>
            <FontAwesomeIcon icon={faSquareCheck} color="#f9982f" /> Ver
            ubicaciones y horarios de cada gasolinera.
          </li>
          <li>
            <FontAwesomeIcon icon={faSquareCheck} color="#f9982f" /> Encontrar
            las mejores ofertas en tu ruta.
          </li>
        </ul>

        <h3>
          <FontAwesomeIcon icon={faThumbTack} color="#f9982f" /> Datos
          actualizados a diario
        </h3>
        <p>
          Toda la información proviene de <strong>fuentes oficiales</strong> y
          se actualiza constantemente para que siempre encuentres el mejor
          precio.
        </p>
        <p>
          <FontAwesomeIcon icon={faBullhorn} color="#f9982f" />
          &nbsp;<strong>No pagues de más</strong>. Encuentra la gasolinera más
          económica y empieza a ahorrar hoy mismo.
        </p>
      </div>
    </section>
  );
}
