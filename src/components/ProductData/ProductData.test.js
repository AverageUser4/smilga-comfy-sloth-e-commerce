import React from 'react';
import { useParams, BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductData from './ProductData';
import { AuthProvider } from '../../utils/AuthContext';
import { CartProvider } from '../../utils/CartContext';
import useFetch from '../../hooks/useFetch';
import singleProductData from '../../test-helpers/singleProductData.json';

jest.mock('../../hooks/useFetch');
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');

  return {
    _esModule: true,
    ...actual,
    useParams: jest.fn()
  }
});

test('handles error', () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: {}, isError: true });

  render(
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductData setProductName={()=>0}/>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
  const error = screen.getByText(/something went wrong/i);

  expect(error).toBeInTheDocument();
});

test('renders expected elements', () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: singleProductData, isError: false });

  render(
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductData setProductName={()=>0}/>
        </CartProvider>
      </AuthProvider>
    </Router>
  );

  const name = screen.getByRole('heading', { name: new RegExp(singleProductData.name, 'i') });
  const colorInputs = screen.getAllByRole('radio');
  const spinButton = screen.getByRole('spinbutton');
  const addToCartButton = screen.getByRole('button', { name: /add to cart/i });

  expect(name).toBeInTheDocument();
  expect(colorInputs).toHaveLength(3);
  expect(spinButton).toBeInTheDocument();
  expect(addToCartButton).toBeInTheDocument();
});

test("does not render 'add to cart' button when there is no stock", () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: { ...singleProductData, stock: 0 }, isError: false });

  render(
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductData setProductName={()=>0}/>
        </CartProvider>
      </AuthProvider>
    </Router>
  );

  const addToCartButton = screen.queryByRole('button', { name: /add to cart/i });

  expect(addToCartButton).not.toBeInTheDocument();
});

test("renders 'all in your cart' prompt and does not render 'add to cart' button when all of the stock is in the cart", () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: { ...singleProductData, stock: 1 }, isError: false });

  render(
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductData setProductName={()=>0}/>
        </CartProvider>
      </AuthProvider>
    </Router>
  );

  const addToCartButton = screen.queryByRole('button', { name: /add to cart/i });
  userEvent.click(addToCartButton);
  const prompt = screen.getByText(/all in your cart/i);

  expect(addToCartButton).not.toBeInTheDocument();
  expect(prompt).toBeInTheDocument();
});