import React from 'react';
import { render, screen } from '@testing-library/react';
import Dialog from './Dialog';
import userEvent from '@testing-library/user-event';

test('calls console.error with useful message when both onConfirm and onReject are not provided', () => {
  jest.spyOn(console, 'error').mockImplementation(()=>0);
  render(<Dialog isShown={true}/>);

  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(expect.stringMatching(/onConfirm|onReject/i));

  console.error.mockRestore();
});

test('does not render dialog element when isShown = false', () => {
  render(<Dialog isShown={false} onConfirm={()=>0}/>);
  const dialog = screen.queryByRole('dialog');

  expect(dialog).not.toBeInTheDocument();
});

test('when isShown = true and both callbacks are provided, provided heading, message, confirmText and rejextText are rendered inside element with dialog role', () => {
  render(<Dialog isShown={true} onConfirm={()=>0} onReject={()=>0} 
    heading="hello" message="how are you" confirmText="fine" rejectText="bad"/>);

  const dialog = screen.getByRole('dialog');
  const heading = screen.getByRole('heading', { name: 'hello' });
  const message = screen.getByText('how are you');
  const confirm = screen.getByRole('button', { name: 'fine' });
  const reject = screen.getByRole('button', { name: 'bad' });

  expect(dialog).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
  expect(message).toBeInTheDocument();
  expect(confirm).toBeInTheDocument();
  expect(reject).toBeInTheDocument();
});

test('when onConfirm is not provided, the confirm button does not get rendered', () => {
  render(<Dialog isShown={true} onReject={()=>0} 
    heading="hello" message="how are you" confirmText="fine" rejectText="bad"/>);

  const confirm = screen.queryByRole('button', { name: 'fine' });

  expect(confirm).not.toBeInTheDocument();
});

test('when onReject is not provided, the reject button does not get rendered', () => {
  render(<Dialog isShown={true} onConfirm={()=>0} 
    heading="hello" message="how are you" confirmText="fine" rejectText="bad"/>);

  const reject = screen.queryByRole('button', { name: 'bad' });

  expect(reject).not.toBeInTheDocument();
});

test('clicking confirm/reject button invokes associated callback', () => {
  const confirmMock = jest.fn();
  const rejectMock = jest.fn();
  render(<Dialog isShown={true} onConfirm={confirmMock} onReject={rejectMock}
    heading="hello" message="how are you" confirmText="fine" rejectText="bad"/>);

  const confirm = screen.queryByRole('button', { name: 'fine' });
  const reject = screen.queryByRole('button', { name: 'bad' });

  userEvent.click(confirm);
  expect(confirmMock).toHaveBeenCalledTimes(1);

  userEvent.click(reject);
  expect(rejectMock).toHaveBeenCalledTimes(1);
});