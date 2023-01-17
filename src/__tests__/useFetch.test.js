import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';
import useFetch from '../hooks/useFetch';
import { fetchMockAddImplementation, sleep } from '../test-helpers/utils';

jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(global, 'fetch');
});
afterEach(() => {
  // console.error is mocked in some tests
  jest.restoreAllMocks();
});

test('has expected initial state', async () => {
  fetchMockAddImplementation(fetch, 1, 20);
  const { result } = renderHook(() => useFetch('abc'));
  expect(result.current.isFetching).toBe(true);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toBeNull();
});

test('has expected state after successful fetch', async () => {
  fetchMockAddImplementation(fetch, { a: 1 }, 20);
  const { result } = renderHook(() => useFetch('abc'));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ a: 1 });
});

test('has expected state after unsuccessful fetch and logs error to console', async () => {
  fetchMockAddImplementation(fetch, 'oh no!', 20, true);
  jest.spyOn(console, 'error').mockImplementation(()=>0);
  const { result } = renderHook(() => useFetch('abc'));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(true);
  expect(result.current.data).toBeNull();
  expect(console.error.mock.calls[0][0]).toEqual(expect.any(Error));
});

test('when parseJSON is set to false it returns raw data', async () => {
  fetchMockAddImplementation(fetch, { a: 1 }, 20);
  const { result } = renderHook(() => useFetch('abc', false));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep(20));

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual(expect.objectContaining({ json: expect.any(Function) }));
});

test('fetches again after url change', async () => {
  fetchMockAddImplementation(fetch, 1, 20);
  const { result, rerender } = renderHook((url = 'first', parseJSON = false) => useFetch(url, parseJSON));

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ json: expect.any(Function), url: 'first' });
  expect(result.current.data.json()).toBe(1);

  rerender('second');

  expect(result.current.isFetching).toBe(true);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ json: expect.any(Function), url: 'first' });
  expect(result.current.data.json()).toBe(1);

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep());

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ json: expect.any(Function), url: 'second' });
  expect(result.current.data.json()).toBe(1);
});