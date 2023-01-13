import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from './Rating';

test('works for 2 / 10', () => {
  render(
    <Rating
      amount={2}
      outOf={10}
    />
  );
  const value = screen.getByTitle(/1.00 stars out of 5/i);

  expect(value).toBeInTheDocument();
});

test('works for 7 / 13', () => {
  render(
    <Rating
      amount={7}
      outOf={13}
    />
  );
  const value = screen.getByTitle(/2.69 stars out of 5/i);

  expect(value).toBeInTheDocument();
});

test('works for 0 / 1', () => {
  render(
    <Rating
      amount={0}
      outOf={1}
    />
  );
  const value = screen.getByTitle(/0.00 stars out of 5/i);

  expect(value).toBeInTheDocument();
});


test('works for 5 / 5', () => {
  render(
    <Rating
      amount={5}
      outOf={5}
    />
  );
  const value = screen.getByTitle(/5.00 stars out of 5/i);

  expect(value).toBeInTheDocument();
});