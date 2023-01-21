import React from 'react';
import { render, screen, getByRole } from '@testing-library/react';
import { useLocation, BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Profile from './Profile';
import { useAuthContext } from '../../utils/AuthContext';
import { useCartContext } from '../../utils/CartContext';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...actual,
    useLocation: jest.fn()
  };
});
jest.mock('../../utils/AuthContext');
jest.mock('../../utils/CartContext');

function renderComponent({ makeLoggedIn = false, mergeDataData = null } = {}) {
  const logoutMock = jest.fn();
  useAuthContext.mockReturnValue({ 
    isLoggedIn: makeLoggedIn,
    username: makeLoggedIn ? 'adam' : '',
    logout: logoutMock 
  });
  useCartContext.mockReturnValue({ 
    cartProductsData: [], 
    mergeNotificationData: { 
      content: 'something merge',
      timeout: 3000,
      type: '',
      data: mergeDataData 
    } 
  });
  useLocation.mockReturnValue({ pathname: '/' });

  const renderOutput = render(<Router><Profile/></Router>);

  const profileButton = screen.getByRole('button', { name: makeLoggedIn ? /adam/i : /guest/i });
  const cartLink = screen.getByRole('link', { name: /cart(?! changelog)/i });
  const cartChangelogLink = screen.queryByRole('link', { name: /cart changelog/i });
  const loginLink = screen.queryByRole('link', { name: /login/i });
  const logoutButton = screen.queryByRole('button', { name: /logout/i });

  return {
    logoutMock, renderOutput, profileButton, cartLink,
    cartChangelogLink, loginLink, logoutButton
  };
}

test('renders expected items when user is not logged in', () => {
  const { profileButton, cartLink, cartChangelogLink, loginLink, logoutButton } = renderComponent({ mergeDataData: [<li key="0">hello</li>]});

  expect(profileButton).toBeInTheDocument();
  expect(cartLink).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
  // although mergeNotificationData.data is set user has to also be logged in for cartChangelogLink to be shown
  expect(cartChangelogLink).not.toBeInTheDocument();
  expect(logoutButton).not.toBeInTheDocument();
});

test('renders expected items when user is logged in', () => {
  const { profileButton, cartLink, cartChangelogLink, loginLink, logoutButton } = renderComponent({ makeLoggedIn: true });

  expect(profileButton).toBeInTheDocument();
  expect(cartLink).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();
  expect(cartChangelogLink).not.toBeInTheDocument();
  expect(loginLink).not.toBeInTheDocument();
});

test('renders chart changelog link when user is logged in and mergeNotificationData.data is set', () => {
  const { cartChangelogLink } = renderComponent({ makeLoggedIn: true, mergeDataData: [<li key="0">hello</li>] });
  expect(cartChangelogLink).toBeInTheDocument();
});

test('clicking logout button opens dialog with "yes" and "no" buttons, clicking "no" closes dialog, clicking "yes" calls "logout" mock and closes dialog', () => {
  const { logoutMock, logoutButton } = renderComponent({ makeLoggedIn: true });

  let dialog = screen.queryByRole('dialog');
  expect(dialog).not.toBeInTheDocument();

  userEvent.click(logoutButton);
  dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  let yesButton = getByRole(dialog, 'button', { name: /yes/i });
  let noButton = getByRole(dialog, 'button', { name: /no/i });

  expect(yesButton).toBeInTheDocument();
  expect(noButton).toBeInTheDocument();

  userEvent.click(noButton);
  expect(dialog).not.toBeInTheDocument();
  expect(logoutMock).not.toHaveBeenCalled();

  userEvent.click(logoutButton);
  dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  yesButton = getByRole(dialog, 'button', { name: /yes/i });
  noButton = getByRole(dialog, 'button', { name: /no/i });

  userEvent.click(yesButton);
  expect(dialog).not.toBeInTheDocument();
  expect(logoutMock).toHaveBeenCalledTimes(1);
});