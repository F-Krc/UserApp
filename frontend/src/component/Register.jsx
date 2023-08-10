import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const initialForm = { name: '', customerId: '', email: '', password: '' };
function Register() {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('form', formData);
      const response = await axios.post('http://localhost:4000/api/user/register', formData);
      console.log('res', response.data);
    } catch (error) {
      console.log(error);
    }
    setFormData(initialForm);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        <br />
        <label htmlFor="customerId">Customer ID:</label>
        <input
          type="text"
          id="customerId"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          required
        />
        <br />
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
      </form>
      <div className='register-ask-container'>
       <span>Du hast schon einen Account?</span>
      <Link to="/login">Login</Link> 
      </div>
      
    </div>
  );
}

export default Register;
