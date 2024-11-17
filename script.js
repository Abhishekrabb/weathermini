const apiKey = '588a5d72b6aa86a3ac56a46fe8d685a1'; // Replace with your OpenWeatherMap API key

document.getElementById('searchButton').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found');
            return;
        }

        // Extract the weather data
        const location = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Update the UI
        document.getElementById('location').textContent = `Weather in ${location}`;
        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
        document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${icon}.png`;
        document.getElementById('weatherIcon').alt = description;
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} m/s`;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Something went wrong, please try again later');
    }
}
