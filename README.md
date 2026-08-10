# 🌤️ Weather App

A modern, responsive weather application built with **React + Vite** that provides real-time weather information with a beautiful **liquid glass / glassmorphism UI** inspired by modern weather applications.

Search for any city and get current weather conditions, hourly forecasts, daily forecasts, weather details, sunrise/sunset information, and dynamic weather-based backgrounds.

---

## ✨ Features

- 🌡️ Real-time temperature
- 🌤️ Dynamic weather icons
- 🌧️ Rain, snow, clouds & thunderstorm detection
- 🌙 Automatic day/night detection
- 🎨 Dynamic weather-based backgrounds
- 🧊 Liquid glass / glassmorphism UI
- 🔍 City weather search
- 🕐 Hourly forecast
- 📅 5-day forecast
- 💧 Humidity information
- 💨 Wind speed
- 👁️ Visibility
- 🎚️ Atmospheric pressure
- 🌅 Sunrise time
- 🌇 Sunset time
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- ⚡ Fast performance with Vite

---

## 🖼️ Preview

### Main Weather Dashboard

The application provides a clean weather dashboard with:

- Current temperature
- Weather condition
- Feels-like temperature
- High / low temperature
- Hourly forecast
- Weather statistics
- Sunrise and sunset
- 5-day forecast

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development & build tool |
| JavaScript | Application logic |
| Tailwind CSS | Utility styling |
| CSS | Glassmorphism & animations |
| Lucide React | Weather & UI icons |
| OpenWeather API | Real-time weather data |

---

## 📁 Project Structure

```text
weather-app/
│
├── public/
│   └── weather-icon.svg
│
├── src/
│   │
│   ├── services/
│   │   └── weatherApi.js
│   │
│   ├── utils/
│   │   ├── weatherIcons.js
│   │   └── weatherTheme.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
