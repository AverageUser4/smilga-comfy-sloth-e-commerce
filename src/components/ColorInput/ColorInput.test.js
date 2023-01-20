import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorInput from './ColorInput';

function TestComponent() {
  const [color, setColor] = useState('');

  function handleChange(event) {
    setColor(event.target.value);
  }
  
  return (
    <div>
      <label>
        all
        <input type="radio" name="name" value="" checked={color === ''} onChange={handleChange}/>
      </label>
      <ColorInput name="name" value="#ff0000" currentValue={color} handleChange={handleChange}/>  
      <ColorInput name="name" value="#00ff00" currentValue={color} handleChange={handleChange}/>  
      <ColorInput name="name" value="#0000ff" currentValue={color} handleChange={handleChange}/>  
    </div>
  );
}

test('renders radio input with proper accessible name', () => {
  render(
    <ColorInput
      name="name"
      value="#000"
      currentValue="#000"
      handleChange={()=>0}
    />
  );
  const input = screen.getByRole('radio', { name: /black/i });

  expect(input).toBeInTheDocument();
  expect(input).toHaveAccessibleName(/black/i);
});

test('radio input is checked when value is equal to currentValue', () => {
  render(
    <ColorInput
      name="name"
      value="#000"
      currentValue="#000"
      handleChange={()=>0}
    />
  );
  const input = screen.getByRole('radio', { name: /black/i });

  expect(input).toBeChecked();
});

test('radio input is not checked when value is not equal to currentValue', () => {
  render(
    <ColorInput
      name="name"
      value="#000"
      currentValue="#fff"
      handleChange={()=>0}
    />
  );
  const input = screen.getByRole('radio', { name: /black/i });

  expect(input).not.toBeChecked();
});

test('works as expected when it is used by a component', () => {
  render(<TestComponent/>);

  const all = screen.getByRole('radio', { name: /all/i });
  const red = screen.getByRole('radio', { name: /red/i });
  const green = screen.getByRole('radio', { name: /green/i });
  const blue = screen.getByRole('radio', { name: /blue/i });

  expect(all).toBeChecked();

  userEvent.click(red);
  expect(red).toBeChecked();

  userEvent.click(blue);
  expect(blue).toBeChecked();

  userEvent.click(green);
  expect(green).toBeChecked();

  userEvent.click(all);
  expect(all).toBeChecked();
});