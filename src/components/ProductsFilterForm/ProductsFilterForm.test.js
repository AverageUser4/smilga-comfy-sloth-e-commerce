import React from "react";
import { screen, render, getByRole } from '@testing-library/react';
import ProductsFilterForm from "./ProductsFilterForm";
import { defaultOptions as filters } from "../../hooks/useProducts";
import userEvent from "@testing-library/user-event";

function renderComponent() {
  const setFilterMock = jest.fn();
  const resetMock = jest.fn();
  
  const renderOutput = render(
    <ProductsFilterForm
      queryString={filters.queryString}
      setQueryString={setFilterMock}
      category={filters.category}
      setCategory={setFilterMock}
      company={filters.company}
      setCompany={setFilterMock}
      color={filters.color}
      setColor={setFilterMock}
      priceMin={filters.priceMin}
      setPriceMin={setFilterMock}
      priceMax={filters.priceMax}
      setPriceMax={setFilterMock}
      freeShippingOnly={filters.freeShippingOnly}
      setFreeShippingOnly={setFilterMock}
      resetFilters={resetMock}
      categories={['office', 'kitchen']}
      companies={['liddy', 'ikea']}
      colors={['#ff0000', '#00ff00']}
    />
  );

  return {
    renderOutput,
    setFilterMock,
    resetMock
  };
}

test('renders interactive queryString searchbox', () => {
  const { setFilterMock } = renderComponent();

  const searchInput = screen.getByRole('searchbox', { name: /search/i });
  userEvent.type(searchInput, 'ch');

  expect(searchInput).toBeInTheDocument();
  expect(setFilterMock).toHaveBeenNthCalledWith(1, 'c');
  expect(setFilterMock).toHaveBeenNthCalledWith(2, 'h');
});

test('renders interactive category radio buttons', () => {
  const { setFilterMock } = renderComponent();

  const categoryFieldset = screen.getByRole('group', { name: /category/i });
  const officeRadio = getByRole(categoryFieldset, 'radio', { name: /office/i });
  const kitchenRadio = getByRole(categoryFieldset, 'radio', { name: /kitchen/i });
  const allRadio = getByRole(categoryFieldset, 'radio', { name: /all/i });

  expect(categoryFieldset).toBeInTheDocument();
  expect(officeRadio).toBeInTheDocument();
  expect(kitchenRadio).toBeInTheDocument();
  expect(allRadio).toBeInTheDocument();
  expect(allRadio).toBeChecked();

  userEvent.click(officeRadio);
  userEvent.click(kitchenRadio);
  
  expect(setFilterMock).toHaveBeenNthCalledWith(1, 'office');
  expect(setFilterMock).toHaveBeenNthCalledWith(2, 'kitchen');
});

test('renders interactive company combobox (select)', () => {
  const { setFilterMock } = renderComponent();

  const companyFieldset = screen.getByRole('group', { name: /company/i });
  const companySelect = getByRole(companyFieldset, 'combobox');
  const liddyOption = getByRole(companyFieldset, 'option', { name: /liddy/i });
  const ikeaOption = getByRole(companyFieldset, 'option', { name: /ikea/i });
  const allOption = getByRole(companyFieldset, 'option', { name: /all/i });

  expect(companyFieldset).toBeInTheDocument();
  expect(companySelect).toBeInTheDocument();
  expect(companySelect).toHaveValue('');
  expect(liddyOption).toBeInTheDocument();
  expect(ikeaOption).toBeInTheDocument();
  expect(allOption).toBeInTheDocument();

  userEvent.selectOptions(companySelect, liddyOption);
  userEvent.selectOptions(companySelect, ikeaOption);

  expect(setFilterMock).toHaveBeenNthCalledWith(1, 'liddy');
  expect(setFilterMock).toHaveBeenNthCalledWith(2, 'ikea');
});

test('renders interactive colors radio buttons', () => {
  const { setFilterMock } = renderComponent();

  const colorsFieldset = screen.getByRole('group', { name: /colors/i });
  const redRadio = getByRole(colorsFieldset, 'radio', { name: /red/i });
  const greenRadio = getByRole(colorsFieldset, 'radio', { name: /green/i });
  const allRadio = getByRole(colorsFieldset, 'radio', { name: /all/i });

  expect(colorsFieldset).toBeInTheDocument();
  expect(redRadio).toBeInTheDocument();
  expect(greenRadio).toBeInTheDocument();
  expect(allRadio).toBeInTheDocument();
  expect(allRadio).toBeChecked();

  userEvent.click(redRadio);
  userEvent.click(greenRadio);
  
  expect(setFilterMock).toHaveBeenNthCalledWith(1, '#ff0000');
  expect(setFilterMock).toHaveBeenNthCalledWith(2, '#00ff00');
});

test('renders interactive price spinbuttons (number inputs)', () => {
  const { setFilterMock } = renderComponent();

  const priceFieldset = screen.getByRole('group', { name: /price/i });
  const minInput = getByRole(priceFieldset, 'spinbutton', { name: /min/i });
  const maxInput = getByRole(priceFieldset, 'spinbutton', { name: /max/i });

  expect(priceFieldset).toBeInTheDocument();
  expect(minInput).toBeInTheDocument();
  expect(maxInput).toBeInTheDocument();

  userEvent.type(minInput, '30');
  userEvent.type(maxInput, '80');
  
  expect(setFilterMock).toHaveBeenNthCalledWith(1, '3');
  expect(setFilterMock).toHaveBeenNthCalledWith(2, '30');
  expect(setFilterMock).toHaveBeenNthCalledWith(3, '8');
  expect(setFilterMock).toHaveBeenNthCalledWith(4, '80');
});

test('renders interactive shipping checkbox', () => {
  const { setFilterMock } = renderComponent();

  const freeShippingCheckbox = screen.getByRole('checkbox', /free shipping/i);
  expect(freeShippingCheckbox).toBeInTheDocument();

  userEvent.click(freeShippingCheckbox);
  expect(setFilterMock).toHaveBeenCalledTimes(1);
  expect(setFilterMock).toHaveBeenCalledWith(true);
});

test('renders interactive clear filters button', () => {
  const { resetMock } = renderComponent();

  const clearButton = screen.getByRole('button', /clear filters/i);
  expect(clearButton).toBeInTheDocument();

  userEvent.click(clearButton);
  expect(resetMock).toHaveBeenCalledTimes(1);
});