import React from 'react';
import { render, screen } from '@testing-library/react';
import Counter from './Counter';

function renderComponent(count = 1, step = 1, min = 1, max = 100, fontSize = '16px', label = 'label') {
  const setCount = jest.fn((newCount) => count = newCount);
  
  const renderOutput = render(
    <Counter
      count={count}
      setCount={setCount}
      step={step}
      min={min}
      max={max}
      fontSize={fontSize}
      label={label}
    />
  );

  return {
    mockFunction: setCount,
    ...renderOutput
  };
}

describe('rendering', () => {

  test('renders element with spinbutton role', () => {
    renderComponent();
    const spinButton = screen.getByRole('spinbutton');

    expect(spinButton).toBeInTheDocument();
  });

  test('renders add and subtract buttons buttons', () => {
    renderComponent();
    const addButton = screen.getByRole('button', { name: /add/i });
    const subtractButton = screen.getByRole('button', { name: /subtract/i });

    expect(addButton).toBeInTheDocument();
    expect(subtractButton).toBeInTheDocument();
  });

  test('renders container with appropriate count', () => {
    renderComponent(5);
    const countContainer = screen.queryByText('5') || screen.getByDisplayValue('5');

    expect(countContainer).toBeInTheDocument();
  });
  
});