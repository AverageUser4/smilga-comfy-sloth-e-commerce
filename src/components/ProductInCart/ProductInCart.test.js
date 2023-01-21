import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductInCart from './ProductInCart';
import singleProductData from '../../test-helpers/singleProductData.json';
import userEvent from '@testing-library/user-event';

function renderComponent({ quantity = 1, isError = false, data } = {}) {
  const setQuantityMock = jest.fn();
  const removeMock = jest.fn();

  if(!data)
    data = singleProductData;

  console.log(data)

  const renderOutput = render(
    <Router>
      <ProductInCart
        quantity={quantity}
        setQuantity={setQuantityMock}
        remove={removeMock}
        id={data.id}
        color={data.colors[0]}
        sameOfDifferentColorInCart={0}
        data={isError ? { isError: true } : { ...data, isError: false }}
      />
    </Router>
  );

  return {
    renderOutput,
    setQuantityMock,
    removeMock
  };
}

test('displays helpful error message when isError inside data prop is set to true', () => {
  renderComponent({ isError: true });
  const error = screen.getByText(/unable to find/i);

  expect(error).toBeInTheDocument();
});

test('renders at least one link to the product', () => {
  renderComponent();
  const links = screen.getAllByRole('link');
  const productLink = links.find(link => link.getAttribute('href') === `/products/${singleProductData.id}`);
  
  expect(productLink).toBeInTheDocument();
});

test('renders color name', () => {
  const data = { ...singleProductData };
  data.colors = ['#ff0000'];
  renderComponent({ data })

  const color = screen.getByTitle(/red/i);

  expect(color).toBeInTheDocument();
});

test('renders price, quantity and total price', () => {
  const data = { ...singleProductData };
  data.price = 1099; // $10.99
  renderComponent({ data, quantity: 2 });

  const price = screen.getAllByText(/\$10.99/i);
  const quantity = screen.getByText('2');
  const total = screen.getByText(/\$21.98/i);

  expect(price[0]).toBeInTheDocument();
  expect(quantity).toBeInTheDocument();
  expect(total).toBeInTheDocument();
});

test('renders remove button, which opens are you sure dialog, after clicking yes button it calls remove function', () => {
  const { removeMock } = renderComponent({ quantity: 2 });
  const removeButton = screen.getByRole('button', { name: /remove/i });

  userEvent.click(removeButton);
  const yesButton = screen.getByRole('button', { name: 'Yes' });
  expect(yesButton).toBeInTheDocument();
  userEvent.click(yesButton);

  expect(removeMock).toHaveBeenCalledTimes(1);
});