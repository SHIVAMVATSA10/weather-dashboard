function CurrentWeather({
  weather,
  location,
  getWeatherIcon,
  getWeatherCondition,
}) {
  return (
    <section className="current-weather">
      {location && <h2>{location.name}</h2>}

      {weather && (
        <p>{getWeatherIcon(weather.current.weather_code)}</p>
      )}

      {weather && (
        <p>{weather.current.temperature_2m}°C</p>
      )}

      {weather && (
        <p>
          {getWeatherCondition(weather.current.weather_code)}
        </p>
      )}
    </section>
  );
}

export default CurrentWeather;