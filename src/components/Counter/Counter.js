import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './Counter.module.css';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';

function Counter({ count, setCount, step = 1, min = 1, max = 999, fontSize = "clamp(30px, 3vw, 42px)" }) {
  if(min > max)
    console.error(`Min value provided to counter (${min}) is greater than max value (${max}).`);

  const [pressedButton, setPressedButton] = useState('');
  const containerStyle = { fontSize };
  const buttonStyle = { width: fontSize, height: fontSize };

  useEffect(() => {
    function onMouseUp() {
      if(pressedButton)
        setPressedButton('');
    }

    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [pressedButton]);
  
  function decrease() {
    if(count === min)
      return;
    const diff = count - step;
    setCount(diff > min ? diff : min);
  }
  function increase() {
    if(count === max)
      return;
    const sum = count + step;
    setCount(sum < max ? sum : max);
  }

  if(pressedButton === 'minus')
    setTimeout(decrease, 100);
  else if(pressedButton === 'plus')
    setTimeout(increase, 100);

  return (
    <div style={containerStyle} className={css['container']}>
      <button 
        style={buttonStyle}
        onMouseDown={() => setPressedButton('minus')}
      >
        <Minus/>
      </button>

      <span>{count}</span>

      <button 
        style={buttonStyle}
        onMouseDown={() => setPressedButton('plus')}
      >
        <Plus/>
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
};

export default Counter;