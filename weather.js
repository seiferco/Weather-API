// This file is javascript for weather.html
// It contains functions that interact with the website
// Includes functions that fetch API's and returns the neccesarry information to create a weather comparator between 2 cities
// It has functions to help with error checking user input and many other functions


window.addEventListener("DOMContentLoaded", function(){
    const stateSelect = document.getElementById("state1");
    const stateSelect2 = document.getElementById("state2");
    const states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
        'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 
        'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];


    // Create an option input for every state in the array above
    //Add a value, and text for each one to display on screen and reference later for the API
    states.forEach(function(state) {
        const option = document.createElement("option");
        option.value = state;
        option.text = state;
        stateSelect.appendChild(option);
    });

    // Create options for the second state select dropdown
    states.forEach(function(state) {
        const option = document.createElement("option");
        option.value = state;
        option.text = state;
        stateSelect2.appendChild(option);
    });

    // wait for the compare button to be clicked and then validate user's input by calling validateInputs() 
    document.getElementById("compareBtn").addEventListener("click", validateInputs);
});

// Function to display weather data in a table for the first location
function displayTable(results, city) {

    // Display city name as table caption
    const caption = document.getElementById("tableCaption1");
    caption.innerHTML = city;

    document.getElementById("resultArea1").hidden = false;
    const table = document.getElementById("weatherTable1");

    // Create table header
    const tableHead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Append header text to header tags
    const headers = ["Date", "High", "Low", "Chance of Rain", "Outlook"];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);

    // Create table body
    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    // Loop through the weather data to populate table rows
    for (let i = 0; i < 5; i++){
        let tr = document.createElement('tr');
        tableBody.appendChild(tr);

        // Day of the week
        let tdDate = document.createElement('td');
        let dayOfWeek = getDayName(results.daily.time[i]);
        tdDate.appendChild(document.createTextNode(dayOfWeek));
        tr.appendChild(tdDate);

        // High of the day
        let tdHigh = document.createElement('td');
        tdHigh.appendChild(document.createTextNode(results.daily.temperature_2m_max[i]+"°"));
        tr.appendChild(tdHigh);

        // Low of the day
        let tdLow = document.createElement('td');
        tdLow.appendChild(document.createTextNode(results.daily.temperature_2m_min[i]));
        tr.appendChild(tdLow);

        // Chance of rain
        let tdRain = document.createElement('td');
        tdRain.appendChild(document.createTextNode(results.daily.precipitation_probability_max[i] + "%"));
        tr.appendChild(tdRain);

        // Outlook (weather icon)
        let weatherCodeImg = weatherCodeMap();
        // Create td for weather code (with image)
        let tdWeatherImage = document.createElement('td');
        let weatherCode = results.daily.weather_code[i];
        let img = document.createElement('img');
        img.src = weatherCodeImg[weatherCode];
        img.alt = `Weather code ${weatherCode}`; 
        img.style.width = '50px';
        img.style.height = '50px'; 
        tdWeatherImage.appendChild(img);
        tr.appendChild(tdWeatherImage);
    }
}

