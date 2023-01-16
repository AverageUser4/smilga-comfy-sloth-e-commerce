import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { mockFetch, sleep } from '../test-helpers/utils';
import allProducts from '../test-helpers/utils';
import useProducts from '../hooks/useProducts';
import { waitFor } from '@testing-library/react';

jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(global, 'fetch');
});
afterEach(() => {
  // console.error is mocked in some tests
  jest.restoreAllMocks();
});

test('expected initial state', () => {
  mockFetch(fetch, allProducts, 20);
  const { result } = renderHook(() => useProducts());

  expect(result.current.isLoading).toBe(true);
  expect(result.current.error).toBeFalsy();
  expect(result.current.allColors).toHaveLength(0);
  expect(result.current.allCompanies).toHaveLength(0);
  expect(result.current.allCategories).toHaveLength(0);
  expect(result.current.products).toHaveLength(0);
});

test.only('"error" is set to helpful message and "isLoading" = false when fetch throws', async () => {
  mockFetch(fetch, 'oops', 20, true);
  jest.spyOn(console, 'error').mockImplementation(()=>0);
  const { result, rerender } = renderHook(() => useProducts());

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.error).toEqual(expect.stringMatching(/we were unable/i));

  rerender();
  
  expect(result.current.isLoading).toBe(false);
});

// test('after successful fetch returned properties have expected values', async () => {
//   mockFetch(fetch, allProducts, 20);
//   const { result } = renderHook(() => useProducts());

//   Promise.resolve().then(() => jest.advanceTimersByTime(20));
//   await act(() => sleep());

//   expect(result.current.isLoading).toBe(false);
//   expect(result.current.error).toBeFalsy();
//   expect(result.current.allColors).toHaveLength(0);
//   expect(result.current.allCompanies).toHaveLength(0);
//   expect(result.current.allCategories).toHaveLength(0);
//   expect(result.current.products).toHaveLength(0);
// });

// products: data.products, 
// allCategories: data.allCategories,
// allCompanies: data.allCompanies,
// allColors: data.allColors,
// isLoading,
// error

/*
  - products.length === 23 when no filters are applied
  - all* properties represent correctly every entity (independent of filters)
  - test every filter on its on
  - note that orderBy just changes the order of items in array
*/