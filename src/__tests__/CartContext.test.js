import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCartContext } from "../utils/CartContext";
import { useAuthContext } from "../utils/AuthContext";
import { fetchMockAddImplementation, sleep, mockBroadcastChannel } from '../test-helpers/utils';

mockBroadcastChannel();
jest.useFakeTimers();
jest.spyOn(global, 'fetch');
jest.mock('../utils/AuthContext');

function getSomeCart() {
  return [
    { id: 'abc', color: '#000', count: 1, stock: 5, name: 'chair' },
    { id: 'cba', color: '#ff0000', count: 4, stock: 20, name: 'table' },
    { id: 'abc', color: '#0000ff', count: 2, stock: 5, name: 'stool' }
  ];
}

beforeEach(() => {
  localStorage.clear();
});

describe('state', () => {

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
    const cart = [{ id: 'abc', color: '#000', count: 1, stock: 5, name: 'chair' }];
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

});

describe('fetching and things affected by it', () => {

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
    const cart = getSomeCart();
    localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
    useAuthContext.mockReturnValue({ username });
    const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    act(() => result.current.requireFullData());
  
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('abc'));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('cba'));
  });
  
  test('after fetching, data property is available on each object in cartProductsData', async () => {
    fetchMockAddImplementation(fetch, 'return-value', 20);
  
    const username = '';
    const cart = getSomeCart();
    localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
    useAuthContext.mockReturnValue({ username });
    const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    act(() => result.current.requireFullData());
  
    Promise.resolve().then(() => jest.advanceTimersByTime(20));
    await act(() => sleep());
  
    expect(result.current.cartProductsData[0].data).toBe('return-value');
    expect(result.current.cartProductsData[1].data).toBe('return-value');
    expect(result.current.cartProductsData[2].data).toBe('return-value');
  });
  
  test('totalPrice and overflowing products are set after data is fetched', async () => {
    const price = 3999;
    const stock = 5;
    fetchMockAddImplementation(fetch, { price, shipping: true, stock, name: 'chair' }, 20);
  
    const username = '';
    const cart = [
      { id: 'abc', color: '#000', count: 3, stock, name: 'chair' },
      { id: 'abc', color: '#0000ff', count: 4, stock, name: 'table' }
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

});


describe('cart modifying functions', () => {

  test('cartGetItemCount and cartGetItemTypeCount work correctly', () => {
    fetchMockAddImplementation(fetch, 0, 20);
  
    const username = '';
    const cart = [
      { id: 'abc', color: '#000', count: 1, stock: 5, name: 'chair' },
      { id: 'cba', color: '#ff0000', count: 4, stock: 20, name: 'table' },
      { id: 'abc', color: '#0000ff', count: 2, stock: 5, name: 'stool' }
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
    const cart = getSomeCart();
    localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
    useAuthContext.mockReturnValue({ username });
    const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    expect(() => result.current.cartChangeCount('xxx', '#000', 5)).toThrow();
  });
  
  test('cartChangeCount adds brand-new item to the cart', () => {
    fetchMockAddImplementation(fetch, 0, 20);
  
    const username = '';
    const cart = getSomeCart();
    localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
    useAuthContext.mockReturnValue({ username });
    const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    act(() => result.current.cartChangeCount('xxx', '#000', 8, 100, 'chair'));
  
    expect(result.current.cartProductsData).toHaveLength(4);
    expect(JSON.parse(localStorage.getItem(`${username}-cart`))).toHaveLength(4);
    expect(result.current.cartProductsData.find(product => product.id === 'xxx')).toBeTruthy();
  });
  
  test('cartChangeCount removes item from cart when the item\'s count becomes <= 0', () => {
    fetchMockAddImplementation(fetch, 0, 20);
  
    const username = '';
    const cart = [
      { id: 'abc', color: '#000', count: 1, stock: 5, name: 'table' },
      { id: 'cba', color: '#ff0000', count: 4, stock: 20, name: 'chair' },
      { id: 'abc', color: '#0000ff', count: 2, stock: 5, name: 'stool' }
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
      { id: 'abc', color: '#000', count: 1, stock: 5, name: 'table' },
      { id: 'cba', color: '#ff0000', count: 4, stock: 20, name: 'chair' },
      { id: 'abc', color: '#0000ff', count: 2, stock: 5, name: 'stool' }
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
      { id: 'abc', color: '#000', count: 1, stock: 5, name: 'chair' },
      { id: 'cba', color: '#ff0000', count: 4, stock: 20, name: 'table' },
      { id: 'abc', color: '#0000ff', count: 2, stock: 5, name: 'stool' }
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
    const cart = getSomeCart();
    localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
    useAuthContext.mockReturnValue({ username });
    const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    act(() => result.current.cartEmpty());
  
    expect(result.current.cartProductsData).toHaveLength(0);
    expect(JSON.parse(localStorage.getItem(`${username}-cart`))).toHaveLength(0);
  });

});

describe('account changes', () => {

  test('after user logs in, if guest cart has items and account cart has no items, account cart gets all items of guest cart and guest cart gets emptied, mergeNotifictaionData.data is truthy', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const cart = getSomeCart();
    localStorage.setItem(`${guestName}-cart`, JSON.stringify(cart));
    useAuthContext.mockReturnValue({ username: guestName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    // all 3 items are in cart
    expect(result.current.cartProductsData).toHaveLength(3);

    useAuthContext.mockReturnValue({ username: userName });
    rerender();

    // cart is the same
    expect(result.current.cartProductsData).toHaveLength(3);
    // but guest cart in storage is empty
    expect(JSON.parse(localStorage.getItem(`${guestName}-cart`))).toHaveLength(0);

    expect(result.current.mergeNotificationData.data).toBeTruthy();
  }); 

  test('after user logs in, if guest cart does not have items, nothing happens to account cart, mergeNorificationData.data is falsy', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const cart = [];
    localStorage.setItem(`${guestName}-cart`, JSON.stringify(cart));
    useAuthContext.mockReturnValue({ username: guestName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    // cart is empty
    expect(result.current.cartProductsData).toHaveLength(0);

    useAuthContext.mockReturnValue({ username: userName });
    rerender();

    // cart is the same
    expect(result.current.cartProductsData).toHaveLength(0);
    // and guest cart in storage is empty
    expect(JSON.parse(localStorage.getItem(`${guestName}-cart`))).toHaveLength(0);

    // nothing changed so it's falsy
    expect(result.current.mergeNotificationData.data).toBeFalsy();
  });
  
  test('after user logs out, account cart stays the same in storage, but cart in state changes', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const cart = getSomeCart();
    localStorage.setItem(`${userName}-cart`, JSON.stringify(cart));
    useAuthContext.mockReturnValue({ username: userName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    // cart has items
    expect(result.current.cartProductsData).toHaveLength(3);

    useAuthContext.mockReturnValue({ username: guestName });
    rerender();

    // cart is now empty
    expect(result.current.cartProductsData).toHaveLength(0);
    // and user cart in storage is the same
    expect(JSON.parse(localStorage.getItem(`${userName}-cart`))).toHaveLength(3);
  });

});

describe('cart merging', () => {

  test('adding brand new item works', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const accountCart = getSomeCart();
    const guestCart = [{ id: 'xyz', color: '#0000ff', count: 1, stock: 3, name: 'cool chair' }];

    localStorage.setItem(`${userName}-cart`, JSON.stringify(accountCart));
    localStorage.setItem(`${guestName}-cart`, JSON.stringify(guestCart));
    useAuthContext.mockReturnValue({ username: guestName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });
  
    useAuthContext.mockReturnValue({ username: userName });
    rerender();

    // cart has new item added
    expect(result.current.cartProductsData).toHaveLength(4);
    expect(result.current.cartProductsData).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'xyz' })]));
  });

  test('adding count to existing item works (same color, stock not exceeded)', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const accountCart = [{ id: 'xyz', color: '#0000ff', count: 1, stock: 3, name: 'cool chair' }];
    const guestCart = [{ id: 'xyz', color: '#0000ff', count: 2, stock: 3, name: 'cool chair' }];

    localStorage.setItem(`${userName}-cart`, JSON.stringify(accountCart));
    localStorage.setItem(`${guestName}-cart`, JSON.stringify(guestCart));
    useAuthContext.mockReturnValue({ username: guestName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });

    useAuthContext.mockReturnValue({ username: userName });
    rerender();

    expect(result.current.cartProductsData).toHaveLength(1);
    expect(result.current.cartProductsData[0].count).toBe(3);
  });

  test('adding count to existing item works (different color, stock not exceeded)', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const accountCart = [{ id: 'xyz', color: '#0000ff', count: 1, stock: 3, name: 'cool chair' }];
    const guestCart = [{ id: 'xyz', color: '#ff0000', count: 2, stock: 3, name: 'cool chair' }];

    localStorage.setItem(`${userName}-cart`, JSON.stringify(accountCart));
    localStorage.setItem(`${guestName}-cart`, JSON.stringify(guestCart));
    useAuthContext.mockReturnValue({ username: guestName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });

    useAuthContext.mockReturnValue({ username: userName });
    rerender();

    expect(result.current.cartProductsData).toHaveLength(2);
    expect(result.current.cartProductsData).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#0000ff', count: 1 })]));
    expect(result.current.cartProductsData).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#ff0000', count: 2 })]));
  });

  test('adding count to existing item works (same color, stock exceeded)', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const accountCart = [{ id: 'xyz', color: '#0000ff', count: 1, stock: 3, name: 'cool chair' }];
    const guestCart = [{ id: 'xyz', color: '#0000ff', count: 3, stock: 3, name: 'cool chair' }];

    localStorage.setItem(`${userName}-cart`, JSON.stringify(accountCart));
    localStorage.setItem(`${guestName}-cart`, JSON.stringify(guestCart));
    useAuthContext.mockReturnValue({ username: guestName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });

    useAuthContext.mockReturnValue({ username: userName });
    rerender();

    expect(result.current.cartProductsData).toHaveLength(1);
    expect(result.current.cartProductsData[0].count).toBe(3);
  });

  test('adding count to existing item works (different color, stock exceeded)', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const accountCart = [{ id: 'xyz', color: '#0000ff', count: 2, stock: 3, name: 'cool chair' }];
    const guestCart = [{ id: 'xyz', color: '#ff0000', count: 2, stock: 3, name: 'cool chair' }];

    localStorage.setItem(`${userName}-cart`, JSON.stringify(accountCart));
    localStorage.setItem(`${guestName}-cart`, JSON.stringify(guestCart));
    useAuthContext.mockReturnValue({ username: guestName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });

    useAuthContext.mockReturnValue({ username: userName });
    rerender();

    expect(result.current.cartProductsData).toHaveLength(2);
    expect(result.current.cartProductsData).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#0000ff', count: 2 })]));
    expect(result.current.cartProductsData).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#ff0000', count: 1 })]));
  });
  
  test('not enough stock, nothing gets added', () => {
    fetchMockAddImplementation(fetch, 0, 20);
    
    const guestName = '';
    const userName = 'adam';
    const accountCart = [{ id: 'xyz', color: '#0000ff', count: 3, stock: 3, name: 'cool chair' }];
    const guestCart = [
      { id: 'xyz', color: '#ff0000', count: 2, stock: 3, name: 'cool chair' },
      { id: 'xyz', color: '#0000ff', count: 1, stock: 3, name: 'cool chair' }
    ];

    localStorage.setItem(`${userName}-cart`, JSON.stringify(accountCart));
    localStorage.setItem(`${guestName}-cart`, JSON.stringify(guestCart));
    useAuthContext.mockReturnValue({ username: guestName });
    const { result, rerender } = renderHook(() => useCartContext(), { wrapper: CartProvider });

    useAuthContext.mockReturnValue({ username: userName });
    rerender();

    expect(result.current.cartProductsData).toHaveLength(1);
    expect(result.current.cartProductsData).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#0000ff', count: 3 })]));
  });
  
});