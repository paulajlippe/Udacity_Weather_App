// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

//* comments *//

// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes

// Start up an instance of app



//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance

// Initialize the main project folder

// Spin up the server
// Callback to debug
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Running in localhost:${port}`)
})

// Initialize all route with a callback function
app.post('/getWeather', async(req, res) => {
    const {url} = req.body;
    const response =  await fetch(`${url}${process.env.API_KEY}&units=metric`);
    const data = await response.json();
  
    res.send(data);
  })

// Callback function to complete GET '/all'

// Post Route
  

//GET route
app.get('/journal', getJournal);
function getJournal(req, res){
    let projectData = data;
    console.log(projectData);
    res.send(projectData);
}

//POST a journal
const data = [];
app.post('/journal', addJournal);
function addJournal(req, res){
    const newEntries = {
        date: req.body.date,
        location: req.body.location,
        temp: req.body.temp,
        weather: req.body.weather,
        content: req.body.content
     }
    data.push(newEntries);
    let projectData = data;
    res.send(projectData);
}

//Get route for API_KEYS
app.get('/api', getKey);
function getKey(req, res){
    let KEYS = {
        "apiKey": apiKey,
        "mapToken": mapToken
    }
    res.send(KEYS);
}