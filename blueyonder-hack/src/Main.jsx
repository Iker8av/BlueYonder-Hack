import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, Outlet } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn/SignIn";
import Login from "./components/LogIn/Login";
import Navbar from "./components/Navbar/Navbar";
import axios from 'axios'
import Navbar from "./components/Navbar/Navbar";
import BusinessView from "./components/BusinessView/BusinessView";
import MapContainer from "./components/Map/MapContainer";

export default function Main() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("sessionToken") !== null)
    const [data, setData] = React.useState([])
    const [type, setType] = React.useState("")

    const lastNewsRef = React.createRef(null)

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
        localStorage.setItem("username", user["username"])
        setType(user["type"])
        
        addAuthenticationHeader()

        setIsLoggedIn(true)
    }

  return (
    <BrowserRouter>
        <main>
        <section>
          <Navbar myRef={lastNewsRef}/>
        </section>
          <div className="routes_container">
            <Routes>
              <Route path="/" element={<App myRef={lastNewsRef}/>} />
              <Route path="/Map" element={<MapContainer/>} />
              <Route path="/SignUp" element={<SignIn handleLogin={handleLogin}/>}/>
              <Route path="/LogIn" element={<Login isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin}/>} />
              {type == "Company" && <Route path="/Business" element={<BusinessView/>} />}
            </Routes>
          </div>
        </main>
      </BrowserRouter>
  )
}
