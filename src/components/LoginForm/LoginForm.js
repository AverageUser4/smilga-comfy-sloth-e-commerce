import React, { useState } from 'react';
import { useAuthContext } from '../../utils/AuthContext';

function LoginForm() {
  const [errorID] = useState(Math.random());
  const [userData, setUserData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const [firstInvalidInput, setFirstInvalidInput] = useState('');
  const { login } = useAuthContext();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    setError('');
    setFirstInvalidInput('');
    event.preventDefault();

    try {
      if(userData.name.length < 3)
        throw { type: 'username', message: 'Username has to have at least 3 characters.' };
      if(userData.name.includes(' '))
        throw { type: 'username', message: 'Username cannot contain any "space" characters.' };
      if(userData.password.length < 3)
        throw { type: 'password', message: 'Password has to have at least 3 characters.' };

      login(userData.name);
    } catch(error) {
      setFirstInvalidInput(error.type);
      setError(error.message);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>

      <label className="standalone standalone--small standalone--block">
        <span>Username:</span>
        <input 
          className="input"
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          aria-errormessage={errorID}
          aria-invalid={firstInvalidInput === 'username'}
        />
      </label>

      <label className="standalone standalone--small standalone--block">
        <span>Password:</span>
        <input 
          className="input"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          aria-errormessage={errorID}
          aria-invalid={firstInvalidInput === 'password'}
        />
      </label>

      {error && <p id={errorID} role="alert" aria-atomic="true" className="paragraph paragraph--danger">{error}</p>}

      <button 
        className="button button--uppercase button--block button--100-width"
        aria-label={error ? `Cannot login: ${error}` : 'Login'}
      >
        Login
      </button>

    </form>
  );
}

export default LoginForm;