import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductInCart from './ProductInCart';
import singleProductData from '../../test-helpers/singleProductData.json';
import userEvent from '@testing-library/user-event';

test('handles error', () => {
  render(
    <Router>
      <ProductInCart
        color={singleProductData.colors[0]}
        quantity={1}
        setQuantity={()=>0}
        sameOfDifferentColorInCart={0}
        remove={()=>0}
        id={singleProductData.id}
        data={{ ...singleProductData, isError: true }}
      />
    </Router>
  );
  const error = screen.getByText(/unable to find/i);

  expect(error).toBeInTheDocument();
});

test('renders at least one link to the product', () => {
  render(
    <Router>
      <ProductInCart
        color={singleProductData.colors[0]}
        quantity={1}
        setQuantity={()=>0}
        sameOfDifferentColorInCart={0}
        remove={()=>0}
        id={singleProductData.id}
        data={{ ...singleProductData, isError: false }}
      />
    </Router>
  );
  const links = screen.getAllByRole('link');
  const productLink = links.find(link => link.getAttribute('href') === `/products/${singleProductData.id}`);
  
  expect(productLink).toBeInTheDocument();
});

test('renders color', () => {
  singleProductData.colors = ['#ff0000'];
  render(
    <Router>
      <ProductInCart
        color={singleProductData.colors[0]}
        quantity={1}
        setQuantity={()=>0}
        sameOfDifferentColorInCart={0}
        remove={()=>0}
        id={singleProductData.id}
        data={{ ...singleProductData, isError: false }}
      />
    </Router>
  );
  const color = screen.getByTitle(/red/i);

  expect(color).toBeInTheDocument();
});

test('renders price, quantity and total price', () => {
  singleProductData.price = 1099; // $10.99
  render(
    <Router>
      <ProductInCart
        color={singleProductData.colors[0]}
        quantity={2}
        setQuantity={()=>0}
        sameOfDifferentColorInCart={0}
        remove={()=>0}
        id={singleProductData.id}
        data={{ ...singleProductData, isError: false }}
      />
    </Router>
  );

  const price = screen.getAllByText(/\$10.99/i);
  const quantity = screen.getByText('2');
  const total = screen.getByText(/\$21.98/i);

  expect(price[0]).toBeInTheDocument();
  expect(quantity).toBeInTheDocument();
  expect(total).toBeInTheDocument();
});

test('renders remove button, which opens are you sure dialog, after clicking yes button it calls remove function', () => {
  const removeMock = jest.fn();
  render(
    <Router>
      <ProductInCart
        color={singleProductData.colors[0]}
        quantity={2}
        setQuantity={()=>0}
        sameOfDifferentColorInCart={0}
        remove={removeMock}
        id={singleProductData.id}
        data={{ ...singleProductData, isError: false }}
      />
    </Router>
  );
  const removeButton = screen.getByRole('button', { name: /remove/i });

  userEvent.click(removeButton);
  const yesButton = screen.getByRole('button', { name: 'Yes' });
  expect(yesButton).toBeInTheDocument();
  userEvent.click(yesButton);

  expect(removeMock).toHaveBeenCalledTimes(1);
});