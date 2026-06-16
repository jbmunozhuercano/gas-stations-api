import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGeolocation } from '../useGeolocation';

describe('useGeolocation', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: vi.fn(),
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.getCurrentLocation).toBe('function');
  });

  it('handles successful location', async () => {
    const mockPosition = {
      coords: {
        latitude: 40.4168,
        longitude: -3.7038,
      },
    };

    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation(
      (success) => {
        success(mockPosition);
      }
    );

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      result.current.getCurrentLocation();
    });

    expect(result.current.latitude).toBe(40.4168);
    expect(result.current.longitude).toBe(-3.7038);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('handles permission denied error', async () => {
    const mockError = {
      code: 1, // PERMISSION_DENIED
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
      message: 'User denied Geolocation',
    };

    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation(
      (_, error) => {
        error(mockError);
      }
    );

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      result.current.getCurrentLocation();
    });

    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.error).toBe('Ubicación denegada por el usuario');
    expect(result.current.loading).toBe(false);
  });

  it('handles position unavailable error', async () => {
    const mockError = {
      code: 2, // POSITION_UNAVAILABLE
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
      message: 'Position unavailable',
    };

    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation(
      (_, error) => {
        error(mockError);
      }
    );

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      result.current.getCurrentLocation();
    });

    expect(result.current.error).toBe('Información de ubicación no disponible');
  });

  it('handles timeout error', async () => {
    const mockError = {
      code: 3, // TIMEOUT
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
      message: 'Timeout',
    };

    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation(
      (_, error) => {
        error(mockError);
      }
    );

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      result.current.getCurrentLocation();
    });

    expect(result.current.error).toBe('La solicitud de ubicación ha expirado');
  });

  it('handles unsupported browser', async () => {
    vi.unstubAllGlobals();
    vi.stubGlobal('navigator', {});

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      result.current.getCurrentLocation();
    });

    expect(result.current.error).toBe(
      'Tu navegador no soporta geolocalización'
    );
  });

  it('sets loading to true while fetching', async () => {
    vi.mocked(navigator.geolocation.getCurrentPosition).mockImplementation(
      () => {}
    );

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getCurrentLocation();
    });

    expect(result.current.loading).toBe(true);
  });
});
