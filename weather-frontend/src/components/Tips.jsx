import React from "react";
import "../css/Tips.css";

export default function Tips({ weather }) {
  if (!weather) return null;

  const tips = [];
  if (weather.main?.temp > 30) tips.push("🥵 Stay hydrated and avoid peak sun hours.");
  if (weather.rain || weather.snow) tips.push("🌧 Carry an umbrella.");
  if (weather.wind?.speed > 15) tips.push("💨 Be cautious of strong winds.");

  return (
    <div className="tips">
      <h4>💡 Weather Tips</h4>
      <ul>{tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  );
}
