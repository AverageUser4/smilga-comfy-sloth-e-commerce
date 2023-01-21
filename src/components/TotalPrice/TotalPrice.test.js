import React from 'react';
import { screen, render } from '@testing-library/react';
import TotalPrice from './TotalPrice';

test('renders expected items', () => {
  render(<TotalPrice subtotal={230000} shipping={5000}/>);
  const subtotal = screen.getByTestId('subtotal');
  const shipping = screen.getByTestId('shipping');
  const total = screen.getByTestId('total');

  expect(subtotal).toBeInTheDocument();
  // eslint-disable-next-line
  expect(subtotal.textContent).toEqual(expect.stringContaining('$2300'));
  expect(shipping).toBeInTheDocument();
  // eslint-disable-next-line
  expect(shipping.textContent).toEqual(expect.stringContaining('$50'));
  expect(total).toBeInTheDocument();
  // eslint-disable-next-line
  expect(total.textContent).toEqual(expect.stringContaining('$2350'));
});