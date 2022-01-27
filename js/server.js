if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const apiKey = process.env.OW_KEY;
const mapToken = process.env.MAP_TOKEN;

let allData = {};

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

//GET ROUTE
app.get('/journal', getJournal);
function getJournal(req, res){
    res.send(allData);
    console.log(allData);
}

//POST ROUTE
app.post('/journal', addJournal);
function addJournal(req, res){
    const newEntry = {
        date: req.body.date,
        location: req.body.location,
        temp: req.body.temp,
        weather: req.body.weather,
        journal: req.body.journal
     }
    allData.push(newEntry);
    res.send(allData);
    console.log(allData)
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