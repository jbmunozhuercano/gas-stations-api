export function parseCoordinate(value: string): number {
  return parseFloat(value.replace(',', '.'));
}
