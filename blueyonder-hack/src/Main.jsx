import * as React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, Outlet } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn/SignIn";
import Login from "./components/LogIn/Login";
import axios from 'axios'
import BusinessView from "./components/BusinessView/BusinessView";

export default function Main() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("sessionToken") !== null)
    const [data, setData] = React.useState([])

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

  return (
    <BrowserRouter>
        <main>
          <div className="routes_container">
            <Routes>
              <Route path="/" element={<App/>} />
              <Route path="/SignUp" element={<SignIn handleLogin={handleLogin}/>}/>
              <Route path="/LogIn" element={<Login isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
  )
}
