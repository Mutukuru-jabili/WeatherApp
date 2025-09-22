// src/api/weatherApi.js
import axios from "axios";

// Backend (Spring Boot API)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8099/api";

// External Weather API (OpenWeatherMap or configured service)
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;

// Axios instance for backend
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// ---------------- WEATHER (from external API) ----------------
// these return response.data for easier consumption in components

export async function fetchCurrentWeatherByCity(city) {
  const resp = await axios.get(`${WEATHER_API_URL}/weather`, {
    params: {
      q: city,
      units: "metric",
      appid: WEATHER_API_KEY,
    },
  });
  return resp.data;
}

export async function fetchForecastByCity(city) {
  const resp = await axios.get(`${WEATHER_API_URL}/forecast`, {
    params: {
      q: city,
      units: "metric",
      appid: WEATHER_API_KEY,
    },
  });
  return resp.data;
}

// Alerts (this assumes backend or OneCall-compatible endpoint)
export async function getAlerts(city) {
  const resp = await api.get(`/weather/alerts`, { params: { city } });
  return resp.data;
}

// ---------------- FAVORITE LOCATIONS (backend CRUD) ----------------
// these call your backend (API_BASE + /favorites) and return resp.data

// Get all favorite locations
export async function getFavoriteLocations() {
  const resp = await api.get("/favorites");
  return resp.data;
}

// Save new favorite location
export async function saveFavoriteLocation(payload) {
  const resp = await api.post("/favorites", payload);
  return resp.data;
}

// Delete favorite location
export async function deleteFavoriteLocation(id) {
  const resp = await api.delete(`/favorites/${id}`);
  return resp.data;
}

// Update favorite location
export async function updateFavoriteLocation(id, payload) {
  const resp = await api.put(`/favorites/${id}`, payload);
  return resp.data;
}
