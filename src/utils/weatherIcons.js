import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  CloudFog,
} from "lucide-react";

export function getWeatherIcon(
  condition,
  iconCode = ""
) {
  const type = condition.toLowerCase();

  // OpenWeather uses:
  // d = daytime
  // n = nighttime

  const isNight =
    iconCode.endsWith("n");

  if (type.includes("thunder")) {
    return CloudLightning;
  }

  if (type.includes("drizzle")) {
    return CloudDrizzle;
  }

  if (
    type.includes("rain") ||
    type.includes("shower")
  ) {
    return CloudRain;
  }

  if (type.includes("snow")) {
    return Snowflake;
  }

  if (
    type.includes("mist") ||
    type.includes("fog") ||
    type.includes("haze")
  ) {
    return CloudFog;
  }

  if (type.includes("cloud")) {
    return isNight
      ? CloudMoon
      : CloudSun;
  }

  if (type.includes("clear")) {
    return isNight
      ? Moon
      : Sun;
  }

  return Cloud;
}


export function isNightTime(weather) {
  // First preference:
  // use OpenWeather's real icon code.

  if (weather?.weather?.[0]?.icon) {
    return weather.weather[0].icon.endsWith("n");
  }

  // Fallback:
  // use sunrise/sunset timestamps.

  const now = Math.floor(
    Date.now() / 1000
  );

  return (
    now < weather.sys.sunrise ||
    now > weather.sys.sunset
  );
}