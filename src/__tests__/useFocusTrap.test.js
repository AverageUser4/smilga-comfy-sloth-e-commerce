import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useFocusTrap from '../hooks/useFocusTrap';

function TestComponent({ close, shouldTrap = true }) {
  const firstRef = useRef();
  const lastRef = useRef();
  useFocusTrap(close, firstRef.current, lastRef.current, shouldTrap);
  
  return (
    <div>

      <button>before</button>

      <nav>
        <button ref={firstRef}>one</button>
        <button>two</button>
        <button ref={lastRef}>three</button>
      </nav>

      <button>after</button>

    </div>
  );
}

TestComponent.propTypes = {
  close: PropTypes.func,
  shouldTrap: PropTypes.bool,
};

test('close callback is called when "Escape" key is pressed', () => {
  const closeMock = jest.fn();
  render(
    <TestComponent
      close={closeMock}
      shouldTrap={true}
    />
  );

  expect(closeMock).not.toHaveBeenCalled();
  
  userEvent.keyboard('{Escape}');

  expect(closeMock).toHaveBeenCalledTimes(1);
});

/* 
  - tabbing not supported in jsdom, can't do these:
    - if shouldTrap is true user can only focus elements between first and last focusable
      - tab + shift from first focusable wraps to last focusable when shouldTrap is true
      - shift from last focusable wraps to first focusable when shouldTrap is true
    - when shouldTrap is false user can focus every focusable element
*/