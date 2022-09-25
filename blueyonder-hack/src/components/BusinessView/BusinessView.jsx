import React from 'react'
import axios from 'axios'
import './BusinessView.css'
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
      <div className="businessView">
        <div className="administration__container">
            <h1 id='administration'>Administration of Your Centre</h1>

          
        </div>
        <div className="capacity_container">
            <h1 id='capacity'>Current Capacity of the Centre</h1>
        </div>
        <div className="virtualConcurrency_container">
            <h1 id='virtualConcurrency'>Virtual Concurrency in your ubication</h1>
        </div>
        <div className="recolection_container">
            <h1 id='recolection'>Your recolection</h1>
        </div>
      </div>

    </div>
    
  )
}