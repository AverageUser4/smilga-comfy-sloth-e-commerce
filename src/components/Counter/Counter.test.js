import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('renders spinbutton (labelled with provided label), add and subtract buttons and element containing value of count', () => {
  render(
    <Counter
      count={5}
      setCount={()=>0}
      step={1}
      min={1}
      max={10}
      label="label"
    />  
  );
  const spinButton = screen.getByRole('spinbutton', { name: 'label' });
  const addButton = screen.getByRole('button', { name: /add/i });
  const subtractButton = screen.getByRole('button', { name: /subtract/i });
  const countContainer = screen.queryByText('5') || screen.getByDisplayValue('5');

  expect(spinButton).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
  expect(subtractButton).toBeInTheDocument();
  expect(countContainer).toBeInTheDocument();
});

test('calls set function with incremented or decremented value when appropriate button is clicked', () => {
  const mockFunction = jest.fn();
  render(
    <Counter
      count={5}
      setCount={mockFunction}
      step={1}
      min={1}
      max={10}
      label="label"
    />  
  );
  const addButton = screen.getByRole('button', { name: /add/i });
  const subtractButton = screen.getByRole('button', { name: /subtract/i });

  userEvent.click(addButton);
  userEvent.click(subtractButton);

  expect(mockFunction.mock.calls[0][0]).toBe(6);
  expect(mockFunction.mock.calls[1][0]).toBe(4);
});

test('step works both for incrementing and decrementing', () => {
  const mockFunction = jest.fn();
  render(
    <Counter
      count={5}
      setCount={mockFunction}
      step={3}
      min={1}
      max={10}
      label="label"
    />  
  );
  const addButton = screen.getByRole('button', { name: /add/i });
  const subtractButton = screen.getByRole('button', { name: /subtract/i });

  userEvent.click(addButton);
  userEvent.click(subtractButton);

  expect(mockFunction.mock.calls[0][0]).toBe(8);
  expect(mockFunction.mock.calls[1][0]).toBe(2);
});

test('does not call set function with value less than min or greater than max, instead calls it with min or max', () => {
  const mockFunction = jest.fn();
  render(
    <Counter
      count={5}
      setCount={mockFunction}
      step={10}
      min={1}
      max={10}
      label="label"
    />  
  );
  const addButton = screen.getByRole('button', { name: /add/i });
  const subtractButton = screen.getByRole('button', { name: /subtract/i });

  userEvent.click(addButton);
  userEvent.click(subtractButton);

  expect(mockFunction.mock.calls[0][0]).toBe(10);
  expect(mockFunction.mock.calls[1][0]).toBe(1);
});

test('keyboard arrow controls work as expected', () => {
  const mockFunction = jest.fn();
  render(
    <Counter
      count={5}
      setCount={mockFunction}
      step={1}
      min={1}
      max={10}
      label="label"
    />  
  );
  const spinButton = screen.getByRole('spinbutton', { name: 'label' });

  spinButton.focus();
  userEvent.keyboard('{ArrowRight}{ArrowUp}{ArrowLeft}{ArrowDown}');

  expect(mockFunction.mock.calls[0][0]).toBe(6);
  expect(mockFunction.mock.calls[1][0]).toBe(6);
  expect(mockFunction.mock.calls[2][0]).toBe(4);
  expect(mockFunction.mock.calls[3][0]).toBe(4);
});

test('keyboard special controls work as expected', () => {
  const mockFunction = jest.fn();
  render(
    <Counter
      count={50}
      setCount={mockFunction}
      step={1}
      min={1}
      max={100}
      label="label"
    />  
  );
  const spinButton = screen.getByRole('spinbutton', { name: 'label' });

  spinButton.focus();
  userEvent.keyboard('{Home}{End}{PageUp}{PageDown}');

  expect(mockFunction.mock.calls[0][0]).toBe(1);
  expect(mockFunction.mock.calls[1][0]).toBe(100);
  expect(mockFunction.mock.calls[2][0]).toBeLessThan(49);
  expect(mockFunction.mock.calls[3][0]).toBeGreaterThan(51);
});