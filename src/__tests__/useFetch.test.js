import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';
import useFetch from '../hooks/useFetch';
import { mockFetch } from '../test-helpers/utils';

jest.useFakeTimers();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 0));
}

beforeEach(() => {
  jest.spyOn(global, 'fetch');
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('has expected initial state', async () => {
  mockFetch(fetch, 1, 20);
  const { result } = renderHook(() => useFetch('abc'));
  expect(result.current.isFetching).toBe(true);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toBeNull();
});

test('has expected state after successful fetch', async () => {
  mockFetch(fetch, { a: 1 }, 20);
  const { result } = renderHook(() => useFetch('abc'));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ returnValue: { a: 1 }, url: 'abc' });
});

test('has expected state after unsuccessful fetch and logs error to console', async () => {
  mockFetch(fetch, 'oh no!', 20, true);
  jest.spyOn(console, 'error').mockImplementation(()=>0);
  const { result } = renderHook(() => useFetch('abc'));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(true);
  expect(result.current.data).toBeNull();
  expect(console.error.mock.calls[0][0]).toEqual({ returnValue: 'oh no!', url: 'abc' });
});

test('when parseJSON is set to false it returns raw data', async () => {
  mockFetch(fetch, { a: 1 }, 20);
  const { result } = renderHook(() => useFetch('abc', false));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep(20));

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual(expect.objectContaining({ json: expect.any(Function) }));
});

test('fetches again after url change', async () => {
  mockFetch(fetch, 1, 20);
  const { result, rerender } = renderHook((url = 'first') => useFetch(url));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ returnValue: 1, url: 'first'});

  rerender('second');

  expect(result.current.isFetching).toBe(true);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ returnValue: 1, url: 'first'});

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ returnValue: 1, url: 'second'});
});