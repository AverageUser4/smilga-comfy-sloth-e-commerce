import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Gallery from './Gallery';
import photo_1 from '../../__tests__/jpeg.jpeg';
import photo_2 from '../../__tests__/jpeg2.jpeg';

test('renders provided photos, first photo gets rendered two times as it is magnified', () => {
  render(
    <Gallery
      photos={[
        {
          src: photo_1,
          alt: 'one'
        },
        {
          src: photo_2,
          alt: 'two'
        },
      ]}
    />
  );
  const renderedPhotos = screen.getAllByRole('img');
  const first = screen.getAllByRole('img', { name: 'one' });
  const second = screen.getByRole('img', { name: 'two' });

  expect(first).toHaveLength(2);
  expect(second).toBeInTheDocument();
  expect(renderedPhotos).toHaveLength(3);
});

test('clicking second photo makes it magnified', () => {
  render(
    <Gallery
      photos={[
        {
          src: photo_1,
          alt: 'one'
        },
        {
          src: photo_2,
          alt: 'two'
        },
      ]}
    />
  );
  const second = screen.getByRole('img', { name: 'two' });
  userEvent.click(second);
  const secondAgain = screen.getAllByRole('img', { name: 'two' });

  expect(secondAgain).toHaveLength(2);
});
