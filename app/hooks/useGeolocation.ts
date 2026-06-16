import { useState, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

/**
 * Custom React hook to retrieve the user's current geolocation.
 *
 * @returns {Object} An object containing:
 * - `latitude`: The latitude coordinate, or `null` if not available.
 * - `longitude`: The longitude coordinate, or `null` if not available.
 * - `error`: An error message if geolocation fails, or `null` if no error.
 * - `loading`: A boolean indicating if the geolocation request is in progress.
 * - `getCurrentLocation`: A function to trigger the geolocation request.
 *
 * @example
 * const { latitude, longitude, error, loading, getCurrentLocation } = useGeolocation();
 *
 * To request location:
 * getCurrentLocation();
 */

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const clearError = useCallback(() => {
    setLocation((prev) => ({ ...prev, error: null }));
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: 'Tu navegador no soporta geolocalización',
        loading: false,
      }));
      return;
    }

    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage = 'No se pudo obtener tu ubicación';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Ubicación denegada por el usuario';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible';
            break;
          case error.TIMEOUT:
            errorMessage = 'La solicitud de ubicación ha expirado';
            break;
        }
        setLocation((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  }, []);

  return { ...location, getCurrentLocation, clearError };
}
