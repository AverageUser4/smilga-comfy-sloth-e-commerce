import React from 'react';
import PropTypes from 'prop-types';
import css from './Counter.module.css';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';

function Counter({ count, setCount, step = 1, min = 1, max = 999 }) {
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
    <div className={css['container']}>

      <button className={css['button']} onClick={decrease}><Minus/></button>
      
      <span>{count}</span>

      <button className={css['button']} onClick={increase}><Plus/></button>
      
    </div>
  );
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Counter;