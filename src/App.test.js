import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from './utils/AuthContext.js';
import { CartProvider } from './utils/CartContext';
import App from './App.js';

test('renders landing page', () => {
  render(
    <AuthProvider>
      <CartProvider>
        <App/>
      </CartProvider>
    </AuthProvider>
  );
  const heading = screen.getByRole('heading', { name: /design your comfort zone/i });
  expect(heading).toBeInTheDocument();
});