import React from 'react'
import axios from 'axios'
import './BusinessView.css'
import { useNavigate } from "react-router-dom";

export default function BusinessView({isLoggedIn, handleLogin}) {
  const navigate = useNavigate()

  const email = React.createRef();
  const password = React.createRef();

  const [name, setName] = React.useState("")
  const [clicks, setClicks] = React.useState(0)
  const [types, setTypes] = React.useState([])
  const [capacity, setCapacity] = React.useState(0)
  const typeData = ["Organics", "Plastics", "Metals", "Alumium", "Batteries", "Cardboard", "Paper", "Clothes"]
  const [edit, setEdit] =  React.useState(false)

  const manageButton = async () => {
    await axios.post('http://localhost:3001/addCapacity', {name: name, capacity: capacity})
    setEdit(false)
  }

  React.useEffect(() => {
    ( async () => {
      axios.get('http://localhost:3001/getCenters')
      .then(response => {
        response.data.forEach((center) => {
          if(center.name === localStorage.getItem("username")){
            setClicks(center.clicks)
            setTypes([...center.type])
            setCapacity(center.capacity)
            setName(center.name)
          }
        })
      })
    })()
  }, [])

  return (
    <div>
      <div className="businessView">
        <div className="administration__container">
            <h2 id='administration'>Administration of Your Centre</h2>
        </div>
        <div className="especifications">
            <div className="capacity_container">
                <h1 id='capacity'>Current Capacity of the Centre</h1>
               {!edit ? <p style={{"fontSize":"36px", "fontWeight":"bold"}}>{capacity}</p> : <input type="number" onChange={(e) => setCapacity(e.target.value)} style={{"width":"150px","height":"50px"}}/>}
                {edit ? <button onClick={() => manageButton()}>Apply</button> : <button onClick={() => setEdit(true)}>Edit</button>}
            </div>
            <div className="virtualConcurrency_container">
                <h1 id='virtualConcurrency'>Virtual Concurrency in your ubication</h1>
                <p style={{"fontSize":"36px", "fontWeight":"bold"}}>{clicks}</p>
            </div>
        </div>
        <div className="recolection_container" >
            <h1 id='recolection'>Your recolection</h1>
            <div style={{"display":"flex", "flexDirection":"column", "alignItems":"start", "marginLeft": "20px"}}>
              <h4 style={{"marginLeft": "25px"}}>Selected: </h4>
              <div style={{"display":"flex", "flexDirection":"row", "marginLeft": "20px"}}>
                {types.map((type) => {return( <div className='typeList' style={{"width":"fit-content"}}>{type}</div>)})}
              </div>
              <h4 style={{"marginLeft": "25px"}}>Total list: </h4>
              <div style={{"display":"flex", "flexDirection":"row", "marginLeft": "20px"}}>
                {typeData.map((type) => {if(!types.includes(type.toLowerCase())){ {return( <div className='typeList' style={{"width":"fit-content"}}>{type}</div>)} }})}
              </div>
            </div>
        </div>
      </div>

    </div>
    
  )
}