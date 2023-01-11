import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders element containing "all rights reserved" text', () => {
  render(<Footer/>);
  const text = screen.getByText(/all rights reserved/i);

  expect(text).toBeInTheDocument();
});