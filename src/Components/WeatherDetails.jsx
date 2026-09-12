function WeatherDetails({ weather }) {
  return (
    <section className="weather-details">
      {weather && (
        <div>
          Feels Like: {weather.current.apparent_temperature}°C
        </div>
      )}

      {weather && (
        <div>
          Humidity: {weather.current.relative_humidity_2m}%
        </div>
      )}

      {weather && (
        <div>
          Wind: {weather.current.wind_speed_10m} km/h
        </div>
      )}
    </section>
  );
}

export default WeatherDetails;