import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductsGridTop from './ProductsGridTop';
import userEvent from '@testing-library/user-event';

function renderComponent({ isLoading = false, productsCount = 10 } = {}) {
  const setShowDetailsMock = jest.fn();
  const setOrderByMock = jest.fn();
  
  const renderOutput = render(
    <ProductsGridTop
      setShowDetails={setShowDetailsMock}
      setOrderBy={setOrderByMock}
      showDetails={false}
      orderBy="priceAsc"
      isLoading={isLoading}
      productsCount={productsCount}
    />
  );

  return {
    renderOutput,
    setShowDetailsMock,
    setOrderByMock
  };
}

test('renders "10 products found" prompt when productsCount = 10', () => {
  renderComponent({ productsCount: 10 });
  const prompt = screen.getByText(/10 products found/i);

  expect(prompt).toBeInTheDocument();
});

test('renders "1 product (without s) found" prompt when productsCount = 1', () => {
  renderComponent({ productsCount: 1 });
  const prompt = screen.getByText(/1 product found/i);

  expect(prompt).toBeInTheDocument();
});

test('renders "no products found" prompt when productsCount = 0', () => {
  renderComponent({ productsCount: 0 });
  const prompt = screen.getByText(/no products found/i);

  expect(prompt).toBeInTheDocument();
});

test('renders "loading" and does not render "products found" prompt when isLoading = true', () => {
  renderComponent({ isLoading: true });
  const prompt = screen.queryByText(/found/i);
  const loading = screen.getByText(/loading/i);

  expect(prompt).not.toBeInTheDocument();
  expect(loading).toBeInTheDocument();
});

test('renders interactive elements which invoke appropriate callbacks', () => {
  const { setShowDetailsMock, setOrderByMock } = renderComponent();

  const simpleViewButton = screen.getByRole('button', { name: /simple view/i });
  const detailedViewButton = screen.getByRole('button', { name: /detailed view/i });
  const sortSelect = screen.getByRole('combobox');

  expect(simpleViewButton).toBeInTheDocument();
  expect(detailedViewButton).toBeInTheDocument();
  expect(sortSelect).toBeInTheDocument();
  
  userEvent.click(simpleViewButton);
  expect(setShowDetailsMock).toHaveBeenCalledTimes(1);
  expect(setShowDetailsMock).toHaveBeenNthCalledWith(1, false)

  userEvent.click(detailedViewButton);
  expect(setShowDetailsMock).toHaveBeenCalledTimes(2);
  expect(setShowDetailsMock).toHaveBeenNthCalledWith(2, true)

  userEvent.selectOptions(sortSelect, 'nameAsc');
  expect(setOrderByMock).toHaveBeenCalledTimes(1);
  expect(setOrderByMock).toHaveBeenCalledWith('nameAsc');
});