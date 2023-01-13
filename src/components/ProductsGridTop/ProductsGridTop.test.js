import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductsGridTop from './ProductsGridTop';
import userEvent from '@testing-library/user-event';

test('renders x products found prompt', () => {
  render(
    <ProductsGridTop
      showDetails={false}
      setShowDetails={()=>0}
      orderBy={'priceAsc'}
      setOrderBy={()=>0}
      isLoading={false}
      productsCount={10}
    />
  );
  const prompt = screen.getByText(/10 products found/i);

  expect(prompt).toBeInTheDocument();
});

test('renders no products found prompt', () => {
  render(
    <ProductsGridTop
      showDetails={false}
      setShowDetails={()=>0}
      orderBy={'priceAsc'}
      setOrderBy={()=>0}
      isLoading={false}
      productsCount={0}
    />
  );
  const prompt = screen.getByText(/no products found/i);

  expect(prompt).toBeInTheDocument();
});

test('renders interactive elements which invoke appropriate callbacks', () => {
  const setShowDetailsMock = jest.fn();
  const setOrderByMock = jest.fn();

  render(
    <ProductsGridTop
      showDetails={false}
      setShowDetails={setShowDetailsMock}
      orderBy={'priceAsc'}
      setOrderBy={setOrderByMock}
      isLoading={false}
      productsCount={10}
    />
  );

  const simpleViewButton = screen.getByRole('button', { name: /simple view/i });
  const detailedViewButton = screen.getByRole('button', { name: /detailed view/i });
  const sortSelect = screen.getByRole('combobox');

  userEvent.click(simpleViewButton);
  userEvent.click(detailedViewButton);
  userEvent.selectOptions(sortSelect, 'nameAsc');

  expect(simpleViewButton).toBeInTheDocument();
  expect(detailedViewButton).toBeInTheDocument();
  expect(sortSelect).toBeInTheDocument();

  expect(setShowDetailsMock).toHaveBeenNthCalledWith(1, false)
  expect(setShowDetailsMock).toHaveBeenNthCalledWith(2, true)
  expect(setOrderByMock).toHaveBeenCalledWith('nameAsc');
});