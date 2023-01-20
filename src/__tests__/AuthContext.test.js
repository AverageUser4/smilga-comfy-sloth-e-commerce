import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../utils/AuthContext';
import { mockBroadcastChannel } from '../test-helpers/utils';
import { deleteAllCookies } from '../utils/utils';

mockBroadcastChannel();
beforeEach(() => { 
  deleteAllCookies();
  if(document.cookie)
    throw new Error('Seems like deleteAllCookies() did not delete all cookies...');
});

test('user data is stored in cookie', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  act(() => result.current.login('adam'));
  expect(document.cookie).toEqual(expect.stringContaining('adam'));
});

test('has expected state when user is not logged in (default)', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  expect(result.current.username).toBe('');
  expect(result.current.isLoggedIn).toBe(false);
  expect(result.current.login).toEqual(expect.any(Function));
  expect(result.current.logout).toEqual(expect.any(Function));
});

test('has expected state after calling login', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  act(() => result.current.login('adam'));

  expect(result.current.username).toBe('adam');
  expect(result.current.isLoggedIn).toBe(true);
});

test('calling login with invalid username (not a string or length < 3) throws', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  expect(() => result.current.login()).toThrow();
  expect(() => result.current.login('ad')).toThrow();
  expect(() => result.current.login(['adam'])).toThrow();
});

test('calling logout when the user is not logged in logs error to console', () => {
  jest.spyOn(console, 'error').mockImplementation(()=>0);
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  act(() => result.current.logout());

  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(expect.stringMatching(/not logged in/i));

  console.error.mockRestore();
});

test('calling logout results in expected state', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  act(() => result.current.login('adam'));
  act(() => result.current.logout());

  expect(result.current.username).toBe('');
  expect(result.current.isLoggedIn).toBe(false);
});

test('calling login when user is logged in overwrites current user', () => {
  const { result } = renderHook(() => useAuthContext(), { wrapper: AuthProvider });

  act(() => result.current.login('eva'));
  act(() => result.current.login('adam'));

  expect(result.current.username).toBe('adam');
  expect(result.current.isLoggedIn).toBe(true);
});