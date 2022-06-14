/* Global Variables */
const date = document.getElementById('date');
const zipCode = document.getElementById('zipCode');
const weather = document.getElementById('weather');
const journal = document.getElementById('journal');
const entryHolder = document.getElementById('entryHolder');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//* comments *//

// Personal API Key for OpenWeatherMap API
let apiKey = 'ff1af0ef32f3aced7acaff971e667d56';
let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const newEntry = document.getElementById('journal').value;

// Event listener to add function to existing HTML DOM element
document.getElementById('addEntry').addEventListener('click', addJournal); 

/* Function called by event listener */
function addJournal(event) {
    event.preventDefault();
    console.log(`Mandatory elements: ${zipCode.value}, ${journal.value}`);
  
    // Checks whether the user has entered the required inputs
    if (date.value && zipCode.value && journal.value) {
      addEntry.innerText = '';
  
      getWeatherByZipCode(baseUrl, zipCode.value)
      .then(data => postWeatherData('/save', data))
      .then(() => updateUI())
      .catch(() => {
        cleanUI(
          date.innerHTML = "",
          zipCode.innerHTML = "",
          weather.innerHTML = "",
          journal.innerHTML = "",
        );
        addEntry.innerText = 'The zipcode is invalid'
      });
    } else {
      cleanUI()
      addEntry.innerText = 'You need to enter the zipcode and journal';
    }
  }
  
  /* Function to GET Web API Data*/
  const getWeatherByZipCode = async (baseUrl, zipCode) => {
    const urldata = {
      url: `${baseUrl}${zipCode}`,
    };
  
    const getWeather = await fetch('/getWeather', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(urldata)
    });
  
    try {
      const data = await getWeather.json();
  
      if (data.code === "404") {
        throw new Error('error 404');
      }
      return data;
    } catch (error) {
      console.log('Error =>', error);
      return error;
    }
  }
  
  /* Function to POST data */
  const postWeatherData = async (url, { date, zipCode, weather, journal }) => {
    const postData = {
      date: date.value,
      zipCode: zipCode.value,
      weather: weather.value,
      content: journal.value,
    };
  
    return await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
  }
  
  // Function to clear all UI
  const cleanUI = async () => {
    // weatherIconElement.className = "";
    date.innerHTML = "";
    zipCode.innerHTML = "",
    weather.innerHTML = "";
    journal.innerHTML = "";
  }
  
  /* Function to GET Project Data */
  const updateUI = async () => {
    const data = await fetch('/all');
    const dataRetrieve = await data.json();
  
    // weatherIconElement.className = "";
    // weatherIconElement.className = getClassNameIcon(dataRetrieve.dateTime);
  
    dateElement.innerHTML = getFormattedDate(dataRetrieve.date);
    zipCodeElement.innerHTML = dataRetrieve.zipCode;
    weatherElement.innerHTML = `${dataRetrieve.weather} °F`;
    journalElement.innerHTML = dataRetrieve.journal;
  }