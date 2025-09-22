import React from "react";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Weatherly</p>
      <p>☁️ Powered by React + Spring Boot + OpenWeatherMap</p>
    </footer>
  );
}
