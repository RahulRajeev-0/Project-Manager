import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios or any other HTTP client you prefer

// Import toast for notifications
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate();
  const BaseURL = 'http://localhost:8000/';

  // State to manage form field values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State to manage form errors
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post(BaseURL+'account/login/', formData);
      console.log(response)
      // Handle successful login 
      if (response.status === 200) {
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (error && error.response.data) {
        error.response.data.message.forEach(error => {
          toast(error);
        });
      } else {
        // Handle login errors
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <section className="container">
      <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity">LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="opacity">SUBMIT</button>
          </form>
          {error && <p style={{color:'red'}} className="error-message">{error}</p>}
          <div className="register-forget opacity">
            <a onClick={() => navigate('/register')} style={{ cursor: 'pointer', color:'black'}}>REGISTER</a>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  );
};

export default LoginForm;
