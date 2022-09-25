import React from 'react'
import axios from 'axios'
import './Login.css'

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("sessionToken") !== null)

  const email = React.createRef();
  const password = React.createRef();

  React.useEffect(() => {

  }, [])

  const addAuthenticationHeader = () => {
    const sessionToken = localStorage.getItem("session_token")
    if (sessionToken !== null) {
      axios.defaults.headers.common = {
        "session_token": sessionToken
      };
    }
  }
  addAuthenticationHeader()

  const handleLogout = () => {
    localStorage.removeItem("session_token")

    axios.defaults.headers.common = {};
    setIsLoggedIn(false)
  }

  const handleLogin = (user) => {
    localStorage.setItem("session_token", user["sessionToken"])
    addAuthenticationHeader()

    setIsLoggedIn(true)
  }

  const handleSubmit = event => {
    event.preventDefault();

    const login = async () => {
        try {
            const res = await axios.post(`http://localhost:3001/login`, {
                "email" : email.current.value,
                "password" : password.current.value
            })

            handleLogin(res.data.user)
            // navigate("../Home/1", { replace: true })
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
          <form>
            <h5>E-mail</h5>
            <input ref={email} type="text" className='email_input'/>
            <h5>Password</h5>
            <input ref={password} type="text" className='password_input'/>
            <div className="login__container__button">
              <a href='' className='forgot_password'> Forgot your Password?</a>
              <button onClick={() => {handleSubmit()}} type="submit" className="login__signInButton">
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
