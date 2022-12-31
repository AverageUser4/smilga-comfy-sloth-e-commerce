import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './PayBox.module.css';

function PayBox({ onSubmit }) {
  const [cardNumber, setCardNumber] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }
  
  function handleChange(event) {
    const { value } = event.target;

    if(value && !Number.isInteger(Number(value)))
      return;

    setCardNumber(value);
  }
  
  return (
    <form 
      className={css['container']}
      onSubmit={handleSubmit}
    >

      <input
        className={`${css['input']} ${css['input--number']}`}
        placeholder="Card number" 
        aria-label="Card number"
        value={cardNumber}
        onChange={handleChange}
      />

      <button
        className={`${css['input']} ${css['input--submit']}`}
        disabled={!cardNumber || !Number.isInteger(Number(cardNumber))}
      >
        Pay
      </button>

    </form>
  );
}

PayBox.propTypes = {
  onSubmit: PropTypes.func
};

export default PayBox;