// Function to fetch weather data for the first location
function getWeather(city, state, unit) {
    city = encodeURI(city);
    state = encodeURI(state);
    unit = encodeURI(unit);
    
    const loc_url_1 = `https://geocode.maps.co/search?q=${city}+${state}&api_key=66425abb1da80765838878gfq5770ed`;

    fetch(loc_url_1)
        .then(response => {
            return response.json();
        })
        .then(data1 => {
            if (data1 && data1.length > 0) { //if data was returned correctly/place exists continue
                let lat = data1[0].lat; // retrieve latitude from geocode.maps
                let lon = data1[0].lon; // retrieve longitude from geocode.maps
                console.log("geocode-maps data: ", data1);
                lat = encodeURI(lat); 
                lon = encodeURI(lon);
                console.log("Lat: ", lat);
                console.log("Lon: ", lon);
                const weather_url_1 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=${unit}&wind_speed_unit=mph&precipitation_unit=inch`;

                fetch(weather_url_1)
                    .then(response2 => {
                        return response2.json();
                    })
                    .then(data2 => {
                        console.log("Mateo-weather data: ", data2);
                        // Handle the weather data and update the table
                        displayTable(data2, decodeURI(city));
                    })
                    .catch(error => {
                        console.error("Error fetching weather data: ", error);
                    });

            } else { // API cannot fetch location user gave 
                const errorMessage = document.getElementById("error-message");
                errorMessage.style.display = "block";
                errorMessage.textContent = "Location 1 not found.";
            }
        })
        .catch(error => {
            console.error("Error fetching location data: ", error);
        });
}

// Duplicate function as getWeather ^ but helper for getting location 2 and printing the table
function getWeather2(city, state, unit) {
    city = encodeURI(city);
    state = encodeURI(state);
    unit = encodeURI(unit);
    
    const loc_url_1 = `https://geocode.maps.co/search?q=${city}+${state}&api_key=66425abb1da80765838878gfq5770ed`;

    fetch(loc_url_1)
        .then(response => {
            return response.json();
        })
        .then(data1 => {
            if (data1 && data1.length > 0) { //if data was returned correctly/place exists continue
                let lat = data1[0].lat; // retrieve latitude from geocode.maps
                let lon = data1[0].lon; // retrieve longitude from geocode.maps
                console.log("geocode-maps data: ", data1);
                lat = encodeURI(lat); 
                lon = encodeURI(lon);
                console.log("Lat: ", lat);
                console.log("Lon: ", lon);
                const weather_url_1 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=${unit}&wind_speed_unit=mph&precipitation_unit=inch`;

                fetch(weather_url_1)
                    .then(response2 => {
                        return response2.json();
                    })
                    .then(data2 => {
                        console.log("Mateo-weather data: ", data2);
                        // Handle the weather data and update the table
                        displayTable2(data2, decodeURI(city));
                    })
                    .catch(error => {
                        console.error("Error fetching weather data: ", error);
                    });

            } else { // API cannot fetch location user gave 
                const errorMessage2 = document.getElementById("error-message");
                errorMessage2.style.display = "block";
                errorMessage2.textContent = "Location 2 not found.";
            }
        })
        .catch(error => {
            console.error("Error fetching location data: ", error);
        });
}

// Function to display weather data in a table for the second location
function displayTable2(results, city) {

    // Display city name as table caption
    const caption = document.getElementById("tableCaption2");
    caption.innerHTML = city;
    
    // Retrieve second table area for city2
    document.getElementById("resultArea2").hidden = false;
    const table = document.getElementById("weatherTable2");

    // Create table header
    const tableHead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Append header text to header tags
    const headers = ["Date", "High", "Low", "Chance of Rain", "Outlook"];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);

    // Create table body
    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    for (let i = 0; i < 5; i++){
        let tr = document.createElement('tr');
        tableBody.appendChild(tr);

        // Day of the week
        let tdDate = document.createElement('td');
        let dayOfWeek = getDayName(results.daily.time[i]);
        tdDate.appendChild(document.createTextNode(dayOfWeek));
        tr.appendChild(tdDate);

        // High of the day
        let tdHigh = document.createElement('td');
        tdHigh.appendChild(document.createTextNode(results.daily.temperature_2m_max[i]+"°"));
        tr.appendChild(tdHigh);

        // Low of the day
        let tdLow = document.createElement('td');
        tdLow.appendChild(document.createTextNode(results.daily.temperature_2m_min[i]));
        tr.appendChild(tdLow);

        // Chance of rain
        let tdRain = document.createElement('td');
        tdRain.appendChild(document.createTextNode(results.daily.precipitation_probability_max[i] + "%"));
        tr.appendChild(tdRain);

        // Outlook
        let weatherCodeImg = weatherCodeMap();
        // Create td for weather code (with image)
        let tdWeatherImage = document.createElement('td');
        let weatherCode = results.daily.weather_code[i];
        let img = document.createElement('img');
        img.src = weatherCodeImg[weatherCode];
        img.alt = `Weather code ${weatherCode}`; // Optional: set alt text
        img.style.width = '50px'; // Optional: set image width
        img.style.height = '50px'; // Optional: set image height
        tdWeatherImage.appendChild(img);
        tr.appendChild(tdWeatherImage);
    }
}

// Function used to validate input on the user end.
// Makes sure the user enters all the appropriate requirenments before submitting the tables
// Will prompt errors for all incorrect input
// This includes missing a city, state, unknown location, or missing unit type selection
// If one of the locations is valid but not the other, the table that is valid will still be printed while printing an error for location 2
function validateInputs() {

    //reset table if user enters in new data
    document.querySelectorAll("tbody").forEach(function(e){e.remove()}) ;
    document.querySelectorAll("thead").forEach(function(e){e.remove()});
    let caption1 = document.getElementById("tableCaption1");
    let caption2 = document.getElementById("tableCaption2");
    caption1.innerHTML = "";
    caption2.innerHTML = "";

    const city1 = document.getElementById("city1").value.trim();
    const state1 = document.getElementById("state1").value;
    const selectedUnit = document.querySelector('input[name="temperatureUnit"]:checked');
    const errorMessage = document.getElementById("error-message");

    const city2 = document.getElementById("city2").value.trim();
    const state2 = document.getElementById("state2").value;

    let location1 = true;
    let location2 = true;
    let message = "";

    if (!city1) {
        location1 = false;
        message = "Please enter a city for location 1.";
    } 
    if(!state1){
        location1 = false;
        message = "Please select a state for location 1.";
    }
    if(!city2){
        location2 = false;
        message = "Please select a city for location 2";
    }
    if(!state2){
        location2 = false;
        message = "Please select a state for location 2";
    }
    if (!selectedUnit) {
        location1 = false;
        location2 = false;
        message = "Please select a temperature unit.";
    }

    // If both inputs are valid, print both weather tables
    // else one or the other 
    // else neither print all error messages
    if (location1 && location2) { 
        errorMessage.style.display = "none";
        // Proceed with fetching weather data for location 1
        getWeather(city1, state1, selectedUnit.value);
        getWeather2(city2, state2, selectedUnit.value);
    } else if(location1 && !location2) {
        errorMessage.textContent = message;
        getWeather(city1, state1, selectedUnit.value);
    } else if(location2 & !location1) {
        errorMessage.textContent = message;
        getWeather2(city2, state2, selectedUnit.value);
    } else {
        errorMessage.textContent = message;
    }
 
    
}

// function to convert API's date string from xx-xx-xxx format to day of the week in characters
function getDayName(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {weekday: "short", timeZone: "UTC" });
}

//Function for storing weather mapping images based on the weather code the API returned
function weatherCodeMap () {
    const weatherCodeImg = {
        0: "images/sun.png",
        1: "images/cloudy-day.png",
        2: "images/cloudy-day.png",
        3: "images/cloudy-day.png",
        45: "images/mist.png",
        48: "images/mist.png",
        51: "images/drizzle.png",
        53: "images/drizzle.png",
        55: "images/drizzle.png",
        56: "images/freezing-rain.png",
        57: "images/freezing-rain.png",
        61: "images/heavy-rain.png",
        63: "images/heavy-rain.png",
        65: "images/heavy-rain.png",
        66: "images/freezing-rain.png",
        67: "images/freezing-rain.png",
        71: "images/snow.png",
        73: "images/snow.png",
        75: "images/snow.png",
        77: "images/snow.png",
        80: "images/heavy-rain.png",
        81: "images/heavy-rain.png",
        82: "images/heavy-rain.png",
        85: "images/snow.png",
        86: "images/snow.png",
        95: "images/lightning-bolt.png",
        96: "images/thunderstorm.png",
        99: "images/thuunderstorm.png",
    }
    return weatherCodeImg
}


