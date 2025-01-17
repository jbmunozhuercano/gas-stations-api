import styles from './Header.module.css';

export function Header() {
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
      <h1>Precio del combustible en las Estaciones de Servicio de España</h1>
      <h2>
        <span>Actualización:</span> {yesterday}
      </h2>
    </header>
  );
}
