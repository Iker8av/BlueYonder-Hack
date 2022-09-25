const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const router = express.Router()
var axios = require('axios');
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY, API_BASE_URL} = require('./config')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

app.post('/login', async (req, res) => {
    try {
      const user = await Parse.User.logIn(req.body.email, req.body.password)
      res.send({"user" : user})
    } catch (error) {
      res.status(400)
      res.send({"error" : "Login failed: " + error })
    }
})

app.post('/register', async (req, res) => {
    let user = new Parse.User(req.body)

    try {
        await user.signUp()
        res.status(201)
        res.send({"user" : user})
    } catch (error) {
        res.status(400)
        res.send({"error" : "Failed to create user: " + error })
    }
})

app.get('/getCenters', async (req, res) => {
  try {
    const centersQuery = new Parse.Query("Center");
    const center = await centersQuery.findAll()

    res.send(center).status(200)
  } catch (error) {
    console.error(error)
    res.status(400)
    res.send({"error" : "Error getting user: " + error })
  }
})

app.post('/addCenter', async (req, res) => {
  try {
    let Center = Parse.Object.extend("Center")
    const newCenter = new Center();

    newCenter.save({
      ...req.body
    })
    res.status(201)
    res.send(newCenter)
  }
  catch (error) {
    res.status(400)
    res.send({"error" : "Failed to create userdata: " + error })
  }
})

const getLocations = async (data) => {
    const query = 'recycling'
    var config = {
      method: 'get',
      url: encodeURI(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.lat},${data.lng}&radius=15000&keyword=${query}&key=AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o`),
      headers : {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    };

    const results = axios(config)
    return results
}

const compareCenters = async (body) => {
  const allLocationsPromise = await getLocations(body)
  const allLocations = allLocationsPromise.data.results

  const allCentersPromise = await axios.get(`${API_BASE_URL}/getCenters`)
  const allCenters = allCentersPromise.data

  for (const loc of allLocations) { 
    if(allCenters.length > 0) {
      for (const cent of allCenters) { 
        if(cent.name === loc.name){
          return
        }

        const newCenter = {
          "name": loc.name,
          "lat": loc.geometry.location.lat,
          "lng": loc.geometry.location.lng,
          "address": loc.vicinity
        }
        
        await axios.post(`${API_BASE_URL}/addCenter`, newCenter)
      }
    }
    else {
      const newCenter = {
        "name": loc.name,
        "lat": loc.geometry.location.lat,
        "lng": loc.geometry.location.lng,
        "address": loc.vicinity
      }

      await axios.post(`${API_BASE_URL}/addCenter`, newCenter)
    }
  }

}

app.post('/getLocations', async (req, res) => {
  try {
      await compareCenters(req.body)
  
      const allCenters = await axios.get(`${API_BASE_URL}/getCenters`)
  
      res.send(allCenters.data).status(200)
    }
    catch (error) {
      res.status(400)
      res.send("Error")
    }
    
  })

app.get('/helloWorld', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})