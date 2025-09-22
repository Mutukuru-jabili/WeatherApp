import React from "react";
import ForecastItem from "./ForecastItem";
import "../css/ForecastList.css";

export default function ForecastList({ days }) {
  if (!days || days.length === 0) return null;
  return (
    <div className="forecast-list">
      <h3>📅 7-Day Forecast</h3>
      <div className="forecast-grid">
        {days.map((d, idx) => (
          <ForecastItem key={idx} data={d} />
        ))}
      </div>
    </div>
  );
}
