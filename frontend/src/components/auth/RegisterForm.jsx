import React from 'react'
import './RegisterForm.css'

const RegisterForm = () => {
  return (
    <div className="center-container">
    <div className="card">
      <div className="card2">
        <form className="form">
          <p id="heading">Sign Up</p>

          {/* user name  */}
          <div className="field">
           
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              autoComplete="off"
            />
          </div>

          {/* email */}
          <div className="field">
           
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              autoComplete="off"
            />
          </div>

          {/* phone number  */}
          <div className="field">
           
            <input
              type="number"
              className="input-field"
              placeholder="Phone number"
              autoComplete="off"
            />
          </div>
          <div className="field">
           
            <input
              type="password"
              className="input-field"
              placeholder="Password"
            />
          </div>
          <div className="btn">
            {/* <button className="button1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button> */}
            <button className="button2">Sign Up</button>
          </div>
          <button onClick={()=>navigate('/')} className="button3">Login</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default RegisterForm
