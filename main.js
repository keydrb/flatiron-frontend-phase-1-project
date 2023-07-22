
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

// Event listener for the "Check Weather" button
document.getElementById('checkButton').addEventListener('click', () => {
  const cityInput = document.getElementById('cityInput').value;
  if (cityInput.trim() !== '') {
    getWeatherData(cityInput);
  }
});

// Event listener for pressing the "Enter" key on the input field
document.getElementById('cityInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput.trim() !== '') {
      getWeatherData(cityInput);
    }
  }
});

// Function to fetch weather data from the OpenWeatherMap API
function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.log('Error fetching weather data:', error));
}

// Function to display weather information on the page
function displayWeather(weatherData) {
  const weatherInfoDiv = document.getElementById('weatherInfo');
  weatherInfoDiv.innerHTML = '';

  const weatherObjects = [
    { attribute: 'Temperature', value: `${weatherData.main.temp}°C` },
    { attribute: 'Humidity', value: `${weatherData.main.humidity}%` },
    { attribute: 'Weather', value: weatherData.weather[0].description },
    { attribute: 'Wind Speed', value: `${weatherData.wind.speed} m/s` },
    { attribute: 'Pressure', value: `${weatherData.main.pressure} hPa` }
  ];

  weatherObjects.forEach(weatherObject => {
    const weatherItem = document.createElement('div');
    weatherItem.classList.add('weather-item');
    weatherItem.innerHTML = `<strong>${weatherObject.attribute}:</strong> ${weatherObject.value}`;
    weatherInfoDiv.appendChild(weatherItem);
  });
}
