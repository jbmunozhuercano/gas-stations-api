import {ReactNode} from 'react';
import {motion} from 'motion/react';
import classes from './styles.module.css';
import {Station} from '@/app/page';

interface StationCardProps {
  station: Station;
  loading: boolean;
}

export default function StationCard({
  station,
  loading
}: StationCardProps): ReactNode {
  return (
    <motion.div
      initial={{opacity: 0, scale: 0.8, y: 30}}
      animate={!loading ? {opacity: 1, scale: 1, y: 0} : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] // Custom bounce effect
      }}
      whileHover={{scale: 1.025}} // Slight hover effect
      className={classes.card}
    >
      <h4>{station.Rótulo}</h4>
      <dl>
        <dt>Municipio</dt>
        <dd>{station.Municipio}</dd>

        <dt>C.P.</dt>
        <dd>{station['C.P.']}</dd>

        <dt>Horario</dt>
        <dd
          dangerouslySetInnerHTML={{
            __html: station.Horario.replace(';', '<br />')
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
        className={classes.link}
        href={`https://www.google.es/maps/place/${station.Latitud.replace(
          ',',
          '.'
        )},${station['Longitud (WGS84)'].replace(',', '.')}`}
        target='blank'
      >
        <h5>Google Maps</h5>
      </a>
    </motion.div>
  );
}
