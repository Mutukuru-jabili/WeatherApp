import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

export default function Header() {
  return (
    <header className="header">
      <h1 className="brand">🌤️ Weatherly</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}
