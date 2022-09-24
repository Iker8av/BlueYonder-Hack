const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const router = express.Router()
var axios = require('axios');
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('./config')

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


const getLocations = async (data) => {
    console.log('data: ', data);
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

app.post('/getLocations', async (req, res) => {
    const allLocations = await getLocations(req.body)
    res.send(allLocations.data.results).status(200)
  })

app.get('/helloWorld', (req, res) => {
    res.send('Hello World!')
  })
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})