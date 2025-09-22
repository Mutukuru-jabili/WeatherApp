import React from "react";
import "../css/WeatherCard.css";

export default function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <div className="weather-card">
      <h2>{data.name || data.location}</h2>
      <div className="main-row">
        <div className="temp">{Math.round(data.main?.temp || data.temperature)}°C</div>
        <div className="meta">
          <div>🌡 Feels like: {Math.round(data.main?.feels_like)}°C</div>
          <div>💧 Humidity: {data.main?.humidity || data.humidity}%</div>
          <div>💨 Wind: {data.wind?.speed || data.windSpeed} m/s</div>
          <div>{data.weather ? data.weather[0].description : data.description}</div>
        </div>
      </div>
    </div>
  );
}
