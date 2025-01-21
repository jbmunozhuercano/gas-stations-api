import styles from './StationCard.module.css';

type StationCardProps = {
  station: {
    Municipio: string;
    Rótulo: string;
    'C.P.': string;
    Horario: string;
    Latitud: string;
    'Longitud (WGS84)': string;
    'Precio Gasoleo A': string;
    'Precio Gasoleo Premium': string;
    'Precio Gasolina 95 E5': string;
    'Precio Gasolina 98 E5': string;
  };
};

export function StationCard({ station }: StationCardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <h3>{station.Rótulo}</h3>
      <dl>
        <dt>Municipio</dt>
        <dd>{station.Municipio}</dd>

        <dt>C.P.</dt>
        <dd>{station['C.P.']}</dd>

        <dt>Horario</dt>
        <dd
          dangerouslySetInnerHTML={{
            __html: station.Horario.replace(';', '<br />'),
          }}
        ></dd>

        <dt>Gasoleo A</dt>
        <dd>
          {station['Precio Gasoleo A']
            ? `${station['Precio Gasoleo A']}€`
            : 'N/D'}
        </dd>

        <dt>Gasoleo Prem.</dt>
        <dd>
          {station['Precio Gasoleo Premium']
            ? `${station['Precio Gasoleo Premium']}€`
            : 'N/D'}
        </dd>

        <dt>Gasolina 95</dt>
        <dd>
          {station['Precio Gasolina 95 E5']
            ? `${station['Precio Gasolina 95 E5']}€`
            : 'N/D'}
        </dd>

        <dt>Gasolina 98</dt>
        <dd>
          {station['Precio Gasolina 98 E5']
            ? `${station['Precio Gasolina 98 E5']}€`
            : 'N/D'}
        </dd>
      </dl>
      <a
        className={styles.link}
        href={`https://www.google.es/maps/place/${station.Latitud.replace(
          ',',
          '.'
        )},${station['Longitud (WGS84)'].replace(',', '.')}`}
        target="blank"
      >
        <h4>Google Maps</h4>
      </a>
    </div>
  );
}
