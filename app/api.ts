export type Station = {
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

export type RegionCode = string | null;

export type Region = {
  IDCCAA: string;
  CCAA: string;
};

export async function fetchStations(
  regionCode: RegionCode
): Promise<Station[]> {
  const url = `/api/gas-stations/${regionCode}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.ListaEESSPrecio;
}

export async function fetchRegions(): Promise<Region[]> {
  const url = `/api/regions`;
  const response = await fetch(url);
  return response.json();
}
