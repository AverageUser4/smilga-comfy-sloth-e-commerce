import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import useNotification from '../hooks/useNotification';

jest.useFakeTimers();

function TestComponent() {
  const { notifyUser, NotificationElement } = useNotification();

  return (
    <div>
      <NotificationElement/>

      <button onClick={() => notifyUser('Adam')}>sendAdam</button>
      <button onClick={() => notifyUser('Eva')}>sendEva</button>
      <button onClick={() => notifyUser('Quick', '', 100)}>sendQuick</button>

    </div>
  );
}

test('calling notifyUser spawns new notification', () => {
  render(<TestComponent/>);

  const sendAdam = screen.getByRole('button', { name: 'sendAdam '});
  userEvent.click(sendAdam);
  const notification = screen.getByRole('alert', { name: 'Adam' });

  expect(notification).toBeInTheDocument();
});

test('calling notifyUser multiple times spawns multiple notifications', () => {
  render(<TestComponent/>);

  const sendAdam = screen.getByRole('button', { name: 'sendAdam '});
  const sendEva = screen.getByRole('button', { name: 'sendEva '});
  userEvent.click(sendAdam);
  userEvent.click(sendAdam);
  userEvent.click(sendEva);

  const notifications = screen.getAllByRole('alert');
  const adamNotifications = notifications.map(n => n.textContent === 'Adam');
  const evaNotifications = notifications.map(n => n.textContent === 'Eva');

  expect(adamNotifications).toHaveLengt(2);
  expect(evaNotifications).toHaveLengt(1);
});

test('timeout argument affects how quickly notifications disappear', () => {
  render(<TestComponent/>);

  const sendAdam = screen.getByRole('button', { name: 'sendAdam '});
  const sendQuick = screen.getByRole('button', { name: 'sendQuick '});

  userEvent.click(sendAdam);
  userEvent.click(sendQuick);

  const adamNotification = screen.getByRole('alert', { name: 'Adam' });
  const quickNotification = screen.getByRole('alert', { name: 'Quick' });

  expect(adamNotification).toBeInTheDocument();
  expect(quickNotification).toBeInTheDocument();

  jest.advanceTimersByTime(500);

  expect(adamNotification).toBeInTheDocument();
  expect(quickNotification).not.toBeInTheDocument();

  jest.advanceTimersByTime(3000);

  expect(adamNotification).not.toBeInTheDocument();
  expect(quickNotification).not.toBeInTheDocument();
});
/* 
  - calling notifyUser spawns new notification
  - doing so multiple times spawns multiple notifications
  - tiemout argument of notifyUser affects timeout
*/