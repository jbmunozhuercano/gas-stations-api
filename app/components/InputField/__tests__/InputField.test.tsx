import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '..';

describe('InputField', () => {
  it('renders with placeholder', () => {
    render(
      <InputField
        type="text"
        placeholder="Introduce el municipio_"
        searchTerm=""
        onInputChange={() => {}}
      />
    );
    expect(
      screen.getByPlaceholderText('Introduce el municipio_')
    ).toBeInTheDocument();
  });

  it('calls onInputChange with valid alphabet characters', () => {
    const onInputChange = vi.fn();
    render(
      <InputField
        type="text"
        placeholder="Introduce el municipio_"
        searchTerm=""
        onInputChange={onInputChange}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Madrid' },
    });
    expect(onInputChange).toHaveBeenCalledWith('Madrid');
  });

  it('filters non-alphabet characters', () => {
    const onInputChange = vi.fn();
    render(
      <InputField
        type="text"
        placeholder="Introduce el municipio_"
        searchTerm=""
        onInputChange={onInputChange}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Madrid123' },
    });
    expect(onInputChange).not.toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <InputField
        type="text"
        placeholder="Introduce el municipio_"
        searchTerm=""
        onInputChange={() => {}}
        disabled={true}
      />
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('is enabled when disabled prop is false', () => {
    render(
      <InputField
        type="text"
        placeholder="Introduce el municipio_"
        searchTerm=""
        onInputChange={() => {}}
        disabled={false}
      />
    );
    expect(screen.getByRole('textbox')).toBeEnabled();
  });

  it('has correct aria-label', () => {
    render(
      <InputField
        type="text"
        placeholder="Introduce el municipio_"
        searchTerm=""
        onInputChange={() => {}}
      />
    );
    expect(screen.getByLabelText('Buscar por municipio')).toBeInTheDocument();
  });

  it('displays current search term value', () => {
    render(
      <InputField
        type="text"
        placeholder="Introduce el municipio_"
        searchTerm="Valencia"
        onInputChange={() => {}}
      />
    );
    expect(screen.getByRole('textbox')).toHaveValue('Valencia');
  });

  it('trims trailing spaces from input', () => {
    const onInputChange = vi.fn();
    render(
      <InputField
        type="text"
        placeholder="Introduce el municipio_"
        searchTerm=""
        onInputChange={onInputChange}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Alicante ' },
    });
    expect(onInputChange).toHaveBeenCalledWith('Alicante');
  });
});
