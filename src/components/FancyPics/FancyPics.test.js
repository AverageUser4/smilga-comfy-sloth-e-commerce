import React from 'react';
import { render, screen } from '@testing-library/react';
import FancyPics from './FancyPics';
import small from '../../test-helpers/jpeg.jpeg';
import big from '../../test-helpers/jpeg2.jpeg';

test('it renders two images with appropriate alt attributes', () => {
  render(
    <FancyPics 
      smallImage={{ src: small, alt: 'small' }}
      bigImage={{ src: big, alt: 'big' }}
    />
  );
  const smallImage = screen.getByAltText('small');
  const bigImage = screen.getByAltText('big');

  expect(smallImage).toBeInTheDocument();
  expect(bigImage).toBeInTheDocument();
});