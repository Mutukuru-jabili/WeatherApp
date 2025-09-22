import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/App.css";

export default function Navbar() {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove login info
    navigate("/signin");
    window.location.reload(); // force refresh UI
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-item">
          Home
        </Link>
        {user && (
          <>
            <Link to="/profile" className="nav-item">
              Profile
            </Link>
            <Link to="/settings" className="nav-item">
              Settings
            </Link>
          </>
        )}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-welcome">Hi, {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="nav-item">
              Sign In
            </Link>
            <Link to="/signup" className="nav-item">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
