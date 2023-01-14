import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';
import useFetch from '../hooks/useFetch';
import { mockFetch } from '../test-helpers/utils';

jest.useFakeTimers();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

beforeEach(() => {
  jest.spyOn(global, 'fetch');
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('has expected initial state', async () => {
  mockFetch(fetch, { json: () => ({ a: 1 }) }, 20);
  const { result } = renderHook(() => useFetch());
  expect(result.current.isFetching).toBe(true);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toBeNull();
});

test('has expected state after successful fetch', async () => {
  mockFetch(fetch, { json: () => ({ a: 1 }) }, 20);
  const { result } = renderHook(() => useFetch());

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep(20));

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ a: 1 });
});

test('has expected state after unsuccessful fetch and logs error to console', async () => {
  mockFetch(fetch, 'oh no!', 20, true);
  jest.spyOn(console, 'error');
  const { result } = renderHook(() => useFetch());

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep(20));

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(true);
  expect(result.current.data).toBeNull();
  expect(console.error).toHaveBeenCalledWith('oh no!');
});

test('when parseJSON is set to false it returns raw data', async () => {
  mockFetch(fetch, { json: () => ({ a: 1 }) }, 20);
  const { result } = renderHook(() => useFetch('abc', false));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep(20));

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual(expect.objectContaining({ json: expect.any(Function) }));
});

// test('fetches again after url change', async () => {
//   mockFetch(fetch, { json: () => ({ a: 1 }) }, 20);
//   const { result } = renderHook(() => useFetch('first', false));

//   Promise.resolve().then(() => jest.advanceTimersByTime(20));
//   await act(() => sleep(20));

//   expect(result.current.isFetching).toBe(false);
//   expect(result.current.isError).toBe(false);
//   expect(result.current.data).toEqual(expect.objectContaining({ json: expect.any(Function) }));
// });