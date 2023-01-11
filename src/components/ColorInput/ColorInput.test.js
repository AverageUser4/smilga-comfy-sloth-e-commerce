import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorInput from './ColorInput';

function renderComponent(currentValue = '#000') {
  const mockFunction = jest.fn();
  const renderOutput = render(
    <ColorInput
      name="name"
      value="#000"
      currentValue={currentValue}
      handleChange={mockFunction}
    />
  );

  return {
    mockFunction,
    ...renderOutput
  };
}

describe('rendering', () => {

  test('renders radio input', () => {
    renderComponent();
    const input = screen.getByRole('radio');

    expect(input).toBeInTheDocument();
  });
  
  test('radio input has accessible name adequate to provided color', () => {
    renderComponent();
    const input = screen.getByRole('radio', { name: /black/i });

    expect(input).toHaveAccessibleName(/black/i);
  });
  
});

describe('interaction', () => {

  test('radio input is checked when value is equal to currentValue', () => {
    renderComponent();
    const input = screen.getByRole('radio');

    expect(input).toBeChecked();
  });
  
  test('radio input is not checked when value is not equal to currentValue', () => {
    renderComponent('#fff');
    const input = screen.getByRole('radio');

    expect(input).not.toBeChecked();
  });
  
  test('clicking radio input invokes handleChange function, when currentValue is different than value', () => {
    const { mockFunction } = renderComponent('#fff');
    const input = screen.getByRole('radio');

    userEvent.click(input);

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

});