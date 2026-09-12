function DailyForecast({ weather, getWeatherIcon, formatDay }) {
  return (
    <section className="daily-forecast">
      <h2>7-Day Forecast</h2>

      {weather && (
        <div>
          {weather.daily.time
            .slice(0, 7)
            .map((date, index) => (
              <div key={date}>
                <p>{formatDay(date)}</p>

                <p>
                  {getWeatherIcon(
                    weather.daily.weather_code[index]
                  )}
                </p>

                <p>
                  High:{" "}
                  {weather.daily.temperature_2m_max[index]}°C
                </p>

                <p>
                  Low:{" "}
                  {weather.daily.temperature_2m_min[index]}°C
                </p>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

export default DailyForecast;