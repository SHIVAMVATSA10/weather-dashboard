import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import CurrentWeather from "./Components/CurrentWeather";
import WeatherDetails from "./Components/WeatherDetails"
import HourlyForecast from "./Components/HourlyForecast";
import DailyForecast from "./Components/DailyForecast";


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchesLoaded, setSearchesLoaded] = useState(false)

  
  useEffect(() => {
  const savedSearches = localStorage.getItem("recentSearches");

  if (savedSearches) {
    setRecentSearches(JSON.parse(savedSearches));
  }

  setSearchesLoaded(true);
}, []);

useEffect(() => {
  if (!searchesLoaded) return;

  localStorage.setItem(
    "recentSearches",
    JSON.stringify(recentSearches)
  );
}, [recentSearches, searchesLoaded]);

  

  async function handleSearch() {
  
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      const data = await response.json();

      
      if (!data.results) {
        setError("City not found");
        return;
      }

      const locationData = data.results[0];

      
      setCity("");

 
      setLocation(locationData);

      
      setRecentSearches((previousSearches) => [
        ...previousSearches,
        locationData.name,
      ]);

      
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code`
      );

      const weatherData = await weatherResponse.json();

      setWeather(weatherData);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  function getWeatherCondition(code) {
    if (code === 0) return "Clear Sky";
    if (code === 1 || code === 2) return "Partly Cloudy";
    if (code === 3) return "Overcast";
    if (code >= 51 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain Showers";
    if (code >= 95) return "Thunderstorm";

    return "Unknown";
  }

  function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "🌤️";
    if (code === 3) return "☁️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";

    return "🌡️";
  }

  function formatTime(time) {
    const date = new Date(time);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    });
  }

  function formatDay(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString([], {
      weekday: "short",
    });
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Weather Dashboard</h1>
      </header>

      <main>
        
        <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        />

        {loading && (
          <section className="loading">
            <p>Loading weather...</p>
          </section>
        )}

        
        {error && (
          <section className="error">
            <p>{error}</p>
          </section>
        )}

        
       <CurrentWeather
      weather={weather}
      location={location}
      getWeatherIcon={getWeatherIcon}
      getWeatherCondition={getWeatherCondition}
      />

      <WeatherDetails weather={weather} />
            
      <HourlyForecast
      weather={weather}
      getWeatherIcon={getWeatherIcon}
      formatTime={formatTime}
      />

      <DailyForecast
       weather={weather}
      getWeatherIcon={getWeatherIcon}
      formatDay={formatDay}
      />                
                    
      <section className="recent-searches">
          <h2>Recent Searches</h2>

          {recentSearches.map((search, index) => (
            <p key={index}>{search}</p>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;