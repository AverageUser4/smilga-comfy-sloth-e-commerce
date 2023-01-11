import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './Counter.module.css';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';

function Counter({ count, setCount, step = 1, min = 1, max = 999, fontSize = "clamp(30px, 3vw, 42px)", label = 'Product count.' }) {
  if(min > max)
    console.error(`Min value provided to counter (${min}) is greater than max value (${max}).`);

  const [pressedButton, setPressedButton] = useState('');
  const [counterID] = useState(Math.random());
  const containerStyle = { fontSize };
  const buttonStyle = { width: fontSize, height: fontSize };
  const setPressedIDRef = useRef(null);

  useEffect(() => {
    function stopCountChange(event) {
      if(pressedButton && (!event.key || event.key === 'ArrowDown' || event.key === 'ArrowUp'))
        setPressedButton('');

      setPressedIDRef.current = null;
    }

    window.addEventListener('pointerup', stopCountChange);
    window.addEventListener('keyup', stopCountChange);

    return () => {
      window.removeEventListener('pointerup', stopCountChange);
      window.removeEventListener('keyup', stopCountChange);
    };
  });

  useEffect(() => {
    count > max && setCount(max);
    count < min && setCount(min);
  }, [count, min, max, setCount]);

  useEffect(() => {
    let timeoutID = null;
    
    if(pressedButton === 'minus')
      timeoutID = setTimeout(decrease, 100);
    else if(pressedButton === 'plus')
      timeoutID = setTimeout(increase, 100);

    return () => {
      clearTimeout(timeoutID);
    };
  });

  function decrease(amount) {
    if(count === min)
      return;

    const diff = count - (amount ? amount : step);
    setCount(diff > min ? diff : min);
  }

  function increase(amount) {
    if(count === max)
      return;
      
    const sum = count + (amount ? amount : step);
    setCount(sum < max ? sum : max);
  }

  function handleButton(event) {
    setPressedButtonAfterDelay(event.currentTarget.name);
    event.currentTarget.name === 'minus' ? decrease() : increase();
  }

  function setPressedButtonAfterDelay(value) {
    const id = Math.random();
    setPressedIDRef.current = id;

    setTimeout(() => {
      if(id === setPressedIDRef.current)
        setPressedButton(value);
    }, 400);
  }

  function handleKey(event) {
    switch(event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        event.preventDefault();
    }

    if(event.repeat)
      return;

    switch(event.key) {
      case 'ArrowDown':
        setPressedButtonAfterDelay('minus');
        decrease();
        break;

      case 'ArrowUp':
        setPressedButtonAfterDelay('plus');
        increase();
        break;

      case 'ArrowLeft':
        decrease();
        break;

      case 'ArrowRight':
        increase();
        break;

      case 'Home':
        decrease(Number.MAX_SAFE_INTEGER);
        break;

      case 'End':
        increase(Number.MAX_SAFE_INTEGER);
        break;

      case 'PageUp':
        decrease(5);
        break;

      case 'PageDown':
        increase(5);
        break;
    }
  }
  
  return (
    <div 
      style={containerStyle} 
      className={css['container']}
      onKeyDown={handleKey}
      role="spinbutton"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={count}
      aria-label={label}
      tabIndex={0}
      id={counterID}
    >
      <button
        style={buttonStyle}
        onPointerDown={handleButton}
        tabIndex={-1}
        name="minus"
        aria-label="Subtract."
        aria-controls={counterID}
      >
        <Minus aria-hidden="true"/>
      </button>

      <span>{count}</span>

      <button 
        style={buttonStyle}
        onPointerDown={handleButton}
        tabIndex={-1}
        name="plus"
        aria-label="Add."
        aria-controls={counterID}
      >
        <Plus aria-hidden="true"/>
      </button>
    </div>
  );
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  fontSize: PropTypes.string,
  label: PropTypes.string,
};

export default Counter;