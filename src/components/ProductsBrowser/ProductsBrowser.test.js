import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, render, act } from '@testing-library/react';
import { fetchMockAddImplementation } from '../../test-helpers/utils';
import allProducts from '../../test-helpers/allProducts.json';
import { sleep, mockImageDecode } from '../../test-helpers/utils';
import ProductsBrowser from './ProductsBrowser';
import userEvent from '@testing-library/user-event';

jest.useFakeTimers();
mockImageDecode();
jest.spyOn(global, 'fetch');

test('shows all products by default as there are no filters', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  render(<Router><ProductsBrowser/></Router>);
  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());
  
  const productElements = screen.getAllByRole('article');

  expect(productElements).toHaveLength(23);
});

test('toggling detailed view makes products show descriptions', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  render(<Router><ProductsBrowser/></Router>);
  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  let descriptions = screen.queryAllByText(/Cloud bread VHS hell of banjo/i);
  // eslint-disable-next-line
  expect(descriptions).toHaveLength(0);

  userEvent.click(screen.getByRole('button', { name: /detailed/i }));
  descriptions = screen.getAllByText(/Cloud bread VHS hell of banjo/i);
  expect(descriptions).toHaveLength(23);
});

test('filtering works as expected', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  render(<Router><ProductsBrowser/></Router>);
  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  const search = screen.getByRole('searchbox', { name: /search/i });
  const officeCategory = screen.getByRole('radio', { name: /office/i });
  const orderBySelect = screen.getByRole('combobox', { name: /sort by/i });
  const clearFilters = screen.getByRole('button', { name: /clear filters/i });

  userEvent.type(search, 'chair');
  userEvent.click(officeCategory);
  userEvent.selectOptions(orderBySelect, screen.getByRole('option', { name: /a-z/i }));

  let productElements = screen.getAllByRole('article');

  expect(productElements).toHaveLength(2);
  // eslint-disable-next-line
  expect(productElements[0].textContent).toEqual(expect.stringMatching(/accent chair/i));
  // eslint-disable-next-line
  expect(productElements[1].textContent).toEqual(expect.stringMatching(/suede armchair/i));

  userEvent.click(clearFilters);
  productElements = screen.getAllByRole('article');
  expect(productElements).toHaveLength(23);

  const companySelect = screen.getByRole('combobox', { name: /company/i });
  const colorRadioBlack = screen.getByRole('radio', { name: /black/i });
  const priceMin = screen.getByRole('spinbutton', { name: /min/i });
  const priceMax = screen.getByRole('spinbutton', { name: /max/i });

  userEvent.selectOptions(companySelect, screen.getByRole('option', { name: /liddy/i }));
  userEvent.click(colorRadioBlack);
  userEvent.type(priceMin, '40');
  userEvent.type(priceMax, '100');

  productElements = screen.getAllByRole('article');
  // eslint-disable-next-line
  expect(productElements).toHaveLength(1);
  // eslint-disable-next-line
  expect(productElements[0].textContent).toEqual(expect.stringMatching(/bar stool/i));

  const freeShippingCheckbox = screen.getByRole('checkbox', { name: /shipping/i });
  userEvent.click(clearFilters);
  userEvent.click(freeShippingCheckbox);
  productElements = screen.getAllByRole('article');
  expect(productElements).toHaveLength(12);
});

test('shows helpful message when there are no products that satisfy current filters', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  render(<Router><ProductsBrowser/></Router>);
  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  const search = screen.getByRole('searchbox', { name: /search/i });
  userEvent.type(search, 'rt3j1h98rt3ncr31ncu31inu5cnoi351un5319n5931c5');

  const productElement = screen.queryByRole('article');
  const message = screen.getByText(/we cannot find/i);

  expect(productElement).not.toBeInTheDocument();
  expect(message).toBeInTheDocument();
});