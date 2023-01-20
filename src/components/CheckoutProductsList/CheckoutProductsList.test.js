import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import { render, screen } from '@testing-library/react';
import { useCartContext } from '../../utils/CartContext';
import CheckoutProductsList from './CheckoutProductsList';

jest.mock('../../utils/CartContext');

test('renders expected items', () => {
  useCartContext.mockReturnValue({ cartProductsData: [
    { id: 'abc', name: 'sofa', count: 3, stock: 8, color: '#000' },
    { id: 'cba', name: 'chair', count: 1, stock: 2, color: '#ff0000' },
  ]});

  render(
    <Router>
      <CheckoutProductsList/>
    </Router>
  );

  const sofaLink = screen.getByRole('link', { name: /sofa/i });
  const chairLink = screen.getByRole('link', { name: /chair/i });

  expect(sofaLink).toBeInTheDocument();
  expect(chairLink).toBeInTheDocument();
});