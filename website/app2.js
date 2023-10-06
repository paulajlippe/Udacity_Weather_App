/* Global Variables */
const date = document.getElementById('date');
const zipCode = document.getElementById('zipCode');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const journal = document.getElementById('journal');
const content = document.getElementById('content');
const entryHolder = document.getElementById('entryHolder');
const addEntry = document.getElementById('addEntry')

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API

let apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey2 = ',us&appid=ff1af0ef32f3aced7acaff971e667d56&units=metric';


// Add Event Listener, when button is clicked, the API Call sequence is kicked off//

document.getElementById('addEntry').addEventListener('click', addEntry);

/* Function called by event listener */

function addJournal(e) {
    //Get the value the user has entered in the Zip Code text box//
    let zipCode = document.getElementById('zipCode').value;
    //Get the value the user entered in the feelings textbox//
    let userresponse = document.getElementById('journal').value;
    //Make the Get Request API Call, using API variables declared above//
    getWeatherData(apiURL, zipCode, apiKey2)
    //CHAINED PROMISE FOR POST REQUEST
    //Once the data has been returned by the GET request, add it to the POST request below
    .then(function(data) {
        console.log(data);
    //Post Request is sent to the Post Route we've set up in server.js//
    //In the data object, the userresponse and date come from the text user entered, stored in variables set up earlier//
    //The temperature data comes from Open Weather API, constructed according to their documenation//
        postData('/addPost', {userresponse: userresponse, temperature: data.main.temp, newDate : newDate})
    })

    //CHAINED PROMISE TO UPDATE UI//
    //Once Post Data function has completed, call Update UI function
    .then(() =>
        updateUI()
    )
    }

/* Function to GET Web API Data*/

const getWeatherData = async (apiURL, newZipCode, apiKey2) => {
    //await means we don't move onto next line until we have the dynamic URL - stored in variable res'
    const res = await fetch(apiURL+newZipCode+apiKey2);


    //Once the data is returned execute the try code block//
    //If there is a network error, then catch the error//

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
//URL is the /postData route in server.js, data object will contain the parameters we got back from the GET Request API call to OpenWeather//
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    });

    //Perform try block of code upon successful post request
    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch (error) {
        console.log("error", error);
    }
}


/* Function to GET Project Data */

/* Function to Update UI */
//We make a GET request to the GET route we've set up in server.js
//Take the data stored in the API end point (taken from OpenWeather with GET Request & added with Post Request) & add it to the UI by selecting elements below//
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();

      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('content').innerHTML = allData.userresponse;
  
    }catch(error){
      console.log("error", error);
    }
  }