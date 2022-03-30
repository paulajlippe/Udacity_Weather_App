/* Global Variables */
// const date = document.getElementById('date');
// const location = document.getElementById('location');
// const temp = document.getElementById('temp');
// const journal = document.getElementById('journal');
// const entryHolder = document.getElementById('entryHolder');

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//* comments *//

// Personal API Key for OpenWeatherMap API
let apiKey = 'ff1af0ef32f3aced7acaff971e667d56';
let baseUrl = 'api.openweathermap.org/data/2.5';
const newEntry = document.getElementById('journal').value;

// Event listener to add function to existing HTML DOM element
document.getElementById('addEntry').addEventListener('click', addJournal); 

/* Function called by event listener */
async function addJournal(e){
    if(zip.value != "" && journal.value != ""){
        let currentDate = new Date().toDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        console.log(document.getElementById('countryCode').value);
        let data = await getWeatherData(document.getElementById('zip').value, document.getElementById('countryCode').value);
        let tempValue = Math.round(data.main.temp);
        let locationValue = data.name + ", " + data.sys.country;
        let weatherValue = data.weather[0].main + ", feels like " + Math.round(data.main.feels_like);
        let journalValue = document.getElementById('journal').value;
        postData('/journal', {
            date: currentDate,
            location: locationValue,
            temp: tempValue,
            weather: weatherValue,
            journal: journalValue
        })
        .then(
            updateUI()
        )
    }else{
        if(zip.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter a valid zipcode";
        }
        if(feeling.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter your feelings";
        }
        if(zip.value == "" && feeling.value == ""){
            document.getElementById('entryHolder').innerHTML = "Please enter zipcode and feelings";
        }
        document.getElementById('entryHolder').style.color = "#ff6600";
        setTimeout(function() {
            location.reload(1);
        }, 5000);
    }
}

/* Function to GET Web API Data*/
 const getWeatherData = async (zipCode, countryCode) => {
    let KEYS = await getapiKey();
    const apiKey = KEYS.apiKey;
    // let countryCode = 'US';
    api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    const url = baseURL/+zipCode+',' + (countryCode || 'US') +'&appid='+apiKey+'&units=metric';
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

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'package/json'
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

/* Function to GET Project Data */
// const getWeatherData = async (url='') =>{ 
//     const request = await fetch(url);
//     try {
//     // Transform into JSON
//     const allData = await request.json()
//     }
//     catch(error) {
//       console.log("error", error);
//       // appropriately handle the error
//     }
// };

//Update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()
        console.log(allData);

        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('location').innerHTML = allData[0].location;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('journal').innerHTML = allData[0].journal;
        entryHolder.classList.add("showCard");
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// TODO-Chain your async functions to post an animal then GET the resulting data
// TODO-Call the chained function
//
// function postGet(){
//     postData('/animal', {fav:'lion'})
//       .then(function(data){
//         retrieveData('/all')
//       })
//   }
// 
//   postGet()