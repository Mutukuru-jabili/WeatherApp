import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
// ... other imports

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />           {/* <-- single global navbar */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
             <Route path="/profile" element={<UserProfile />} />
            {/* other routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
