import { renderHook } from "@testing-library/react";
import { CartProvider, useCartContext } from "../utils/CartContext";
import { useAuthContext } from "../utils/AuthContext";

jest.mock('../utils/AuthContext');

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

test('something', () => {
  useAuthContext.mockReturnValue({ username: 'adam' });
  renderHook(() => useCartContext(), { wrapper: CartProvider });
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