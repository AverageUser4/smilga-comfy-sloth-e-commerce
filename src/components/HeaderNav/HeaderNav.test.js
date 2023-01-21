import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { useAuthContext } from '../../utils/AuthContext';
import Profile from '../Profile/Profile';
import HeaderNav from './HeaderNav';

jest.mock('../../utils/AuthContext');
jest.mock('../Profile/Profile');

test('renders expected links when user is not logged in', () => {
  useAuthContext.mockReturnValue({ isLoggedIn: false });
  Profile.render.mockReturnValue(null);
  render(<Router><HeaderNav shouldBeVisible={true} shouldTrap={true} close={()=>0}/></Router>);

  const home = screen.getAllByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const products = screen.getByRole('link', { name: /products/i });
  const checkout = screen.queryByRole('link', { name: /checkout/i });

  expect(home[0]).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(products).toBeInTheDocument();
  expect(checkout).not.toBeInTheDocument();
});

test('renders expected links when user is logged in', () => {
  useAuthContext.mockReturnValue({ isLoggedIn: true });
  Profile.render.mockReturnValue(null);
  render(<Router><HeaderNav shouldBeVisible={true} shouldTrap={true} close={()=>0}/></Router>);

  const home = screen.getAllByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const products = screen.getByRole('link', { name: /products/i });
  const checkout = screen.getByRole('link', { name: /checkout/i });

  expect(home[0]).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(products).toBeInTheDocument();
  expect(checkout).toBeInTheDocument();
});