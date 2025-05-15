document.addEventListener("DOMContentLoaded", function () {
    fetchWeatherData();
});

function fetchWeatherData() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Vellore&units=metric&appid=015c21d29af2ddc32af9edcb0427f300")
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to check

            // Extract Weather Info
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

            // Update Weather Section
            document.getElementById("weather-info").innerHTML = `
                <img src="${iconUrl}" alt="Weather Icon">
                <p><strong>${description.toUpperCase()}</strong></p>
                <p>🌡 Temperature: ${temperature}°C</p>
                <p>💧 Humidity: ${humidity}%</p>
                <p>🌬 Wind Speed: ${windSpeed} m/s</p>
            `;
        })
        .catch(error => {
            console.error("Weather API Error:", error);
            document.getElementById("weather-info").innerHTML = `<p>⚠ Error fetching weather data</p>`;
        });
}
