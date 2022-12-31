import React, { useState } from 'react';
import css from './PayBox.module.css';

function PayBox() {
  const [cardNumber, setCardNumber] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
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

export default PayBox;