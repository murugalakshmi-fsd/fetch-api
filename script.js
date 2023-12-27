document.addEventListener("DOMContentLoaded", function () {
    const countryRow = document.getElementById("countryRow");
  
    // Function to create Bootstrap cards
    function createCard(countryData) {
      const column = document.createElement("div");
      column.classList.add("col-lg-4", "col-sm-12");
  
      const card = document.createElement("div");
      card.classList.add("card");
  
      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");
      cardHeader.textContent = countryData.name.common;
  
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
  
      const flagImg = document.createElement("img");
      flagImg.src = countryData.flags.svg; // Use the appropriate property for the flag URL
      flagImg.classList.add("img-fluid", "mb-3");
  
      const capital = document.createElement("p");
      capital.textContent = `Capital: ${countryData.capital}`;
  
      const latlng = document.createElement("p");
      latlng.textContent = `Lat/Long: ${countryData.latlng.join(", ")}`;
  
      const region = document.createElement("p");
      region.textContent = `Region: ${countryData.region}`;
  
      const countryCodes = document.createElement("p");
      countryCodes.textContent = `Country Codes: ${countryData.cca2}, ${countryData.cca3}`;
  
      const weatherDisplay = document.createElement("div"); // Container for weather data
      const weatherButton = document.createElement("button");
      weatherButton.classList.add("btn", "btn-primary");
      weatherButton.textContent = "Click for weather";
      weatherButton.addEventListener("click", function () {
        getWeatherData(countryData.capital, countryData.latlng[0], countryData.latlng[1], weatherDisplay);
      });
  
      cardBody.appendChild(flagImg);
      cardBody.appendChild(capital);
      cardBody.appendChild(latlng);
      cardBody.appendChild(region);
      cardBody.appendChild(countryCodes);
      cardBody.appendChild(weatherButton);
      cardBody.appendChild(weatherDisplay);
  
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
  
      column.appendChild(card);
      return column;
    }
  
    // Function to fetch data from Rest Countries API
    function fetchCountryData() {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((country) => {
            const column = createCard(country);
            countryRow.appendChild(column);
          });
        })
        .catch((error) => console.error("Error fetching country data:", error));
    }
  
    // Function to fetch weather data from OpenWeather API
    function getWeatherData(city, lat, lon, weatherDisplay) {
      // Replace 'YOUR_OPENWEATHER_API_KEY' with your actual API key
      const apiKey = 'cb37825acf8b0c04ffd4220ef60e2125';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const weatherInfo = document.createElement("p");
          weatherInfo.textContent = `Weather in ${city}:
          ${data.weather[0].description} 
          Temp:${data.main.temp}`;
          weatherDisplay.innerHTML = ""; // Clear previous weather data
          weatherDisplay.appendChild(weatherInfo);
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  
    // Initial fetch for country data
    fetchCountryData();
  });
  
