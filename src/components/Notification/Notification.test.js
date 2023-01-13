import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Notification from './Notification';

test('something', () => {
  jest.useFakeTimers();

  const { rerender } = render(
    <Notification 
      content={'hello'} 
      timeout={1500}
      dateNow={1}
    />
  );

  rerender(
    <Notification 
      content={'goodbye'} 
      timeout={1500}
      dateNow={2}
    />
  );
  
  screen.debug();
});