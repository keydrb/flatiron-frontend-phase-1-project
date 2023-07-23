
const apiKey = 'keydrb';

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
function getWeatherData(city)
{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.log('Error fetching weather data:', error));
}

// Function to display weather information on the page

// Function to display weather information on the page
function displayWeather(weatherData) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = '';
  
    // Extract the city name from the API response
    const cityName = weatherData.name;

    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location');
    locationDiv.innerHTML = '<strong.Location:</strong> ${cityName}, ${stateName}';
    


    const weatherObjects = [
      { attribute: 'City', value: cityName },
      { attribute: 'Temperature', value: `${weatherData.main.temp}°C` },
      { attribute: 'Humidity', value: `${weatherData.main.humidity}%` },
      { attribute: 'Weather', value: weatherData.weather[0].description },
      { attribute: 'Wind Speed', value: `${weatherData.wind.speed} m/s` },
      { attribute: 'Pressure', value: `${weatherData.main.pressure} hPa` }
    ];
  
    weatherObjects.forEach(weatherObject => {
      const weatherItem = document.createElement('div');
      weatherItem.classList.add('weather-item');
      const iconFilename = getWeatherIconFilename(weatherData.weather[0].main);
      const iconMarkup = iconFilename ? `<img src="icons/${iconFilename}" alt="${weatherData.weather[0].main}" class="weather-icon">` : '';
      weatherItem.innerHTML = `<strong>${weatherObject.attribute}:</strong> ${iconMarkup} ${weatherObject.value}`;
      weatherInfoDiv.appendChild(weatherItem);
    });
  }  
 
// Function to map weather conditions to PNG filenames
function getWeatherIconFilename(weatherCondition) {
    switch (weatherCondition) {
      case 'Clear':
        return 'sunny-day.png';
      case 'Clouds':
        return 'cloudy.png';
        case 'Rain':
            return 'rainy.png';
      // Add mappings for other weather conditions and their corresponding PNG filenames
      // For example:
      // case 'Rain':
      //   return 'rain.png';
      // case 'Snow':
      //   return 'snow.png';
      // case 'Thunderstorm':
      //   return 'thunderstorm.png';
      // case 'Drizzle':
      //   return 'drizzle.png';
      default:
        return ''; // If the weather condition is not recognized, return an empty string
    }
  }
  