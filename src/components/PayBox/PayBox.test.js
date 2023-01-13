import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PayBox from './PayBox';

test('renders inputs', () => {
  render(<PayBox onSubmit={jest.fn()}/>);
  const cardInput = screen.getByRole('textbox', { name: /card/i });
  const payButton = screen.getByRole('button', { name: /pay/i });

  expect(cardInput).toBeInTheDocument();
  expect(payButton).toBeInTheDocument();
});

test('user can type number into card input', () => {
  render(<PayBox onSubmit={jest.fn()}/>);
  const cardInput = screen.getByRole('textbox', { name: /card/i });

  userEvent.type(cardInput, '12345');
  
  expect(cardInput).toHaveDisplayValue('12345');
});

test('characters that are not numbers are ignored when typing to card input', () => {
  render(<PayBox onSubmit={jest.fn()}/>);
  const cardInput = screen.getByRole('textbox', { name: /card/i });

  userEvent.type(cardInput, '&12a3,4..5z');
  
  expect(cardInput).toHaveDisplayValue('12345');
});

test('user can clear card input after typing into it', () => {
  render(<PayBox onSubmit={jest.fn()}/>);
  const cardInput = screen.getByRole('textbox', { name: /card/i });

  userEvent.type(cardInput, '12345');
  userEvent.clear(cardInput);
  
  expect(cardInput).toHaveDisplayValue('');
}); 

test('pay button is disabled when value of card input is not valid', () => {
  render(<PayBox onSubmit={jest.fn()}/>);
  const payButton = screen.getByRole('button', { name: /pay/i });

  expect(payButton).toBeDisabled();
});

test('clicking pay button when card number is invalid does not cause onSubmit function to be invoked', () => {
  const onSubmitMock = jest.fn();
  render(<PayBox onSubmit={onSubmitMock}/>);
  const payButton = screen.getByRole('button', { name: /pay/i });

  userEvent.click(payButton);

  expect(onSubmitMock).not.toHaveBeenCalled();
});

test('clicking pay button when card number is valid causes onSubmit function to be invoked', () => {
  const onSubmitMock = jest.fn();
  render(<PayBox onSubmit={onSubmitMock}/>);
  const cardInput = screen.getByRole('textbox', { name: /card/i });
  const payButton = screen.getByRole('button', { name: /pay/i });

  userEvent.type(cardInput, '12345');
  userEvent.click(payButton);

  expect(onSubmitMock).toHaveBeenCalledTimes(1);
});