import { describe, it, expect } from 'vitest';
import { calculateDistance, filterStationsByDistance } from '../distance';

describe('calculateDistance', () => {
  it('returns 0 for same coordinates', () => {
    expect(calculateDistance(40.4168, -3.7038, 40.4168, -3.7038)).toBe(0);
  });

  it('calculates distance between Madrid and Barcelona', () => {
    const distance = calculateDistance(40.4168, -3.7038, 41.3874, 2.1686);
    expect(distance).toBeGreaterThan(480);
    expect(distance).toBeLessThan(530);
  });

  it('calculates distance between Madrid and Valencia', () => {
    const distance = calculateDistance(40.4168, -3.7038, 39.4699, -0.3763);
    expect(distance).toBeGreaterThan(280);
    expect(distance).toBeLessThan(350);
  });

  it('rounds to 2 decimal places', () => {
    const distance = calculateDistance(40.4168, -3.7038, 40.4169, -3.7039);
    const decimalPart = distance.toString().split('.')[1];
    expect(decimalPart?.length).toBeLessThanOrEqual(2);
  });

  it('handles coordinates near the equator', () => {
    const distance = calculateDistance(0, 0, 1, 1);
    expect(distance).toBeGreaterThan(0);
  });

  it('handles coordinates near the poles', () => {
    const distance = calculateDistance(89.9, 0, 89.9, 1);
    expect(distance).toBeGreaterThanOrEqual(0);
  });
});

describe('filterStationsByDistance', () => {
  const mockStations = [
    {
      Rótulo: 'Station A',
      Latitud: '40.4168',
      'Longitud (WGS84)': '-3.7038',
      Municipio: 'Madrid',
    },
    {
      Rótulo: 'Station B',
      Latitud: '41.3874',
      'Longitud (WGS84)': '2.1686',
      Municipio: 'Barcelona',
    },
    {
      Rótulo: 'Station C',
      Latitud: '40.4180',
      'Longitud (WGS84)': '-3.7050',
      Municipio: 'Madrid',
    },
  ];

  it('filters stations within radius', () => {
    const result = filterStationsByDistance(mockStations, 40.4168, -3.7038, 3);
    expect(result.length).toBe(2);
    expect(result.some((s) => s.Rótulo === 'Station A')).toBe(true);
    expect(result.some((s) => s.Rótulo === 'Station C')).toBe(true);
  });

  it('returns empty array when no stations within radius', () => {
    // Use coordinates far from any station
    const result = filterStationsByDistance(mockStations, 51.5074, -0.1278, 1);
    expect(result.length).toBe(0);
  });

  it('sorts stations by distance', () => {
    const result = filterStationsByDistance(mockStations, 40.4168, -3.7038, 3);
    expect(result[0].distance).toBeLessThanOrEqual(result[1].distance);
  });

  it('adds distance property to stations', () => {
    const result = filterStationsByDistance(mockStations, 40.4168, -3.7038, 3);
    result.forEach((station) => {
      expect(station.distance).toBeDefined();
      expect(typeof station.distance).toBe('number');
    });
  });

  it('handles invalid coordinates gracefully', () => {
    const stationsWithInvalid = [
      ...mockStations,
      {
        Rótulo: 'Station D',
        Latitud: 'invalid',
        'Longitud (WGS84)': 'invalid',
        Municipio: 'Invalid',
      },
    ];
    const result = filterStationsByDistance(stationsWithInvalid, 40.4168, -3.7038, 3);
    expect(result.length).toBe(2);
  });

  it('uses default radius of 3km', () => {
    const result = filterStationsByDistance(mockStations, 40.4168, -3.7038);
    expect(result.length).toBe(2);
  });
});
