import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { AuthProvider, useAuthContext } from '../../utils/AuthContext';

jest.mock('../../utils/AuthContext');

function setup() {
  const loginMock = jest.fn();
  useAuthContext.mockReturnValue({ login: loginMock });
  AuthProvider.mockImplementation(({ children }) => <div>{children}</div>);

  const renderOutput = render(
    <AuthProvider>
      <LoginForm/>
    </AuthProvider>
  );

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', /login/i);

  return {
    loginMock,
    renderOutput,
    usernameInput,
    passwordInput,
    loginButton
  };
}

test('renders inputs', () => {
  const { usernameInput, passwordInput, loginButton } = setup();

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('user can type into both inputs', () => {
  const { usernameInput, passwordInput } = setup();

  userEvent.type(usernameInput, 'adam');
  userEvent.type(passwordInput, 'qwerty');
  
  expect(usernameInput).toHaveDisplayValue('adam');
  expect(passwordInput).toHaveDisplayValue('qwerty');
});

test('clicking login button when both inputs are valid runs login function with username provided', () => {
  const { usernameInput, passwordInput, loginButton, loginMock } = setup();

  userEvent.type(usernameInput, 'adam');
  userEvent.type(passwordInput, 'qwerty');
  userEvent.click(loginButton);
  
  expect(loginMock).toHaveBeenCalledTimes(1);
  expect(loginMock).toHaveBeenCalledWith('adam');
});

test('clicking login button when both inputs are invalid renders username alert and does not run login function', () => {
  const { loginButton, loginMock } = setup();

  userEvent.click(loginButton);
  const alert = screen.getByRole('alert');
  
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent(/username/i);
  expect(loginMock).not.toHaveBeenCalled();
});

test('clicking login button when only password input is invalid renders password alert and does not run login function', () => {
  const { usernameInput, loginButton, loginMock } = setup();

  userEvent.type(usernameInput, 'adam');
  userEvent.click(loginButton);
  const alert = screen.getByRole('alert');
  
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent(/password/i);
  expect(loginMock).not.toHaveBeenCalled();
});

test('alert text changes when validity of inputs changes and login button is clicked', () => {
  const { usernameInput, loginButton, loginMock } = setup();

  userEvent.type(usernameInput, 'adam');
  userEvent.click(loginButton);
  userEvent.clear(usernameInput);
  userEvent.click(loginButton);
  const alert = screen.getByRole('alert');
  
  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent(/username/i);
  expect(loginMock).not.toHaveBeenCalled();
});

test('alert is removed from document when both inputs are valid and the loginButton is clicked', () => {
  const { usernameInput, passwordInput, loginButton } = setup();

  userEvent.type(usernameInput, 'adam');
  userEvent.click(loginButton);
  userEvent.type(passwordInput, 'qwerty');
  userEvent.click(loginButton);
  const alert = screen.queryByRole('alert');
  
  expect(alert).not.toBeInTheDocument();
});