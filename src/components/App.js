import React, { useState } from "react";
import "./../styles/App.css";

const API_KEY = "d3f13ae45e65edcb952a5fff7707bad9"; 
const App = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = () => {
    if (!query) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData({
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          });
          setQuery(""); // ✅ clear input field after successful fetch
        } else {
          setWeatherData(null);
          alert("City not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
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
          <h2>{query || "City"}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>{weatherData.description}</p>
          <img src={weatherData.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
};

export default App;
