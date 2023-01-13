import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { ReactComponent as Icon } from '../../test-helpers/svg.svg';

test('renders expected heading and paragraph', () => {
  render(<Card heading="my heading" text="my paragraph"/>);
  const heading = screen.getByRole('heading', { name: 'my heading' });
  const paragraph = screen.getByText('my paragraph');

  expect(heading).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});

test('renders icon when it is provided', () => {
  render(<Card heading="a" text="b" Icon={Icon}/>);
  const icon = screen.getByTestId('icon');

  expect(icon).toBeInTheDocument();
});

test('does not render icon when it is not provided', () => {
  render(<Card heading="a" text="b"/>);
  const icon = screen.queryByTestId('icon');

  expect(icon).not.toBeInTheDocument();
});