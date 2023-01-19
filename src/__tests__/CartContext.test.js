import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCartContext } from "../utils/CartContext";
import { useAuthContext } from "../utils/AuthContext";
import { fetchMockAddImplementation, sleep, mockBroadcastChannel } from '../test-helpers/utils';

/*
  now products in cart contain also "name" property which makes these tests kinda unrealistic
*/

mockBroadcastChannel();
jest.useFakeTimers();
jest.spyOn(global, 'fetch');
jest.mock('../utils/AuthContext');

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

test('has expected initial state when there is no cart for current user in storage', () => {
  fetchMockAddImplementation(fetch, 0, 20);
  useAuthContext.mockReturnValue({ username: '' });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  expect(result.current.cartProductsData).toEqual([]);
  expect(result.current.totalPrice).toBeFalsy();
  expect(result.current.overflowingProducts).toEqual([]);
  expect(result.current.requireFullData).toEqual(expect.any(Function));
  expect(result.current.cartGetItemCount).toEqual(expect.any(Function));
  expect(result.current.cartGetItemTypeCount).toEqual(expect.any(Function));
  expect(result.current.cartChangeCount).toEqual(expect.any(Function));
  expect(result.current.cartRemove).toEqual(expect.any(Function));
  expect(result.current.cartEmpty).toEqual(expect.any(Function));

  expect(fetch).not.toHaveBeenCalled();
});

test('has expected initial state when current user has cart in storage', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [{ id: 'abc', color: '#000', count: 1, stock: 5 }];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  expect(result.current.cartProductsData).toEqual([expect.any(Object)]);
  expect(result.current.cartProductsData[0].color).toBe('#000');
  expect(result.current.cartProductsData[0].count).toBe(1);
  expect(result.current.cartProductsData[0].data).toBeFalsy();
  expect(result.current.cartProductsData[0].id).toBe('abc');
  expect(result.current.cartProductsData[0].sameProductDiffColorsCount).toBe(0);
  expect(result.current.cartProductsData[0].stock).toBe(5);

  expect(result.current.totalPrice).toBeFalsy();
  expect(result.current.overflowingProducts).toEqual([]);

  expect(fetch).not.toHaveBeenCalled();
});

test('fetch gets called when current user has cart in storage and "requireFullData" function has been called', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [{ id: 'abc', color: '#000', count: 1, stock: 5 }];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.requireFullData());

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('abc'));
});

test('fetch gets called only once for every unique id', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 3, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.requireFullData());

  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('abc'));
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('cba'));
});

test('after fetching, data property is available on each object in cartProductsData', async () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 3, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.requireFullData());

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.cartProductsData[0].data).toBe(0);
  expect(result.current.cartProductsData[1].data).toBe(0);
  expect(result.current.cartProductsData[2].data).toBe(0);
});

test('totalPrice and overflowing products are set after data is fetched', async () => {
  const price = 3999;
  const stock = 5;
  fetchMockAddImplementation(fetch, { price, shipping: true, stock, name: 'chair' }, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 3, stock },
    { id: 'abc', color: '#0000ff', count: 4, stock }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.requireFullData());

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.totalPrice).toEqual({ products: price * 7, shipping: 0 });
  expect(result.current.overflowingProducts).toHaveLength(1);
  expect(result.current.overflowingProducts[0]).toEqual({ id: 'abc', name: 'chair', overflow: 2 });
});

test('cartGetItemCount and cartGetItemTypeCount work correctly', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 4, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  expect(result.current.cartGetItemCount('abc', '#000')).toBe(1);
  expect(result.current.cartGetItemCount('abc', '#0000ff')).toBe(2);
  expect(result.current.cartGetItemCount('cba', '#ff0000')).toBe(4);
  expect(result.current.cartGetItemTypeCount('cba')).toBe(4);
  expect(result.current.cartGetItemTypeCount('abc')).toBe(3);
});

test('cartChangeCount throws when adding brand-new item to the cart and stock is not provided', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 4, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  expect(() => result.current.cartChangeCount('xxx', '#000', 5)).toThrow();
});

test('cartChangeCount adds brand-new item to the cart', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 4, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.cartChangeCount('xxx', '#000', 8, 100, 'chair'));

  expect(result.current.cartProductsData).toHaveLength(4);
  expect(JSON.parse(localStorage.getItem(`${username}-cart`))).toHaveLength(4);
  expect(result.current.cartProductsData.find(product => product.id === 'xxx')).toBeTruthy();
});

test('cartChangeCount removes item from cart', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 4, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.cartChangeCount('abc', '#000', -1));

  expect(result.current.cartProductsData).toHaveLength(2);
  expect(JSON.parse(localStorage.getItem(`${username}-cart`))).toHaveLength(2);
  expect(result.current.cartProductsData.find(product => product.id === 'abc' && product.color === '#000')).toBeFalsy();
});

test('cartChangeCount increases and decreases count', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 4, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.cartChangeCount('cba', '#ff0000', -2));
  act(() => result.current.cartChangeCount('abc', '#0000ff', 2));

  expect(result.current.cartProductsData).toHaveLength(3);
  expect(JSON.parse(localStorage.getItem(`${username}-cart`))).toHaveLength(3);
  expect(result.current.cartProductsData.find(product => product.id === 'abc' && product.color === '#0000ff').count).toBe(4);
  expect(result.current.cartProductsData.find(product => product.id === 'cba').count).toBe(2);
});

test('cartRemove removes item from cart', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 4, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.cartRemove('abc', '#0000ff'));

  expect(result.current.cartProductsData).toHaveLength(2);
  expect(JSON.parse(localStorage.getItem(`${username}-cart`))).toHaveLength(2);
  expect(result.current.cartProductsData.find(product => product.id === 'abc' && product.color === '#0000ff')).toBeFalsy();
});

test('cartEmpty empties the cart', () => {
  fetchMockAddImplementation(fetch, 0, 20);

  const username = '';
  const cart = [
    { id: 'abc', color: '#000', count: 1, stock: 5 },
    { id: 'cba', color: '#ff0000', count: 4, stock: 20 },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5 }
  ];
  localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
  useAuthContext.mockReturnValue({ username });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  act(() => result.current.cartEmpty());

  expect(result.current.cartProductsData).toHaveLength(0);
  expect(JSON.parse(localStorage.getItem(`${username}-cart`))).toHaveLength(0);
});

// cartProductsData,
// totalPrice,
// overflowingProducts,
// requireFullData,
// cartGetItemCount,
// cartGetItemTypeCount,
// cartChangeCount,
// cartRemove,
// cartEmpty,