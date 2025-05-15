
import React, { useState } from "react";
import './../styles/App.css';

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

const App = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData({
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        });
      } else {
        setWeatherData(null);
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <input
        type="text"
        className="search"
        placeholder="Enter city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {weatherData && (
        <div className="weather">
          <h2>{query}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>{weatherData.description}</p>
          <img src={weatherData.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
};

export default App;

