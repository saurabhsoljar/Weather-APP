// Function to fetch weather data
function fetchWeather(location) {
  const apiKey = 'b9d95aaad6af41e995a111145250202';
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;
      const wind = data.current.wind_kph;
      const humidity = data.current.humidity;
      const airQuality = data.current.air_quality['us-epa-index']; 
      const lat = data.location.lat;
      const lon = data.location.lon;

      // Display weather data
      document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
      document.getElementById('condition').textContent = `Condition: ${condition}`;
      document.getElementById('wind').textContent = `Wind: ${wind} km/h`;
      document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
      document.getElementById('airQuality').textContent = `Air Quality: ${getAirQualityText(airQuality)}`;

      // Fetch sunrise and sunset times
      fetchSunriseSunset(lat, lon);

      // Display current time
      const currentTime = new Date().toLocaleTimeString();
      document.getElementById('currentTime').textContent = `Current Time: ${currentTime}`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('temperature').textContent = 'Failed to fetch weather data.';
      document.getElementById('condition').textContent = '';
      document.getElementById('wind').textContent = '';
      document.getElementById('humidity').textContent = '';
      document.getElementById('airQuality').textContent = '';
      document.getElementById('sunrise').textContent = '';
      document.getElementById('sunset').textContent = '';
      document.getElementById('currentTime').textContent = '';
    });
}

// Function to convert air quality index to text
function getAirQualityText(aqi) {
  switch (aqi) {
    case 1:
      return 'Good';
    case 2:
      return 'Moderate';
    case 3:
      return 'Unhealthy for Sensitive Groups';
    case 4:
      return 'Unhealthy';
    case 5:
      return 'Very Unhealthy';
    case 6:
      return 'Hazardous';
    default:
      return 'Unknown';
  }
}

// Function to fetch sunrise and sunset times
function fetchSunriseSunset(lat, lon) {
  const apiUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const sunriseUTC = new Date(data.results.sunrise);
      const sunsetUTC = new Date(data.results.sunset);

      // Convert UTC to local time
      const sunrise = sunriseUTC.toLocaleTimeString();
      const sunset = sunsetUTC.toLocaleTimeString();

      // Display sunrise and sunset times
      document.getElementById('sunrise').textContent = `Sunrise: ${sunrise}`;
      document.getElementById('sunset').textContent = `Sunset: ${sunset}`;
    })
    .catch(error => {
      console.error('Error fetching sunrise-sunset data:', error);
      document.getElementById('sunrise').textContent = 'Sunrise: N/A';
      document.getElementById('sunset').textContent = 'Sunset: N/A';
    });
}

// Handle form submission for manual location input
document.getElementById('weatherForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission
  const location = document.getElementById('locationInput').value;
  fetchWeather(location);
});