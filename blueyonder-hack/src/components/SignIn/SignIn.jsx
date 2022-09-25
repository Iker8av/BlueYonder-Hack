import React from 'react'
import axios from 'axios'
import './SignIn.css'

export default function SignIn() {

  const [user, setUser] = React.useState(0)

  return (

    <div className="signIn_user">
        <div className="signIn__container">
            <h1 id='signIn'>Sign In</h1>
            <div className="custom-select" style={{"width":"200px;"}}>
              <select onChange={(e) => (e) => setUser(e.option)}>
                <option onClick={(e) => setUser(e.target.value)} value="0">Select:</option>
                <option onClick={(e) => setUser(e.target.value)} value="1">User</option>
                <option onClick={(e) => setUser(e.target.value)} value="2">Company</option>
              </select>
            </div>
          <form>
            {
              
              
            }
            
          </form>
          <p id='paragraph'>
            By signing-in you agree to the BlueYonder Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
        {/* </div> */}
        </div> 

    </div>
    
  )
}

export function Business(){
  return (
    <div><h5>Company name (Only if aplicable) </h5>
              <input type="text" className='companyName_input'/>
              <h5>Phone number</h5>
              <input type="text" className='phoneNumber_input'/>
              <h5>Location</h5>
              <input type="text" className='location_input'/>
              <h5>E-mail</h5>
              <input type="text" className='email_input'/>
              <h5>Password</h5>
              <input type="text" className='password_input'/>
              <h5>Password Confirmation</h5>
              <input type="text" className='passwordConfirmation_input'/>
              <div className="signIn__container__button">
                <a href='' className='forgot_password'> Forgot your Password?</a>
                <button onClick={() => {}} type="submit" className="signIn__signInButton">
                  Submit
                </button>
              </div></div>
  )
}


// export default function SignIn() {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("sessionToken") !== null)

//   const email = React.createRef();
//   const password = React.createRef();

//   React.useEffect(() => {

//   }, [])

//   const addAuthenticationHeader = () => {
//     const sessionToken = localStorage.getItem("session_token")
//     if (sessionToken !== null) {
//       axios.defaults.headers.common = {
//         "session_token": sessionToken
//       };
//     }
//   }
//   addAuthenticationHeader()

//   const handleLogout = () => {
//     localStorage.removeItem("session_token")

//     axios.defaults.headers.common = {};
//     setIsLoggedIn(false)
//   }

//   const handleLogin = (user) => {
//     localStorage.setItem("session_token", user["sessionToken"])
//     addAuthenticationHeader()

//     setIsLoggedIn(true)
//   }

//   const handleSubmit = event => {
//     event.preventDefault();

//     const login = async () => {
//         try {
//             const res = await axios.post(`http://localhost:3001/login`, {
//                 "email" : email.current.value,
//                 "password" : password.current.value
//             })

//             handleLogin(res.data.user)
//             // navigate("../Home/1", { replace: true })
//         } catch (err) {
//             alert(err)
//         }
//     }
//     login()
// }

// return(
//     <div class="content">
//       <a class="selection" href="#user_form">
//         <span class="tittle">Descripción</span>
//       </a>  
//       <a class="selection" href="#company_form">
//         <span class="toc-title">Descripción</span>
//       </a>
//       <><section id="user_form">
//         <div>
//           <h5>First name</h5>
//           <input type="text" className='firstName_input' />
//           <h5>Last name</h5>
//           <input type="text" className='lastName_input' />
//           <h5>E-mail</h5>
//           <input type="text" className='email_input' />
//           <h5>Password</h5>
//           <input type="text" className='password_input' />
//           <h5>Password Confirmation</h5>
//           <input type="text" className='passwordConfirmation_input' />
//           <div className="signIn__container__button">
//             <a href='' className='forgot_password'> Forgot your Password?</a>
//             <button onClick={() => { } } type="submit" className="signIn__signInButton">
//               Submit
//             </button>
//           </div>
//         </div>
//       </section>
//         <section id="company_form">
//           <div>
//             <h5>First name</h5>
//             <input type="text" className='firstName_input' />
//             <h5>Last name</h5>
//             <input type="text" className='lastName_input' />
//             <h5>E-mail</h5>
//             <input type="text" className='email_input' />
//             <h5>Password</h5>
//             <input type="text" className='password_input' />
//             <h5>Password Confirmation</h5>
//             <input type="text" className='passwordConfirmation_input' />
//             <div className="signIn__container__button">
//               <a href='' className='forgot_password'> Forgot your Password?</a>
//               <button onClick={() => { } } type="submit" className="signIn__signInButton">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </section></>
//     </div>
//   )
// }