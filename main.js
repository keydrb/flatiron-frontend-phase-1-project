console.log('connected')
const apiKey = '85853cfbeb5f8f89bacf8d0fc4c54696';

document.addEventListener('DOMContentLoaded', () => {
  const stateSelect = document.getElementById('stateSelect');
  const weatherInfo = document.getElementById('weatherInfo');

  // Add options for all fifty states
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
    'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
    'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  states.forEach(state => {
    const option = document.createElement('option');
    option.text = state;
    option.value = state;
    stateSelect.add(option);
  });

  stateSelect.addEventListener('change', () => {
    const selectedState = stateSelect.value;
    if (selectedState) {
      getWeather(selectedState);
    }
  });
});

function getWeather(state) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.textContent = 'Loading...';

  // Replace 'YOUR_OPENWEATHER_API_KEY' with your actual API key
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state},US&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperatureKelvin = data.main.temp;
      const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2);
      const temperatureFahrenheit = ((temperatureKelvin - 273.15) * 9 / 5 + 32).toFixed(2);

      weatherInfo.textContent = `Weather in ${state}: ${weatherDescription}.
      Temperature: ${temperatureCelsius}°C (${temperatureFahrenheit}°F)`;
    })
    .catch(error => {
      weatherInfo.textContent = 'Error fetching weather data.';
      console.error(error);
    });
}
