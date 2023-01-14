import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';
import useFetch from '../hooks/useFetch';
import { mockFetch } from '../test-helpers/utils';

global.fetch = jest.fn();
jest.useFakeTimers();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test('works as expected', async () => {
  mockFetch(fetch, { json: () => ({ a: 1 }) }, 20);
  const { result } = renderHook(() => useFetch());
  expect(result.current.isFetching).toBe(true);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toBeNull();

  Promise.resolve().then(() => jest.advanceTimersByTime(20));
  await act(() => sleep(20));

  expect(result.current.isFetching).toBe(false);
  expect(result.current.isError).toBe(false);
  expect(result.current.data).toEqual({ a: 1 });
});

/*
  - initial state: data: null, isFetching: true, isError: false
  - after time passes: data: provided data, isFetching: false, isError: false
  - after time passes, when rejected: data: provided data, isFetching: false, isError: true
  - when retry changes: data: the same, isFetching: true, isError: the same
  - parseJSON affects data
*/