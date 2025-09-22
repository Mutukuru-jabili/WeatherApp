import React from "react";
import "../css/ForecastItem.css";

export default function ForecastItem({ data }) {
  return (
    <div className="forecast-item">
      <div className="date">{new Date(data.dt * 1000).toLocaleDateString()}</div>
      <div className="icon">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
      </div>
      <div className="temps">
        {Math.round(data.temp.min)}° / {Math.round(data.temp.max)}°
      </div>
      <p>{data.weather[0].description}</p>
    </div>
  );
}
