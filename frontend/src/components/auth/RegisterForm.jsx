import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios or any other HTTP client you prefer

// alert 
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const navigate = useNavigate();
  const BaseURL = 'http://localhost:8000/'
  // State to manage form field values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Simple client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      // toast('Passwords do not match')
      return;
    }

    try {
      // Replace with your API endpoint
      const response = await axios.post(BaseURL+'account/register/', formData);
      
      // Handle successful registration (e.g., redirect to login page)
      if (response.status === 201) {
        toast.success('Account created !')
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      if (error && error.response.data){
        error.response.data.message.forEach(error => {
          toast(error);
        });
      }else{

        // Handle registration errors
        setError('Registration failed. Please try again.');
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
          <h1 className="opacity">REGISTER</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              value={formData.username}
              onChange={handleChange}
              required
            />
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="opacity">SUBMIT</button>
          </form>
          {error && <p style={{color:'red'}} className="error-message">{error}</p>}
          <div className="register-forget opacity">
            <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>LOGIN</a>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  );
};

export default RegisterForm;
