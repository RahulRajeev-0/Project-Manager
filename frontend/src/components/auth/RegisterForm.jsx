import React from 'react'
import './RegisterForm.css'

import {useNavigate} from 'react-router-dom'

const RegisterForm = () => {
  const navigate = useNavigate()

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
          <form>
            <input type="text" placeholder="USERNAME" required />
            <input type="email" placeholder="EMAIL" required/>
            <input type="password" placeholder="PASSWORD" required/>
            <input type="password" placeholder="CONFIRM PASSWORD" required/>
            <button className="opacity">SUBMIT</button>
          </form>
          <div className="register-forget opacity">
            <a onClick={()=>navigate('/')}  style={{cursor:'pointer'}}>REGISTER</a>
           
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  );
}

export default RegisterForm
