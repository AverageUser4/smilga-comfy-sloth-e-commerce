import React from 'react';
import SingleFieldForm from './SingleFieldForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('basics', () => {

  test('renders expected output', () => {
    render(
      <SingleFieldForm
        inputType="text"
        placeholder="your name"
        label="name"
        initialValue="user"
        successMessage="that's your name!"
        buttonText="confirm"
      />
    );
  
    const input = screen.getByRole('textbox', { name: 'name' });
    const button = screen.getByRole('button', { name: 'confirm' });
    const alert = screen.queryByRole('alert');
  
    expect(input).toBeInTheDocument();
    expect(input).toHaveDisplayValue('user');
    expect(button).toBeInTheDocument();
    expect(alert).not.toBeInTheDocument();
  });
  
  test('user can type into the input and clear it', () => {
    render(<SingleFieldForm/>);
  
    const input = screen.getByRole('textbox');

    userEvent.type(input, 'abc');
    expect(input).toHaveDisplayValue('abc');

    userEvent.clear(input);
    expect(input).toHaveDisplayValue('');
  });

});

describe('form submission', () => {
  
  test('validator provided, invalid value, shows error message provided by validator and does not run onValidSubmit', () => {
    const validatorMock = jest.fn().mockImplementation((value) => ({
      isValid: value.length >= 5,
      message: 'too short'
    }));
    const onValidSubmitMock = jest.fn();
  
    render(
      <SingleFieldForm
        inputType="text"
        label="code"
        buttonText="check"
        validator={validatorMock}
        onValidSubmit={onValidSubmitMock}
      />
    );
  
    const input = screen.getByRole('textbox', { name: 'code' });
    const button = screen.getByRole('button', { name: 'check' });
  
    userEvent.type(input, 'abc');
    userEvent.click(button);
  
    const alert = screen.getByRole('alert');
  
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('too short');
    expect(validatorMock).toHaveBeenCalledWith('abc');
    expect(validatorMock).toHaveBeenCalledTimes(1);
    expect(onValidSubmitMock).not.toHaveBeenCalled();
  });

  test('validator provided, valid value, shows success message and runs onValidSubmit', () => {
    const validatorMock = jest.fn().mockImplementation((value) => ({
      isValid: value.length >= 5,
      message: 'too short'
    }));
    const onValidSubmitMock = jest.fn();

    render(
      <SingleFieldForm
        inputType="text"
        label="code"
        buttonText="check"
        validator={validatorMock}
        successMessage="congratulations"
        onValidSubmit={onValidSubmitMock}
      />
    );
  
    const input = screen.getByRole('textbox', { name: 'code' });
    const button = screen.getByRole('button', { name: 'check' });
  
    userEvent.type(input, 'abcde');
    userEvent.click(button);
  
    const alert = screen.getByRole('alert');
  
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('congratulations');
    expect(validatorMock).toHaveBeenCalledWith('abcde');
    expect(validatorMock).toHaveBeenCalledTimes(1);
    expect(onValidSubmitMock).toHaveBeenCalledTimes(1);
  });

  test('validator not provided, shows success message and runs onValidSubmit', () => {
    const onValidSubmitMock = jest.fn();

    render(
      <SingleFieldForm
        inputType="text"
        label="code"
        buttonText="check"
        successMessage="congratulations!"
        onValidSubmit={onValidSubmitMock}
      />
    );
  
    const button = screen.getByRole('button', { name: 'check' });
    userEvent.click(button);
  
    const alert = screen.getByRole('alert');
  
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('congratulations');
    expect(onValidSubmitMock).toHaveBeenCalledTimes(1);
  });

  test('does not render alert after submission when value is valid and success message is empty, but onValidSubmit still gets called', () => {
    const onValidSubmitMock = jest.fn();

    render(
      <SingleFieldForm
        inputType="text"
        label="code"
        buttonText="check"
        successMessage=""
        onValidSubmit={onValidSubmitMock}
      />
    );
  
    const button = screen.getByRole('button', { name: 'check' });
    userEvent.click(button);
  
    const alert = screen.queryByRole('alert');
  
    expect(alert).not.toBeInTheDocument();
    expect(onValidSubmitMock).toHaveBeenCalledTimes(1);
  });

  test('alert changes from error to success message and vice versa', () => {
    const validatorMock = jest.fn().mockImplementation((value) => ({
      isValid: value.length >= 5,
      message: 'too short'
    }));
  
    render(
      <SingleFieldForm
        inputType="text"
        label="code"
        buttonText="check"
        validator={validatorMock}
        successMessage="congratulations"
      />
    );
  
    const input = screen.getByRole('textbox', { name: 'code' });
    const button = screen.getByRole('button', { name: 'check' });
  
    userEvent.click(button);
    const alert = screen.getByRole('alert');

    expect(alert).toHaveTextContent('too short');

    userEvent.type(input, 'abcde');
    userEvent.click(button);
    expect(alert).toHaveTextContent('congratulations');

    userEvent.clear(input);
    userEvent.click(button);
    expect(alert).toHaveTextContent('too short');
  });
  
});