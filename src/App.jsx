import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Thermometer,
} from "lucide-react";

import {
  getCurrentWeather,
  getForecast,
} from "./services/weatherApi";

import {
  getWeatherIcon,
  isNightTime,
} from "./utils/weatherIcons";

import {
  getWeatherTheme,
} from "./utils/weatherTheme";

function App() {
  const [city, setCity] = useState("Ujjain");
  const [search, setSearch] = useState("");

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadWeather(location) {
    try {
      setLoading(true);
      setError("");

      const currentWeather =
        await getCurrentWeather(location);

      const forecastWeather =
        await getForecast(location);

      setWeather(currentWeather);
      setForecast(forecastWeather);
      setCity(location);
    } catch (error) {
      setError(
        "City not found. Please try another city."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather(city);
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    if (!search.trim()) return;

    loadWeather(search.trim());
    setSearch("");
  }

  /* ----------------------------- */
  /* LOADING */
  /* ----------------------------- */

  if (loading) {
    return (
      <main className="weather-background loading-screen">

        <div className="loading-content">

          <div className="loading-icon">
            ☁
          </div>

          <p>Loading weather...</p>

        </div>

      </main>
    );
  }

  /* ----------------------------- */
  /* ERROR */
  /* ----------------------------- */

  if (error || !weather) {
    return (
      <main className="weather-background error-screen">

        <div className="glass-card error-card">

          <div className="error-icon">
            ⚠
          </div>

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={() => loadWeather("Ujjain")}
            className="glass-button"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }

  /* ----------------------------- */
  /* CURRENT WEATHER */
  /* ----------------------------- */

  const night = isNightTime(weather);

  const CurrentIcon = getWeatherIcon(
  weather.weather[0].main,
  weather.weather[0].icon
);

  const weatherTheme = getWeatherTheme(weather);

return (
  <main
    className={`weather-background weather-${weatherTheme}`}
  >

      {/* BACKGROUND GLOWS */}

      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />
      <div className="background-glow glow-three" />

      <div className="weather-container">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <header className="weather-header">

  <div className="location">

    <MapPin size={18} />

    <span className="location-name">
      {weather.name}
    </span>

    <span className="country">
      {weather.sys.country}
    </span>

  </div>

  <form
    onSubmit={handleSearch}
    className="search-wrapper"
  >

    <div className="search-container">

      <Search
        size={18}
        className="search-icon"
      />

      <input
        type="text"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Search city..."
      />

      {search && (
        <button
          type="button"
          className="clear-search"
          onClick={() => setSearch("")}
        >
          ×
        </button>
      )}

    </div>

    {/* SEARCH RESULT */}

    {search.trim() && (
      <button
        type="submit"
        className="search-result"
      >

        <div className="result-icon">
          <MapPin size={17} />
        </div>

        <div className="result-text">

          <span>
            {search}
          </span>

          <small>
            Search weather for this city
          </small>

        </div>

        <span className="result-arrow">
          →
        </span>

      </button>
    )}

  </form>

</header>

        {/* ========================= */}
        {/* HERO */}
        {/* ========================= */}

        <section className="hero-card glass-card">

          <div className="hero-content">

            <div className="weather-icon-large">

              <CurrentIcon
                size={100}
                strokeWidth={1.2}
              />

            </div>

            <p className="weather-description">
              {weather.weather[0].description}
            </p>

            <div className="temperature">

              {Math.round(weather.main.temp)}

              <span>°</span>

            </div>

            <p className="feels-like">
              Feels like{" "}
              {Math.round(
                weather.main.feels_like
              )}
              °
            </p>

            <div className="high-low">

              <span>
                H:{" "}
                {Math.round(
                  weather.main.temp_max
                )}
                °
              </span>

              <span>
                L:{" "}
                {Math.round(
                  weather.main.temp_min
                )}
                °
              </span>

            </div>

          </div>

        </section>

        {/* ========================= */}
        {/* HOURLY FORECAST */}
        {/* ========================= */}

        <section className="glass-section">

          <div className="section-title">

            <Thermometer size={18} />

            <h2>
              Hourly Forecast
            </h2>

          </div>

          <div className="hourly-scroll">

            {forecast.list
              .slice(0, 10)
              .map((item, index) => {

                const itemDate =
                  new Date(item.dt * 1000);

                const currentTime =
                  Math.floor(Date.now() / 1000);

                const HourIcon =
  getWeatherIcon(
    item.weather[0].main,
    item.weather[0].icon
  );

                const time =
                  itemDate.toLocaleTimeString(
                    [],
                    {
                      hour: "numeric",
                    }
                  );

                return (
                  <div
                    className="hour-card"
                    key={index}
                  >

                    <p className="hour-time">

                      {Math.abs(
                        item.dt - currentTime
                      ) < 5400
                        ? "Now"
                        : time}

                    </p>

                    <div className="hour-icon">

                      <HourIcon
                        size={34}
                        strokeWidth={1.5}
                      />

                    </div>

                    <p className="hour-temperature">

                      {Math.round(
                        item.main.temp
                      )}
                      °

                    </p>

                  </div>
                );
              })}

          </div>

        </section>

        {/* ========================= */}
        {/* WEATHER DETAILS */}
        {/* ========================= */}

        <section className="details-grid">

          <WeatherDetail
            icon={<Droplets />}
            title="Humidity"
            value={`${weather.main.humidity}%`}
          />

          <WeatherDetail
            icon={<Wind />}
            title="Wind"
            value={`${weather.wind.speed} m/s`}
          />

          <WeatherDetail
            icon={<Eye />}
            title="Visibility"
            value={`${(
              weather.visibility / 1000
            ).toFixed(1)} km`}
          />

          <WeatherDetail
            icon={<Gauge />}
            title="Pressure"
            value={`${weather.main.pressure} hPa`}
          />

        </section>

        {/* ========================= */}
        {/* SUNRISE / SUNSET */}
        {/* ========================= */}

        <section className="sun-grid">

          <SunCard
            icon={<Sunrise />}
            title="Sunrise"
            value={formatTime(
              weather.sys.sunrise
            )}
          />

          <SunCard
            icon={<Sunset />}
            title="Sunset"
            value={formatTime(
              weather.sys.sunset
            )}
          />

        </section>

        {/* ========================= */}
        {/* 5 DAY FORECAST */}
        {/* ========================= */}

        <section className="glass-section forecast-section">

          <div className="section-title">

            <span className="forecast-dot" />

            <h2>
              5-Day Forecast
            </h2>

          </div>

          <div className="forecast-list">

            {getDailyForecast(
              forecast
            ).map((day, index) => {

              const DayIcon =
  getWeatherIcon(
    day.condition,
    day.icon
  );

              return (
                <div
                  className="forecast-row"
                  key={index}
                >

                  <div className="forecast-day">

                    {day.day}

                  </div>

                  <div className="forecast-icon">

                    <DayIcon
                      size={28}
                      strokeWidth={1.5}
                    />

                  </div>

                  <div className="forecast-condition">

                    {day.description}

                  </div>

                  <div className="forecast-temperature">

                    <span>
                      {Math.round(
                        day.max
                      )}
                      °
                    </span>

                    <span className="low-temp">
                      {Math.round(
                        day.min
                      )}
                      °
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}

        <footer className="footer">

          Weather App • Live Weather Data

        </footer>

      </div>

    </main>
  );
}

/* ================================= */
/* WEATHER DETAIL */
/* ================================= */

function WeatherDetail({
  icon,
  title,
  value,
}) {
  return (
    <div className="detail-card glass-card">

      <div className="detail-icon">
        {icon}
      </div>

      <p className="detail-title">
        {title}
      </p>

      <p className="detail-value">
        {value}
      </p>

    </div>
  );
}

/* ================================= */
/* SUN CARD */
/* ================================= */

function SunCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="sun-card glass-card">

      <div className="sun-icon">
        {icon}
      </div>

      <div>

        <p className="sun-title">
          {title}
        </p>

        <p className="sun-value">
          {value}
        </p>

      </div>

    </div>
  );
}

/* ================================= */
/* TIME */
/* ================================= */

function formatTime(timestamp) {
  return new Date(
    timestamp * 1000
  ).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ================================= */
/* DAILY FORECAST */
/* ================================= */

function getDailyForecast(forecast) {

  const days = {};

  forecast.list.forEach((item) => {

    const date =
      new Date(item.dt * 1000);

    const key =
      date.toLocaleDateString();

    if (!days[key]) {

      days[key] = {
  date,

  temps: [],

  condition:
    item.weather[0].main,

  description:
    item.weather[0].description,

  icon:
    item.weather[0].icon,
};

    }

    days[key].temps.push(
      item.main.temp
    );

  });

  return Object.values(days)
    .slice(0, 5)
    .map((day) => ({

      day:
        day.date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),

      max:
        Math.max(...day.temps),

      min:
        Math.min(...day.temps),

      condition:
  day.condition,

description:
  day.description,

icon:
  day.icon,

    }));
}

export default App;