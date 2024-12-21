document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
      getWeather(city);
    } else {
      alert("Please enter a city name.");
    }
});

async function getWeather(city) {
    const apiKey = 'dc530fefd839c8753741d697c23e223a'; // Your provided API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert('City not found! Please enter a valid city name.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const iconCode = data.weather[0].icon; // Get the weather icon code
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Construct the icon URL

    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="Weather icon"> <!-- Display weather icon -->
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.style.display = 'block';
}
