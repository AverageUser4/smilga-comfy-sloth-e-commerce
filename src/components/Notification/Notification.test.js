import React from 'react';
import { render, screen, waitForElementToBeRemoved, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Notification from './Notification';

jest.useFakeTimers();

test('renders element with provided message', async () => {
  render(
    <Notification 
      content={'hello'} 
      dateNow={1}
    />
  );
  const alert = screen.getByRole('alert');

  expect(alert).toBeInTheDocument();
  expect(alert).toHaveTextContent('hello');
});

test('removes element after timeout (and transition duration)', async () => {
  render(
    <Notification
      content={'hello'}
      dateNow={1}
      timeout={300}
    />
  );
  const alert = screen.getByRole('alert');

  await waitForElementToBeRemoved(alert);

  expect(alert).not.toBeInTheDocument();
});

test("removes element after it's close button gets clicked", async () => {
  render(
    <Notification
      content={'hello'}
      dateNow={1}
      timeout={5000}
    />
  );
  const alert = screen.getByRole('alert');
  const closeButton = getByRole(alert, 'button', { name: /hide/i });

  userEvent.click(closeButton);
  
  await waitForElementToBeRemoved(alert);

  expect(alert).not.toBeInTheDocument();
});

test("renders multiple elements with the same message", () => {
  const { rerender } = render(
    <Notification
      content="hello"
      dateNow={1}
    />
  );

  rerender(
    <Notification
      content="hello"
      dateNow={2}
    />
  );

  const alerts = screen.getAllByText('hello');

  expect(alerts).toHaveLength(2);
});

test("renders multiple elements with different messages", () => {
  const { rerender } = render(
    <Notification
      content="hello"
      dateNow={1}
    />
  );

  rerender(
    <Notification
      content="goodbye"
      dateNow={2}
    />
  );

  const firstAlert = screen.getByText('hello');
  const secondAlert = screen.getByText('goodbye');

  expect(firstAlert).toBeInTheDocument();
  expect(firstAlert).toHaveTextContent('hello');
  expect(secondAlert).toBeInTheDocument();
  expect(secondAlert).toHaveTextContent('goodbye');
});

test("removes correct element when there are multiple elements", async () => {
  const { rerender } = render(
    <Notification
      content="hello"
      dateNow={1}
    />
  );

  rerender(
    <Notification
      content="goodbye"
      dateNow={2}
    />
  );

  const firstAlert = screen.getByText('hello');
  const secondAlert = screen.getByText('goodbye');
  const closeFirstButton = getByRole(firstAlert, 'button', { name: /hide/i });

  userEvent.click(closeFirstButton);
  await waitForElementToBeRemoved(firstAlert);

  expect(firstAlert).not.toBeInTheDocument();
  expect(secondAlert).toBeInTheDocument();
});

test("hides all notifications after hide all button is clicked", async () => {
  const { rerender } = render(
    <Notification
      content="hello"
      dateNow={1}
    />
  );

  rerender(
    <Notification
      content="goodbye"
      dateNow={2}
    />
  );

  const firstAlert = screen.getByText('hello');
  const secondAlert = screen.getByText('goodbye');
  const closeAllButton = screen.getByRole('button', { name: /hide all/i });

  userEvent.click(closeAllButton);

  expect(firstAlert).not.toBeInTheDocument();
  expect(secondAlert).not.toBeInTheDocument();
});