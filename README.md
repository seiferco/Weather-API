# Weather Comparison Application

This project is a **5-Day Weather Comparison** tool that allows users to compare weather data for two locations side-by-side. It uses APIs to fetch location and weather data and displays the results in two tables.

---

## Features

- **Compare Two Locations**: Users can input two cities and their respective states to fetch and compare weather data.
- **5-Day Forecast**: Displays high/low temperatures, chance of rain, and weather outlook for each location.
- **Error Handling**: Ensures that all required inputs are provided and validates locations entered.
- **Interactive UI**: Dropdown menus for states, radio buttons for temperature units, and error messages for invalid inputs.

---

## Technologies Used

- **HTML**: Structure of the web page.
- **CSS**: Styling for the interface.
- **JavaScript**: Logic for fetching and displaying data, user input validation, and error handling.
- **APIs**:
  - [Geocode Maps API](https://geocode.maps.co) - Retrieves latitude and longitude for a given city and state.
  - [Open-Meteo API](https://open-meteo.com) - Fetches weather data for given coordinates.

---

## How to Use

1. **Enter Location Details**:
   - Input the city name for both locations.
   - Select the state for each location using the dropdown menus.

2. **Select Temperature Unit**:
   - Choose between Celsius or Fahrenheit using the radio buttons.

3. **Compare Weather**:
   - Click the "Compare" button to fetch and display the weather data for both locations.

4. **View Results**:
   - Tables will display:
     - **Date**: Day of the week.
     - **High/Low Temperatures**.
     - **Chance of Rain**: Percentage likelihood of precipitation.
     - **Outlook**: Weather icon representing conditions.

---

## Files

- `weather.html`: The main HTML file for the application.
- `weather.css`: Stylesheet for customizing the appearance.
- `weather.js`: JavaScript file containing logic for:
  - Fetching weather and location data.
  - Populating the dropdown menus.
  - Validating user inputs and handling errors.
  - Dynamically creating and updating tables with weather information.

---

## Key Functions (in `weather.js`)

1. **`validateInputs()`**:
   - Ensures all required fields are filled.
   - Handles errors for invalid or incomplete inputs.

2. **`getWeather(city, state, unit)`**:
   - Fetches location coordinates and weather data for the first location.

3. **`getWeather2(city, state, unit)`**:
   - Fetches location coordinates and weather data for the second location.

4. **`displayTable(results, city)`**:
   - Dynamically creates and populates the weather table for the first location.

5. **`displayTable2(results, city)`**:
   - Dynamically creates and populates the weather table for the second location.

6. **`weatherCodeMap()`**:
   - Maps weather condition codes to corresponding icons.

7. **`getDayName(dateStr)`**:
   - Converts API date strings into readable day names.

---

## Error Handling

- **Missing Input**: Prompts the user to fill in any missing fields.
- **Invalid Locations**: Displays an error if a location cannot be found via the Geocode Maps API.
- **Incomplete Selection**: Ensures a temperature unit is selected before fetching data.

---

## Example Usage

1. Input:
   - Location 1: `City: Los Angeles, State: California`.
   - Location 2: `City: New York, State: New York`.
   - Temperature Unit: `Fahrenheit`.

2. Click `Compare`.

3. View Results:
   - Two tables displaying 5-day forecasts for both locations.

---

## Project Details

- **Author**: Cole Seifert
- **Date**: May 14, 2024
- **License**: MIT License

---
