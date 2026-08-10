export function getWeatherTheme(weather) {
  const condition =
    weather.weather[0].main.toLowerCase();

  const iconCode =
    weather.weather[0].icon || "";

  /*
    OpenWeather icon codes:

    01d = clear day
    01n = clear night

    02d / 02n = few clouds
    03d / 03n = scattered clouds
    04d / 04n = broken clouds

    09d / 09n = shower rain
    10d / 10n = rain

    11d / 11n = thunderstorm

    13d / 13n = snow

    50d / 50n = mist
  */

  const isNight =
    iconCode.endsWith("n");

  /*
    NIGHT HAS PRIORITY

    If it is actually nighttime,
    our app should look like nighttime.
  */

  if (isNight) {

    if (
      condition.includes("rain") ||
      condition.includes("drizzle")
    ) {
      return "night-rain";
    }

    if (
      condition.includes("thunder")
    ) {
      return "night-storm";
    }

    if (
      condition.includes("cloud")
    ) {
      return "night-cloudy";
    }

    return "night";
  }

  /*
    DAYTIME WEATHER
  */

  if (
    condition.includes("thunder")
  ) {
    return "thunderstorm";
  }

  if (
    condition.includes("rain") ||
    condition.includes("drizzle")
  ) {
    return "rain";
  }

  if (
    condition.includes("snow")
  ) {
    return "snow";
  }

  if (
    condition.includes("cloud")
  ) {
    return "cloudy";
  }

  if (
    condition.includes("clear")
  ) {
    return "clear";
  }

  return "default";
}