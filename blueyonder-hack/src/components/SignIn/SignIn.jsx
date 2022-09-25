import React from 'react'
import axios from 'axios'
import './SignIn.css'
import Dropdown from '../Dropdown/Dropwdown'
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";

export default function SignIn({handleLogin}) {
  const navigate = useNavigate()

  const [user, setUser] = React.useState(0)
  const typeUsers = ["User", "Company"]
  const [typeUser, setTypeUser] = React.useState(typeUsers[0])

  const [fullname, updatefullName] = React.useState("")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [email, updateEmail] = React.useState("");

  const typeData = ["Organics", "Plastics", "Metals", "Alumium", "Batteries", "Cardboard", "Paper", "Clothes"]
  const [wasteSelected, setWasteSelected] = React.useState([])

  const [password, updatePassword] = React.useState("");

  const handleClickOnWaste = (name) => {
    if (wasteSelected.length > 0){
        if (wasteSelected.includes(name.toLowerCase())){
            var index = wasteSelected.indexOf(name.toLowerCase());
            const newList = wasteSelected
            newList.splice(index, 1);
            setWasteSelected([...newList])
        }
        else {
            wasteSelected.push(name.toLowerCase())
            setWasteSelected([...wasteSelected])
        }
    }
    else {
        setWasteSelected([name.toLowerCase()])
    }
}

  const handleSubmit = React.useCallback( async (event) => {
    event.preventDefault();
    Geocode.setApiKey("AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o")

    Geocode.fromAddress(`${location}`).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      postData({ lat, lng })
    })
      
  }, [typeUser, fullname, email, password, phoneNumber, location])

  const postData = async (coords) => {
    try {
      const res = await axios.post("http://localhost:3001/register", {
              "type": typeUser,
              "username" : fullname,
              "email" : email,
              "password" : password,
              "phoneNumber" : phoneNumber,
              "location" : location,
              "coords": coords,
              "typeWaste": wasteSelected
          })

          if (typeUser == "Company"){
              const newCenter = {
                "name": fullname,
                "lat": coords.lat,
                "lng": coords.lng,
                "placeid": "",
                "address": location,
                "photos": [],
                "type": wasteSelected
              }
              await axios.post(`http://localhost:3001/addCenter`, newCenter)
          }

          handleLogin(res.data.user)
          navigate("../", { replace: true })
      } catch (err) {
        alert(err)
      }
  }

  return (

    <div className="signIn_user">
        <div className="signIn__container">
            <h1 id='signIn'>Sign In</h1>
            <div className="custom-select" style={{"width":"120;"}}>
              <Dropdown data={typeUsers} updateData={setTypeUser}></Dropdown>
            </div>
          <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <h5>{typeUser == "Company" ? "Company name" : "Username"} </h5>
            <input value={fullname} onChange={(e) => updatefullName(e.target.value)} type="text" className='companyName_input'/>
            <h5>Phone number</h5>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" className='phoneNumber_input'/>
            <h5>Location</h5>
            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className='location_input'/>
            {(typeUser == "Company") && 
              <h5>Waste Type</h5>
            }
            {(typeUser == "Company") && 
              <div className="horizontal-scroll">
                {typeData.length > 0 ? typeData.map((waste) => {
                    return ( <div onClick={() => handleClickOnWaste(waste)} key={waste} className={wasteSelected.includes(waste.toLowerCase()) ? "waste-option active" : "waste-option"} style={{cursor:"pointer"}}>
                        <span>{waste}</span>
                    </div>)
                }) : <h3>No typeData</h3>}
            </div>
            }
            <h5>E-mail</h5>
            <input value={email} onChange={(e) => updateEmail(e.target.value)} type="text" className='email_input'/>
            <h5>Password</h5>
            <input value={password} onChange={(e) => updatePassword(e.target.value)} type="password" className='password_input'/>
            <h5>Password Confirmation</h5>
            <input type="password" className='passwordConfirmation_input'/>
            <div className="signIn__container__button">
              <button onClick={() => {}} type="submit" className="signIn__signInButton">
                Submit
              </button>
            </div>
          </div>
          </form>
          <p id='paragraph'>
            By signing-in you agree to the BlueYonder Conditions of Use & Sale.
            Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
        </div> 

    </div>
    
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