import React from 'react';
import { screen, render } from '@testing-library/react';
import { useCartContext } from '../../utils/CartContext';
import Messenger from './Messenger';

jest.mock('../../utils/CartContext');

test('does not render notification when data.content is falsy', () => {
  useCartContext.mockReturnValue({ mergeNotificationData: { content: '', type: '', timeout: 5000 } });
  render(<Messenger/>);

  const notification = screen.queryByRole('alert');

  expect(notification).not.toBeInTheDocument();
});

test('renders notification when data is provided', () => {
  useCartContext.mockReturnValue({ mergeNotificationData: { content: 'hello', type: '', timeout: 5000 } });
  render(<Messenger/>);

  const notification = screen.getByRole('alert');

  expect(notification).toBeInTheDocument();
});