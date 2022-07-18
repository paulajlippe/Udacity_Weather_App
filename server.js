// "use strict";
// var fetch = require('node-fetch');
// const dotenv = require('dotenv').config();

// const apiKey = 'ff1af0ef32f3aced7acaff971e667d56';
// const mapToken = process.env.MAP_TOKEN;

// // Setup empty JS object to act as endpoint for all routes
// const postData = {};

// // Express to run server and routes
// const express = require('express');

// // Start up an instance of app
// const app = express();

// /* Dependencies */
// /* Middleware*/
// const bodyParser = require('body-parser');
// const cors = require('cors');

// //Configure express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// // Cors for cross origin allowance
// app.use(cors());

// // Initialize the main project folder
// app.use(express.static('website'));

// const port = process.env.PORT ||3000;
// app.listen(port, () => {
//     console.log(`Running in localhost:${port}`)
//   })

//   // Callback function to complete GET '/all'
// app.get('/all', (req, res) => {
//   console.log(`Returning postData ${postData}`);
//   res.send(postData);
// })
  
// app.post('/getWeather', async(req, res) => {
//   const {url} = req.body;
//   const response =  await fetch(`${url}${process.env.API_KEY}&units=metric`);
//   const data = await response.json();
//   res.send(data);
// })

// // Post Route
// const data = []
// app.post('/save', (req, res) => {
//   if (req.body) {
//     postData = req.body;
//   }
//   console.log(`Saving a new postData => ${postData}`)
//   res.send({status: 'ok'});
// })

// function postData (req, res){
//     data.push (req.body)
//   console.log(data)
// }


if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const apiKey = process.env.OW_KEY;
const mapToken = process.env.MAP_TOKEN;

let projectData = {};

const express = require('express');
const app = express();
const cors = require('cors');
const { request } = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
function listening(){
  console.log(`Server is running on localhost: ${port}`);
}

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