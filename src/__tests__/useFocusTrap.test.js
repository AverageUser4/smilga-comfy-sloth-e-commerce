import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useFocusTrap from '../hooks/useFocusTrap';
import { sleep } from '../test-helpers/utils';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

function TestComponent({ close, autoFocus = false, autoFocusDelay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const firstRef = useRef();
  const lastRef = useRef();
  useFocusTrap(
    close, isVisible, firstRef.current, lastRef.current,
    autoFocus && firstRef.current, autoFocusDelay,
  );
  
  return (
    <div>

      <button onClick={() => setIsVisible(true)}>open</button>

      <nav>
        <button ref={firstRef}>close</button>
        <button>inside 1</button>
        <button ref={lastRef}>inside 2</button>
      </nav>

      <button>outside</button>

    </div>
  );
}

TestComponent.propTypes = {
  close: PropTypes.func,
  shouldTrap: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoFocusDelay: PropTypes.number,
};

test('close callback is called when "Escape" key is pressed', () => {
  const closeMock = jest.fn();
  render(
    <TestComponent
      close={closeMock}
      shouldTrap={true}
    />
  );

  userEvent.click(screen.getByRole('button', { name: /open/i }));
  
  expect(closeMock).not.toHaveBeenCalled();
  
  userEvent.keyboard('{Escape}');

  expect(closeMock).toHaveBeenCalledTimes(1);
});

test('if autoFocus = true and autoFocusDelay = 0, the first element gets immediately focused', () => {
  render(
    <TestComponent
      close={()=>0}
      shouldTrap={true}
      autoFocus={true}
    />
  );
  const first = screen.getByRole('button', { name: /close/i });

  userEvent.click(screen.getByRole('button', { name: /open/i }));

  expect(first).toHaveFocus();
});

test('if autoFocus = true and autoFocusDelay > 0, the first element gets focused after delay', async () => {
  render(
    <TestComponent
      close={()=>0}
      shouldTrap={true}
      autoFocus={true}
      autoFocusDelay={20}
    />
  );
  const first = screen.getByRole('button', { name: /close/i });

  userEvent.click(screen.getByRole('button', { name: /open/i }));
  expect(first).not.toHaveFocus();

  Promise.resolve().then(() => jest.advanceTimersByTime(19));
  await act(() => sleep());
  expect(first).not.toHaveFocus();

  Promise.resolve().then(() => jest.advanceTimersByTime(1));
  await act(() => sleep());
  expect(first).toHaveFocus();
});

/* 
  - tabbing not supported in jsdom, can't do these:
    - if shouldTrap is true user can only focus elements between first and last focusable
      - tab + shift from first focusable wraps to last focusable when shouldTrap is true
      - shift from last focusable wraps to first focusable when shouldTrap is true
    - when shouldTrap is false user can focus every focusable element
*/