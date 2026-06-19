# Testing Proposal for Gas Stations API

## Overview

This document outlines the recommended testing strategy for the gas-stations-api project. The goal is to establish a reliable test suite that ensures code quality, prevents regressions, and enables confident refactoring.

---

## Recommended Testing Stack

| Library | Purpose | Why |
|---------|---------|-----|
| **Vitest** | Test runner | Fast, ESM-native, excellent Next.js 15 support, compatible with TypeScript out of the box |
| **@testing-library/react** | Component testing | Industry standard for React, focuses on testing behavior over implementation |
| **@testing-library/jest-dom** | DOM matchers | Custom matchers like `toBeInTheDocument()`, `toHaveAccessibleName()` |
| **msw** (Mock Service Worker) | API mocking | Intercept network requests in tests without changing application code |
| **vitest-fetch-mock** | Fetch mocking | Simpler alternative to MSW for basic fetch mocking in unit tests |

### Optional (Advanced)

| Library | Purpose | When to use |
|---------|---------|-------------|
| **Playwright** | E2E testing | If you need full browser testing with real user flows |
| **@testing-library/user-event** | User interaction simulation | For complex user interactions (typing, clicking, keyboard navigation) |

---

## Test Types

### 1. Unit Tests (Pure Functions)

**Priority: HIGH** - Easiest to write, fastest to run, highest ROI.

| What | File | Test Cases |
|------|------|------------|
| `calculateDistance()` | `app/utils/distance.ts` | Same point returns 0; known cities return correct distance; handles edge cases (antimeridian, poles) |
| `filterStationsByDistance()` | `app/utils/distance.ts` | Filters within radius; sorts by distance; handles invalid coordinates; returns empty array for no matches |
| `isStationOpen()` | `app/utils/stationHours.ts` | Returns null for empty/null input; returns true for "24h"; parses L-D schedules; handles midnight-crossing (06:00-02:00); returns false for unknown day format |
| `REGION_CENTERS` | `app/constants/regionCenters.ts` | All 19 regions have valid coordinates; coordinates are within Spain bounds |

### 2. Hook Tests

**Priority: HIGH** - Custom hooks need isolation testing.

| Hook | File | Test Cases |
|------|------|------------|
| `useGeolocation()` | `app/hooks/useGeolocation.ts` | Returns initial state; handles successful location; handles permission denied; handles timeout; handles unsupported browser |

### 3. Component Tests

**Priority: MEDIUM** - Tests user-facing behavior.

| Component | Test Focus |
|-----------|------------|
| `Select` | Renders options; calls onChange; shows loading state |
| `InputField` | Filters non-alphabet characters; shows placeholder; disabled state |
| `GasTypeSelector` | Renders fuel options; calls onChange with correct value |
| `ClearButton` | Calls clearSelections on click |
| `LocationButton` | Shows loading text; disabled when loading |
| `LocationInfo` | Auto-dismisses after 3s; displays correct info |
| `StationCard` | Renders station details; shows distance when provided; Google Maps link has correct target |
| `Header` | Renders title; displays formatted date |

### 4. API Route Tests

**Priority: MEDIUM** - Server-side logic needs verification.

| Route | Test Cases |
|-------|------------|
| `GET /api/region` | Returns 200 with data; returns correct structure; handles external API failure (500) |
| `GET /api/gas-stations` | Returns yesterday's date stations; handles external API failure |
| `GET /api/gas-stations/[regionCode]` | Filters by region; handles invalid region code; handles external API failure |

### 5. Integration Tests

**Priority: LOW** - Complex but valuable for critical paths.

| Flow | Test Cases |
|------|------------|
| Region selection → map update | Select region → stations load → map displays markers |
| Location button → filtered results | Click "Near me" → location obtained → stations filtered by distance |
| Search → filter results | Type municipality → stations filtered → list updates |

---

## File Structure

```
app/
  utils/
    __tests__/
      distance.test.ts
  hooks/
    __tests__/
      useGeolocation.test.ts
  components/
    Select/
      __tests__/
        Select.test.tsx
    InputField/
      __tests__/
        InputField.test.tsx
    GasTypeSelector/
      __tests__/
        GasTypeSelector.test.tsx
    ...
  api/
    region/
      __tests__/
        route.test.ts
    gas-stations/
      __tests__/
        route.test.ts
      [regionCode]/
        __tests__/
          route.test.ts
  __tests__/
    page.test.tsx      # Integration tests
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event msw jsdom
```

### 2. Add Test Script

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 3. Create Vitest Config

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
});
```

### 4. Create Setup File

Create `test/setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

---

## Example Test Cases

### Unit Test: calculateDistance

```typescript
import { describe, it, expect } from 'vitest';
import { calculateDistance } from '../distance';

describe('calculateDistance', () => {
  it('returns 0 for same coordinates', () => {
    expect(calculateDistance(40.4168, -3.7038, 40.4168, -3.7038)).toBe(0);
  });

  it('calculates distance between Madrid and Barcelona', () => {
    const distance = calculateDistance(40.4168, -3.7038, 41.3874, 2.1686);
    expect(distance).toBeCloseTo(505, 0); // ~505km
  });

  it('rounds to 2 decimal places', () => {
    const distance = calculateDistance(40.4168, -3.7038, 40.4169, -3.7039);
    expect(distance.toString()).toMatch(/^\d+\.\d{1,2}$/);
  });
});
```

### Component Test: InputField

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InputField } from '../InputField';

describe('InputField', () => {
  it('renders with placeholder', () => {
    render(<InputField searchTerm="" onInputChange={() => {}} />);
    expect(screen.getByPlaceholderText('Introduce el municipio_')).toBeInTheDocument();
  });

  it('filters non-alphabet characters', () => {
    const onChange = vi.fn();
    render(<InputField searchTerm="" onInputChange={onChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Madrid123' } });
    expect(onChange).toHaveBeenCalledWith('Madrid');
  });

  it('is disabled when disabled prop is true', () => {
    render(<InputField searchTerm="" onInputChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
```

### API Route Test: /api/region

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../route';

vi.mock('node-fetch');

describe('GET /api/region', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with community data', async () => {
    const mockData = [{ CCAA: '01',nombre: 'Andalucía' }];
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    } as any);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockData);
  });

  it('returns 500 when external API fails', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    const response = await GET();
    expect(response.status).toBe(500);
  });
});
```

---

## Coverage Goals

| Category | Target |
|----------|--------|
| Unit functions | 90%+ |
| Custom hooks | 80%+ |
| Components | 70%+ |
| API routes | 80%+ |
| Overall | 75%+ |

---

## Priority Order

1. **Week 1**: Unit tests for `distance.ts` utilities
2. **Week 2**: Hook tests for `useGeolocation`
3. **Week 3**: Component tests for `Select`, `InputField`, `GasTypeSelector`
4. **Week 4**: API route tests
5. **Week 5**: Component tests for remaining components
6. **Week 6**: Integration tests for critical flows

---

## Notes

- Tests should be written in Spanish to match the project's language
- Use `data-testid` attributes sparingly; prefer accessible queries (`getByRole`, `getByLabelText`)
- Mock external API calls; never call real external services in tests
- Keep tests independent; each test should set up its own state
- Use `beforeEach` for common setup, avoid shared state between tests
