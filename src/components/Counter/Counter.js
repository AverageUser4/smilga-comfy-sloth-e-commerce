import React from 'react';
import PropTypes from 'prop-types';
import css from './Counter.module.css';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';

function Counter({ count, setCount, step = 1, min = 1, max = 999, fontSize = "clamp(30px, 3vw, 42px)" }) {
  if(min > max)
    console.error(`Min value provided to counter (${min}) is greater than max value (${max}).`);

  const containerStyle = { fontSize };
  const buttonStyle = { width: fontSize, height: fontSize };
  
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

  return (
    <div style={containerStyle} className={css['container']}>

      <button style={buttonStyle} onClick={decrease}><Minus/></button>
      
      <span>{count}</span>

      <button style={buttonStyle} onClick={increase}><Plus/></button>
      
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