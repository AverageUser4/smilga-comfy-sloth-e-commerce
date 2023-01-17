import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCartContext } from "../utils/CartContext";
import { useAuthContext } from "../utils/AuthContext";
import { fetchMockAddImplementation } from '../test-helpers/utils';

jest.spyOn(global, 'fetch');
jest.mock('../utils/AuthContext');

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

test('has expected initial state and does not attepmt to fetch data when requireFullData is not called', () => {
  fetchMockAddImplementation(fetch, 0, 20);
  useAuthContext.mockReturnValue({ username: 'adam' });
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

test('attempts to fetch data when "requireFullData" is called', () => {
  fetchMockAddImplementation(fetch, 0, 20);
  useAuthContext.mockReturnValue({ username: 'adam' });
  const { result } = renderHook(() => useCartContext(), { wrapper: CartProvider });

  /*
    doesnt work because there need to be items in cart to attepmt fetching
  */
  act(() => result.current.requireFullData());

  expect(fetch).toHaveBeenCalledTimes(1);
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