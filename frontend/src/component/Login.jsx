import React, { useState } from 'react';
import axios from 'axios';
import Liste from './Liste';

const initialForm = { email: '', password: '' };

function Login() {
  const [formData, setFormData] = useState(initialForm);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showList, setShowList] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData(initialForm);
    setLoginSuccess(false);
    setLoginError('');
    setShowList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://userlogin-api.onrender.com/api/user/login', formData);
      console.log('res', response.data);
      const userToken = response.data.token;
      localStorage.setItem('userToken', userToken);
      setLoginSuccess(true);
      setLoginError('');
      setIsLoggedIn(true);
      setShowList(true);
    } catch (error) {
      console.log(error);
      setLoginSuccess(false);
      setLoginError('Invalid email or password');
    }
    setFormData(initialForm);
  };

  return (
    <div className="login-container">
      <h2>{isLoggedIn ? 'UsersList' : 'Login'}</h2>
      {isLoggedIn ? (
        <div>
          <p>Login successful!</p>
          {showList && <Liste />}
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Send</button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      )}
    </div>
  );
}

export default Login;
