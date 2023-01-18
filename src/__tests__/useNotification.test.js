import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render, act } from '@testing-library/react';
import useNotification from '../hooks/useNotification';

jest.useFakeTimers();

function TestComponent() {
  const { notifyUser, NotificationElement } = useNotification();

  return (
    <div>
      {NotificationElement}

      <button onClick={() => notifyUser('Adam')}>sendAdam</button>
      <button onClick={() => notifyUser('Eva')}>sendEva</button>
      <button onClick={() => notifyUser('Quick', '', 100)}>sendQuick</button>

    </div>
  );
}

test('calling notifyUser spawns new notification', () => {
  render(<TestComponent/>);

  const sendAdam = screen.getByRole('button', { name: 'sendAdam'});
  userEvent.click(sendAdam);
  const notification = screen.getByRole('alert');

  expect(notification).toBeInTheDocument();
  expect(notification).toHaveTextContent('Adam');
});

test('calling notifyUser multiple times spawns multiple notifications', () => {
  render(<TestComponent/>);

  const sendAdam = screen.getByRole('button', { name: 'sendAdam' });
  const sendEva = screen.getByRole('button', { name: 'sendEva' });
  userEvent.click(sendAdam);
  jest.advanceTimersByTime(1);
  userEvent.click(sendAdam);
  jest.advanceTimersByTime(1);
  userEvent.click(sendEva);

  const notifications = screen.getAllByRole('alert');
  const adamNotifications = notifications.filter(n => n.textContent.includes('Adam'));
  const evaNotifications = notifications.filter(n => n.textContent.includes('Eva'));

  expect(adamNotifications).toHaveLength(2);
  expect(evaNotifications).toHaveLength(1);
});

test('timeout argument affects how quickly notifications disappear', () => {
  render(<TestComponent/>);

  const sendAdam = screen.getByRole('button', { name: 'sendAdam' });
  const sendQuick = screen.getByRole('button', { name: 'sendQuick' });

  userEvent.click(sendAdam);
  jest.advanceTimersByTime(1);
  userEvent.click(sendQuick);

  const notifications = screen.getAllByRole('alert');
  const adamNotification = notifications.find(notif => notif.textContent.includes('Adam'));
  const quickNotification = notifications.find(notif => notif.textContent.includes('Quick'));
  
  expect(notifications).toHaveLength(2);
  expect(adamNotification).toBeInTheDocument();
  expect(quickNotification).toBeInTheDocument();

  act(() => jest.advanceTimersByTime(700));
  expect(adamNotification).toBeInTheDocument();
  expect(quickNotification).not.toBeInTheDocument();

  act(() => jest.advanceTimersByTime(3000));
  expect(adamNotification).not.toBeInTheDocument();
  expect(quickNotification).not.toBeInTheDocument();
});
/* 
  - calling notifyUser spawns new notification
  - doing so multiple times spawns multiple notifications
  - tiemout argument of notifyUser affects timeout
*/