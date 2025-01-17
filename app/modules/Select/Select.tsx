import styles from './Select.module.css';

type SelectProps = {
  comunityCode: string;
  setComunityCode: (comunityCode: string) => void;
};

export function Select({ comunityCode, setComunityCode }: SelectProps) {
  return (
    <select
      className={styles.select}
      value={comunityCode}
      onChange={(e) => setComunityCode(e.target.value)}
    >
      <option value="">Comunidad Autónoma</option>
      <option value="01">Andalucía</option>
      <option value="02">Aragón</option>
      <option value="03">Asturias</option>
      <option value="04">Baleares</option>
      <option value="05">Canarias</option>
      <option value="06">Cantabria</option>
      <option value="07">Castilla-La Mancha</option>
      <option value="08">Castilla y León</option>
      <option value="09">Cataluña</option>
      <option value="10">Valencia</option>
      <option value="11">Extremadura</option>
      <option value="12">Galicia</option>
      <option value="13">Madrid</option>
      <option value="14">Murcia</option>
      <option value="15">Navarra</option>
      <option value="16">País Vasco</option>
      <option value="17">La Rioja</option>
      <option value="18">Ceuta</option>
      <option value="19">Melilla</option>
    </select>
  );
}
