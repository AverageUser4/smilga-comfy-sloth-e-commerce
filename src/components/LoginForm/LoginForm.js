import React, { useState } from 'react';
import { useAuthContext } from '../../utils/AuthContext';

function LoginForm() {
  const [userData, setUserData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuthContext();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    setError('');
    event.preventDefault();

    try {
      if(userData.name.length < 3)
        throw new Error('Username has to have at least 3 characters.');
      if(userData.name.includes(' '))
        throw new Error('Username cannot contain any "space" characters.');
      if(userData.password.length < 3)
        throw new Error('Password has to have at least 3 characters.');

      login(userData.name);
    } catch(error) {
      setError(error.message);
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>

      <label className="standalone standalone--small standalone--block">
        <span>Username:</span>
        <input 
          className="input"
          name="name"
          value={userData.name}
          onChange={handleChange}
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
        />
      </label>

      {error && <p role="alert" className="paragraph paragraph--danger">{error}</p>}

      <button className="button button--uppercase button--block button--100-width">
        Login
      </button>

    </form>
  );
}

export default LoginForm;