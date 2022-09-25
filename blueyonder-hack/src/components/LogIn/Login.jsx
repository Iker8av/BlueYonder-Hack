import React from 'react'
import axios from 'axios'
import './Login.css'
import { useNavigate } from "react-router-dom";

export default function Login({isLoggedIn, handleLogin}) {
  const navigate = useNavigate()

  const email = React.createRef();
  const password = React.createRef();

  const handleSubmit = event => {
    event.preventDefault();

    const login = async () => {
        try {
            const res = await axios.post(`http://localhost:3001/login`, {
                "email" : email.current.value,
                "password" : password.current.value
            })

            // localStorage.setItem("userName", user["sessionToken"])
            console.log(res.data)
            handleLogin(res.data.user)
            navigate("../", { replace: true })
        } catch (err) {
            alert(err)
        }
    }
    login()
}

  return (
    <div>
      <div className="login">
        <div className="login__container">
            <h1 id='login'>Log In</h1>
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <h5>E-mail</h5>
            <input ref={email} type="text" className='email_input'/>
            <h5>Password</h5>
            <input ref={password} type="text" className='password_input'/>
            <div className="login__container__button">
              <a href='' className='forgot_password'> Forgot your Password?</a>
              <button type="submit" className="login__signInButton">
                Submit
              </button>
            </div>
          </form>
          <p id='paragraph'>
            By logIng-in you agree to the BlueYonder Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
        </div>
      </div>

    </div>
    
  )
}
