import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../utils/AuthContext';

beforeEach(() => sessionStorage.clear());

test('has expected state when sessionStorage is empty', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  expect(result.current.username).toBe('');
  expect(result.current.isLoggedIn).toBe(false);
  expect(result.current.login).toEqual(expect.any(Function));
  expect(result.current.logout).toEqual(expect.any(Function));
});

test('has expected state when "user" in sessionStorage is set to "adam"', () => {
  sessionStorage.setItem('user', 'adam');
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  expect(result.current.username).toBe('adam');
  expect(result.current.isLoggedIn).toBe(true);
  expect(result.current.login).toEqual(expect.any(Function));
  expect(result.current.logout).toEqual(expect.any(Function));
});

test('calling login with invalid username (not a string or length < 3) throws', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  expect(() => result.current.login()).toThrow();
  expect(() => result.current.login('ad')).toThrow();
});

test('calling logout when the user is not logged in logs error to console', () => {
  jest.spyOn(console, 'error').mockImplementation(()=>0);
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  result.current.logout();

  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(expect.stringMatching(/not logged in/i));

  console.error.mockRestore();
});

test('calling login results in expected state', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  act(() => result.current.login('adam'));

  expect(result.current.username).toBe('adam');
  expect(result.current.isLoggedIn).toBe(true);
});

test('calling logout results in expected state', () => {
  sessionStorage.setItem('user', 'eva');
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  act(() => result.current.logout());

  expect(result.current.username).toBe('');
  expect(result.current.isLoggedIn).toBe(false);
});

test('calling login when user is logged in overwrites current user', () => {
  sessionStorage.setItem('user', 'eva');
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  act(() => result.current.login('adam'));

  expect(result.current.username).toBe('adam');
  expect(result.current.isLoggedIn).toBe(true);
});