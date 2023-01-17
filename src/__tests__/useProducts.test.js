import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { fetchMockAddImplementation, sleep } from '../test-helpers/utils';
import allProducts from '../test-helpers/allProducts.json';
import useProducts from '../hooks/useProducts';

jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(global, 'fetch');
});
afterEach(() => {
  // console.error is mocked in some tests
  jest.restoreAllMocks();
});

test('expected initial state', () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook(() => useProducts());

  expect(result.current.isLoading).toBe(true);
  expect(result.current.error).toBeFalsy();
  expect(result.current.allColors).toHaveLength(0);
  expect(result.current.allCompanies).toHaveLength(0);
  expect(result.current.allCategories).toHaveLength(0);
  expect(result.current.products).toHaveLength(0);
});

test('"error" is set to helpful message and "isLoading" = false when fetch throws', async () => {
  fetchMockAddImplementation(fetch, 'oops', 20, true);
  jest.spyOn(console, 'error').mockImplementation(()=>0);
  const { result } = renderHook(() => useProducts());

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toEqual(expect.stringMatching(/we were unable/i));
});

test('after successful fetch returned properties have expected values', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook(() => useProducts());

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBeFalsy();

  expect(result.current.allColors).toHaveLength(5);
  expect(result.current.allColors).toEqual(expect.arrayContaining(["#ff0000", "#00ff00", "#0000ff", "#000", "#ffb900"]));

  expect(result.current.allCompanies).toHaveLength(4);
  expect(result.current.allCompanies).toEqual(expect.arrayContaining(["marcos", "liddy", "ikea", "caressa"]));

  expect(result.current.allCategories).toHaveLength(6);
  expect(result.current.allCategories).toEqual(expect.arrayContaining(["office", "living room", "kitchen", "bedroom", "dining", "kids"]));

  expect(result.current.products).toHaveLength(23);
  expect(result.current.products[0].id).toEqual(expect.any(String));
  expect(result.current.products[0].name).toEqual(expect.any(String));
  expect(result.current.products[0].price).toEqual(expect.any(Number));
  expect(result.current.products[0].image).toEqual(expect.any(String));
  expect(result.current.products[0].colors).toEqual(expect.any(Array));
  expect(result.current.products[0].company).toEqual(expect.any(String));
  expect(result.current.products[0].description).toEqual(expect.any(String));
  expect(result.current.products[0].category).toEqual(expect.any(String));
  const IDs = result.current.products.map(product => product.id);
  expect(IDs).toHaveLength(23);
  // all ids are unique
  expect([...new Set(IDs)]).toHaveLength(23);
});

test('changing filters has no effect on all* properties and does not set isLoading to true', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result, rerender } = renderHook((options = {}) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  rerender({ featuredOnly: true, queryString: 'fasifj9a8ue8' });

  expect(result.current.products).toHaveLength(0);
  expect(result.current.allColors).toHaveLength(5);
  expect(result.current.allCompanies).toHaveLength(4);
  expect(result.current.allCategories).toHaveLength(6);
  expect(result.current.isLoading).toBe(false);
});

test('featuredOnly filter works', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook((options = { featuredOnly: true }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(6);
});

test('queryString filter works', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook((options = { queryString: 'le' }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(7);
});

test('category filter works', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook((options = { category: 'kids' }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(1);
});

test('company filter works', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook((options = { company: 'liddy' }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(6);
});

test('color filter works', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook((options = { color: '#000' }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(9);
});

test('priceMin filter works', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook((options = { priceMin: 1099 }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(8);
});

test('priceMax filter works', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result } = renderHook((options = { priceMax: 800 }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(14);
});

test('orderBy filter works', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result, rerender } = renderHook((options = { orderBy: 'nameDesc' }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(23);
  expect(result.current.products[0].name).toBe('wooden table');
  expect(result.current.products[22].name).toBe('accent chair');

  rerender({ orderBy: 'nameAsc' });
  expect(result.current.products).toHaveLength(23);
  expect(result.current.products[0].name).toBe('accent chair');
  expect(result.current.products[22].name).toBe('wooden table');

  rerender({ orderBy: 'priceDesc' });
  expect(result.current.products).toHaveLength(23);
  expect(result.current.products[0].price).toBe(309999);
  expect(result.current.products[22].price).toBe(3099);

  rerender({ orderBy: 'priceAsc' });
  expect(result.current.products).toHaveLength(23);
  expect(result.current.products[0].price).toBe(3099);
  expect(result.current.products[22].price).toBe(309999);
});

test('multiple filters work together', async () => {
  fetchMockAddImplementation(fetch, allProducts, 20);
  const { result, rerender } = renderHook((options = { orderBy: 'priceAsc', company: 'marcos', color: '#00ff00' }) => useProducts(options));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.products).toHaveLength(3);
  expect(result.current.products[0].name).toBe('armchair');
  expect(result.current.products[2].name).toBe('sofa set');

  rerender({ orderBy: 'nameDesc', category: 'office', priceMin: 300, priceMax: 1000 });
  expect(result.current.products).toHaveLength(3);
  expect(result.current.products[0].name).toBe('wooden desk');
  expect(result.current.products[2].name).toBe('high-back bench');

  rerender({ freeShippingOnly: true, queryString: 'c', category: 'living room', orderBy: 'nameDesc' });
  expect(result.current.products).toHaveLength(2);
  expect(result.current.products[0].name).toBe('simple chair');
  expect(result.current.products[1].name).toBe('entertainment center');
});