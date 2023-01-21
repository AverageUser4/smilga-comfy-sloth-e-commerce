import React from 'react';
import { useParams, BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductData from './ProductData';
import { AuthProvider } from '../../utils/AuthContext';
import { CartProvider } from '../../utils/CartContext';
import useFetch from '../../hooks/useFetch';
import singleProductData from '../../test-helpers/singleProductData.json';
import { mockBroadcastChannel } from '../../test-helpers/utils';

mockBroadcastChannel();
jest.mock('../../hooks/useFetch');
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');

  return {
    _esModule: true,
    ...actual,
    useParams: jest.fn()
  }
});

function renderComponent() {
  const setProductNameMock = jest.fn();
  const renderOutput = render(
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductData setProductName={setProductNameMock}/>
        </CartProvider>
      </AuthProvider>
    </Router>
  );

  return {
    renderOutput,
    setProductNameMock
  };
}

test('when isError returned from useFetch is true, renders useful error message', () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: {}, isError: true });
  renderComponent();

  const error = screen.getByText(/something went wrong/i);

  expect(error).toBeInTheDocument();
});

test('renders expected elements', () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: singleProductData, isError: false });
  renderComponent();

  const name = screen.getByRole('heading', { name: new RegExp(singleProductData.name, 'i') });
  const colorInputs = screen.getAllByRole('radio');
  const spinButton = screen.getByRole('spinbutton');
  const addToCartButton = screen.getByRole('button', { name: /add to cart/i });

  expect(name).toBeInTheDocument();
  expect(colorInputs).toHaveLength(singleProductData.colors.length);
  expect(spinButton).toBeInTheDocument();
  expect(addToCartButton).toBeInTheDocument();
});

test("does not render 'add to cart' button when there is no stock", () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: { ...singleProductData, stock: 0 }, isError: false });
  renderComponent();

  const addToCartButton = screen.queryByRole('button', { name: /add to cart/i });
  expect(addToCartButton).not.toBeInTheDocument();
});

test("renders 'all in your cart' prompt and does not render 'add to cart' button when all of the stock is in the cart", () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: { ...singleProductData, stock: 1 }, isError: false });
  renderComponent();

  const addToCartButton = screen.queryByRole('button', { name: /add to cart/i });
  userEvent.click(addToCartButton);
  const prompt = screen.getByText(/all in your cart/i);

  expect(addToCartButton).not.toBeInTheDocument();
  expect(prompt).toBeInTheDocument();
});

test('"setProductName" function gets called once with product name', () => {
  useParams.mockReturnValue({ id: singleProductData.id });
  useFetch.mockReturnValue({ data: singleProductData, isError: false });
  const { setProductNameMock } = renderComponent();

  expect(setProductNameMock).toHaveBeenCalledTimes(1);
  expect(setProductNameMock).toHaveBeenCalledWith(singleProductData.name);
});