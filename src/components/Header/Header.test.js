import React from 'react';
import { useLocation, BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { AuthProvider } from '../../utils/AuthContext';
import { CartProvider } from '../../utils/CartContext';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return { 
    _esModule: true,
    ...originalModule,
    useLocation: jest.fn()
  };
});

test('testj', () => {
  useLocation.mockReturnValue({ pathname: '/about/something/nice' });
  render(
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header/>
        </Router>
      </CartProvider>
    </AuthProvider>
  );

  expect(useLocation().pathname).toBe('/about/something/nice')
});