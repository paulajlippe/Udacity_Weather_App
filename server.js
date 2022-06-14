"use strict";
var fetch = require('node-fetch');
const dotenv = require('dotenv').config();

const apiKey = 'ff1af0ef32f3aced7acaff971e667d56';
const mapToken = process.env.MAP_TOKEN;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = process.env.PORT ||3000;
app.listen(port, () => {
    console.log(`Running in localhost:${port}`)
  })
  
  // 
  app.post('/getWeather', async(req, res) => {
    const {url} = req.body;
    const response =  await fetch(`${url}${process.env.API_KEY}&units=metric`);
    const data = await response.json();
  
    res.send(data);
  })
  
  // Callback function to complete GET '/all'
  app.get('/all', (req, res) => {
    console.log(`Returning postData ${postData}`);
    res.send(postData);
  })
  
  // Post Route
  app.post('/save', (req, res) => {
    if (req.body) {
      postData = req.body;
    }
    console.log(`Saving a new postData => ${postData}`)
    res.send({status: 'ok'});
  })