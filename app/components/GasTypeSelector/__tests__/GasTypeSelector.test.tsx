import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GasTypeSelector } from '..';

describe('GasTypeSelector', () => {
  it('renders with all fuel options', () => {
    render(
      <GasTypeSelector
        priceKey="Precio Gasoleo A"
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Gasóleo A')).toBeInTheDocument();
    expect(screen.getByText('Gasóleo Premium')).toBeInTheDocument();
    expect(screen.getByText('Gasolina 95 E5')).toBeInTheDocument();
    expect(screen.getByText('Gasolina 98 E5')).toBeInTheDocument();
  });

  it('calls onChange when fuel type is selected', () => {
    const onChange = vi.fn();
    render(
      <GasTypeSelector
        priceKey="Precio Gasoleo A"
        onChange={onChange}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Precio Gasolina 95 E5' } });

    expect(onChange).toHaveBeenCalledWith('Precio Gasolina 95 E5');
  });

  it('has correct aria-label', () => {
    render(
      <GasTypeSelector
        priceKey="Precio Gasoleo A"
        onChange={() => {}}
      />
    );

    expect(
      screen.getByLabelText('Selecciona tipo de combustible')
    ).toBeInTheDocument();
  });

  it('displays selected fuel type', () => {
    render(
      <GasTypeSelector
        priceKey="Precio Gasolina 98 E5"
        onChange={() => {}}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('Precio Gasolina 98 E5');
  });
});
