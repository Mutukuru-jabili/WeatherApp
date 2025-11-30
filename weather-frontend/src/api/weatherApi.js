import axios from "axios";

// ---------------- BACKEND API BASE ----------------
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8099/api";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// ---------------- WEATHER (FROM BACKEND) ----------------

// Get current weather
export async function fetchCurrentWeatherByCity(city) {
  const resp = await api.get(`/weather/current`, {
    params: { city },
  });
  return resp.data;
}

// Get forecast
export async function fetchForecastByCity(city) {
  const resp = await api.get(`/weather/forecast`, {
    params: { city },
  });
  return resp.data;
}

// Get alerts
export async function getAlerts(city) {
  const resp = await api.get(`/weather/alerts`, {
    params: { city },
  });
  return resp.data;
}

// ---------------- FAVORITE LOCATION CRUD ----------------

// Get all favorites
export async function getFavoriteLocations() {
  const resp = await api.get(`/favorites`);
  return resp.data;
}

// Save new favorite
export async function saveFavoriteLocation(payload) {
  const resp = await api.post(`/favorites`, payload);
  return resp.data;
}

// Delete favorite
export async function deleteFavoriteLocation(id) {
  const resp = await api.delete(`/favorites/${id}`);
  return resp.data;
}

// Update favorite
export async function updateFavoriteLocation(id, payload) {
  const resp = await api.put(`/favorites/${id}`, payload);
  return resp.data;
}
