function HourlyForecast({ weather, getWeatherIcon, formatTime }) {
  return (
    <section className="hourly-forecast">
      <h2>Hourly Forecast</h2>

      {weather && (
        <div>
          {weather.hourly.time
            .slice(0, 12)
            .map((time, index) => (
              <div key={time}>
                <p>{formatTime(time)}</p>

                <p>
                  {weather.hourly.temperature_2m[index]}°C
                </p>

                <p>
                  {getWeatherIcon(
                    weather.hourly.weather_code[index]
                  )}
                </p>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

export default HourlyForecast;