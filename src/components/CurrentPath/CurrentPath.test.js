import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentPath from './CurrentPath';
import { useRouteMatch, BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useRouteMatch: jest.fn()
  };
});

test('renders link to the landing page', () => {
  useRouteMatch.mockReturnValue({ "path": "/about" });
  render(
    <Router>
      <CurrentPath/>
    </Router>
  );
  const link = screen.getByRole('link', { name: /home/i });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/');
});

test('renders element with text based on last part of path, but it is not a link', () => {
  useRouteMatch.mockReturnValue({ "path": "/about" });
  render(
    <Router>
      <CurrentPath/>
    </Router>
  );
  const ending = screen.getByText(/about/i);
  const endingLink = screen.queryByRole('link', { name: /about/i });

  expect(ending).toBeInTheDocument();
  expect(endingLink).not.toBeInTheDocument();
});

test('renders multiple links for long path', () => {
  useRouteMatch.mockReturnValue({ "path": "/about/something/also/whatever" });
  render(
    <Router>
      <CurrentPath/>
    </Router>
  );
  const links = screen.getAllByRole('link');

  expect(links).toHaveLength(4);
});

test('changes last path name when lastPathName prop is provided', () => {
  useRouteMatch.mockReturnValue({ "path": "/about" });
  render(
    <Router>
      <CurrentPath lastPathName="imLast"/>
    </Router>
  );
  const providedName = screen.getByText('imLast');
  const originalName = screen.queryByText(/about/i);

  expect(providedName).toBeInTheDocument();
  expect(originalName).not.toBeInTheDocument();
});

test('there is no trailing slash', () => {
  useRouteMatch.mockReturnValue({ "path": "/about" });
  render(
    <Router>
      <CurrentPath lastPathName="imLast"/>
    </Router>
  );
  const container = screen.getByTestId('paths-container');

  expect(container.lastChild.textContent.endsWith('/')).toBeFalsy();
});