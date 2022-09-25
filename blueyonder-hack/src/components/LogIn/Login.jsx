import React from 'react'
import './Login.css'

export default function Login() {
  return (
    <div>
      <div className="login">
        <div className="login__container">
            <h1 id='login'>Log In</h1>
          <form>
            <h5>E-mail</h5>
            <input type="text" className='email_input'/>
            <h5>Password</h5>
            <input type="text" className='password_input'/>
            <div className="login__container__button">
              <a href='' className='forgot_password'> Forgot your Password?</a>
              <button type="submit" className="login__signInButton">
                Submit
              </button>
            </div>
          </form>
          <p id='paragraph'>
            By signing-in you agree to the BlueYonder Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
        </div>
      </div>

    </div>
    
  )
}
