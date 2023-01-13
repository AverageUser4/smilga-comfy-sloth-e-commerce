import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, render } from '@testing-library/react';
import useFetch from '../hooks/useFetch';

global.fetch = jest.fn();
let data = null;

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

function FakeComponent() {
  data = useFetch();
  return null;
}

test('works as expected', async () => {
  fetch.mockImplementation(async () => {
    return new Promise(resolve => 
      setTimeout(
        () => resolve(({ json: () => ({ a: 1 }) })),
        20 + Math.floor(Math.random() * 30)
      ))
  });

  act(() => render(<FakeComponent/>));
  expect(data.isFetching).toBe(true);

  await act(() => sleep(100));

  expect(data.isFetching).toBe(false);
});

/*
  - isFetching = true, until data or isError is set
  - isFetching = false when data or isError is set
  - 
  url, parseJSON = true, retry
*/
