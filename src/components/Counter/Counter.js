import React, { useEffect, useState } from 'react';
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
    function stopCountChange(event) {
      if(pressedButton && (!event.key || event.key === 'Enter'))
        setPressedButton('');
    }

    window.addEventListener('mouseup', stopCountChange);
    window.addEventListener('keyup', stopCountChange);

    return () => {
      window.removeEventListener('mouseup', stopCountChange);
      window.removeEventListener('keyup', stopCountChange);
    };
  }, [pressedButton]);

  useEffect(() => {
    count > max && setCount(max);
    count < min && setCount(min);
  }, [count, min, max, setCount]);

  useEffect(() => {
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
  
    let timeoutID = null;
    
    if(pressedButton === 'minus')
      timeoutID = setTimeout(decrease, 100);
    else if(pressedButton === 'plus')
      timeoutID = setTimeout(increase, 100);

    return () => {
      clearTimeout(timeoutID);
    };
  });

  return (
    <div style={containerStyle} className={css['container']}>
      <button 
        style={buttonStyle}
        onMouseDown={() => setPressedButton('minus')}
        onKeyDown={(e) => e.key === 'Enter' && setPressedButton('minus')}
      >
        <Minus/>
      </button>

      <span>{count}</span>

      <button 
        style={buttonStyle}
        onMouseDown={() => setPressedButton('plus')}
        onKeyDown={(e) => e.key === 'Enter' && setPressedButton('plus')}
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