import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import Product from './Product';
import image from '../../test-helpers/jpeg.jpeg';
import { mockImageDecode } from '../../test-helpers/utils';

test('there is at least one link leading to product page', async () => {
  mockImageDecode();
  render(
    <Router>
      <Product image={image} price={1099} name="sofa" id="abcde" description="cool sofa"/>
    </Router>
  );

  await act(() => Promise.resolve());

  const links = screen.getAllByRole('link');
  const linkToProduct = links.find(link => link.getAttribute('href') === '/products/abcde');

  expect(linkToProduct).toBeInTheDocument();
});