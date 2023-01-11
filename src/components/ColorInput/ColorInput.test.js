import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorInput from './ColorInput';

test('renders radio input with proper accessible name', () => {
  render(
    <ColorInput
      name="name"
      value="#000"
      currentValue="#000"
      handleChange={()=>0}
    />
  );
  const input = screen.getByRole('radio', { name: /black/i });

  expect(input).toBeInTheDocument();
  expect(input).toHaveAccessibleName(/black/i);
});

test('radio input is checked when value is equal to currentValue', () => {
  render(
    <ColorInput
      name="name"
      value="#000"
      currentValue="#000"
      handleChange={()=>0}
    />
  );
  const input = screen.getByRole('radio', { name: /black/i });

  expect(input).toBeChecked();
});

test('radio input is not checked when value is not equal to currentValue', () => {
  render(
    <ColorInput
      name="name"
      value="#000"
      currentValue="#fff"
      handleChange={()=>0}
    />
  );
  const input = screen.getByRole('radio', { name: /black/i });

  expect(input).not.toBeChecked();
});