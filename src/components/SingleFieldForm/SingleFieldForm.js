import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SingleFieldForm.module.css';

function SingleFieldForm({ 
  inputType = 'email',
  placeholder = 'user@example.com',
  label = 'Email',
  initialValue = '',
  validator,
  successMessage = "You've successfully submitted your email!",
  buttonText = 'Subscribe',
  browserValidation = false,
  onValidSubmit,
}) {
  const [hasBeenSubmitted, setHasBeenSubmited] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState()

  function onSubmit(event) {
    event.preventDefault();

    let isValid = true;
    let message = '';

    if(validator)
      ({ isValid, message } = validator(value));

    if(!isValid)
      setError(message);
    else {
      if(error)
        setError('');

      if(onValidSubmit)
        onValidSubmit();
    }

    if(!hasBeenSubmitted)
      setHasBeenSubmited(true);
  }
  
  return (
    <form onSubmit={onSubmit} noValidate={!browserValidation}>

      <div className="dual-input">
        <input
          type={inputType}
          className="input input--type-1"
          placeholder={placeholder}
          aria-label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="button button--type-1"
        >
          {buttonText}
        </button>
      </div>

      {(hasBeenSubmitted && (error || successMessage)) &&
          <p role="alert" className={`paragraph ${error ? css['error'] : ''}`}>{error ? error : successMessage}</p>}

    </form> 
  );
}

SingleFieldForm.propTypes = {
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validator: PropTypes.func,
  successMessage: PropTypes.string,
  buttonText: PropTypes.string,
  label: PropTypes.string,
  browserValidation: PropTypes.bool,
  onValidSubmit: PropTypes.func
};

export default SingleFieldForm;