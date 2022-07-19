/* Global Variables */
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const countryCode = document.getElementById('countryCode');
const zipCode = document.getElementById('zipCode');
const journal = document.getElementById('journal');
const entryHolder = document.getElementById('entryHolder');
const addEntry = document.getElementById('addEntry')

//Retrive Weather Data from Openweather API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const getWeatherData = async (zipCode, countryCode) => {
    let KEYS = await getApiKey();
    const apiKey = KEYS.apiKey;
    let country = 'US';
    const url = baseURL+zipCode+',' + (countryCode || 'US') +'&appid='+apiKey+'&units=metric';
    console.log(url);
    const res = await fetch(url)
    try {
        const data = await res.json();
        console.log(JSON.stringify(data));
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}

//Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

//Post data 
document.getElementById('addEntry').addEventListener('click', addJournal);
async function addJournal(e){
    if(zipCode.value != "" && journal.value != ""){
        let currentDate = new Date().toDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        console.log(document.getElementById('countryCode').value);
        let data = await getWeatherData(document.getElementById('zipCode').value, document.getElementById('countryCode').value);
        let tempValue = Math.round(data.main.temp);  
        let locationValue = data.name + ", " + data.sys.country;
        let weatherValue = data.weather[0].main + ", feels like " + Math.round(data.main.feels_like);
        let contentValue = document.getElementById('journal').value;
        postData('/journal', {
            date: currentDate,
            location: locationValue,
            temp: tempValue,
            weather: weatherValue,
            content: contentValue
        })
        .then(
            updateUI()
        )
    }else{
        if(zipCode.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter the correct zipcode!";
        }
        if(journal.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter your journal!";
        }
        if(zipCode.value == "" && feelings.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter zipcode and your journal!";
        }
        document.getElementById('entryHolder').style.color = "#ff9900";
        setTimeout(function() {
            location.reload(1);
        }, 5000);
    }
}

//Update UI
const updateUI = async () => {
    const request = await fetch('/journal');
    try{
        const allData = await request.json();
        const location = document.getElementById('location');
        const weather = document.getElementById('weather');
        date.innerHTML = allData[allData.length - 1].date;
        location.innerHTML = allData[allData.length - 1].location;
        temp.innerHTML = "<i class='fas fa-snowflake'></i>" + allData[allData.length - 1].temp + '&deg;F' + "<i class='fas fa-temperature-low'></i>";
        weather.innerHTML = "<i class='fas fa-cloud'></i>" + allData[allData.length - 1].weather + '&deg;F';
        content.innerHTML = "Dear Journal," + allData[allData.length - 1].content;
        entryHolder.classList.add("showCard");

        //Load map
        displayMap();
        }catch(error){
        console.log('error', error);
    }
}

//Display Map
async function displayMap(){
    let data = await getWeatherData(document.getElementById('zipCode').value);
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    let KEYS = await getApiKey();
    const mapToken = KEYS.mapToken;

    mapboxgl.accessToken = mapToken;
    var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [lon, lat], // starting position [lng, lat]
    zoom: 9 // starting zoom
    });

    // Set options
    var marker = new mapboxgl.Marker({
        color: "#16c79a",
        draggable: true
    }).setLngLat([lon, lat])
    .addTo(map);
}

//Get API Keys
async function getApiKey (){
    const request = await fetch('/api');
    try{
        const KEYS = await request.json();
        return KEYS;
    }catch(error){
        console.log('error', error);
    }
}