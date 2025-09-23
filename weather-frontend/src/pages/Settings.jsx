import React, { useEffect, useState } from "react";
import {
  getFavoriteLocations,
  saveFavoriteLocation,
  updateFavoriteLocation,
  deleteFavoriteLocation,
} from "../api/weatherApi";
import "../css/Settings.css";

export default function Settings() {
  const [operation, setOperation] = useState("read"); // insert | read | update | delete
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // form fields
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFavoriteLocations();
      console.log("Fetched favorites:", data);
      setList(data);
    } catch (e) {
      console.error("Fetch failed:", e);
      setError("Failed to fetch favorite locations.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setCity("");
    setCountry("");
    setSelectedId(null);
    setMessage(null);
    setError(null);
  };

  // --- CRUD handlers ---
  const handleInsert = async (e) => {
    e.preventDefault();
    if (!name.trim() || !city.trim()) {
      setError("Name and City are required.");
      return;
    }
    try {
      await saveFavoriteLocation({ name, city, country });
      setMessage("Inserted successfully.");
      resetForm();
      await fetchList();
      setOperation("read");
    } catch (e) {
      console.error(e);
      setError("Insert failed.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      setError("Select a location to update.");
      return;
    }
    if (!name.trim() || !city.trim()) {
      setError("Name and City are required.");
      return;
    }
    try {
      await updateFavoriteLocation(selectedId, { name, city, country });
      setMessage("Updated successfully.");
      resetForm();
      await fetchList();
      setOperation("read");
    } catch (e) {
      console.error(e);
      setError("Update failed.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      setError("Select a location to delete.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteFavoriteLocation(selectedId);
      setMessage("Deleted successfully.");
      resetForm();
      await fetchList();
      setOperation("read");
    } catch (e) {
      console.error(e);
      setError("Delete failed.");
    }
  };

  const onSelectForEdit = (loc) => {
    // Adjust this ID depending on backend JSON
    setSelectedId(loc.id ?? loc.favoriteId ?? loc.favorite_location_id);
    setName(loc.name || "");
    setCity(loc.city || "");
    setCountry(loc.country || "");
  };

  return (
    <div className="settings-container">
      <h2>Settings — Favorite Locations</h2>

      <div className="settings-controls">
        <label>Operation:</label>
        <select
          value={operation}
          onChange={(e) => {
            setOperation(e.target.value);
            resetForm();
          }}
        >
          <option value="read">Read (List)</option>
          <option value="insert">Insert</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
        <button onClick={fetchList} className="btn small">
          Refresh
        </button>
      </div>

      {message && <div className="msg success">{message}</div>}
      {error && <div className="msg error">{error}</div>}

      <div className="settings-main">
        {/* LEFT = LIST */}
        <div className="left">
          <h3>Saved Locations</h3>
          {loading ? (
            <p>Loading...</p>
          ) : list.length === 0 ? (
            <p>No favorite locations yet.</p>
          ) : (
            <ol className="location-list">
              {list.map((loc) => {
                const id = loc.id ?? loc.favoriteId ?? loc.favorite_location_id;
                return (
                  <li key={id}>
                    <div className="loc-row">
                      <div>
                        <strong>{loc.name || loc.city}</strong>
                        <div className="meta">
                          {loc.city}
                          {loc.country ? `, ${loc.country}` : ""}
                        </div>
                      </div>
                      <div className="row-actions">
                        <button
                          className="btn tiny"
                          onClick={() => {
                            onSelectForEdit(loc);
                            setOperation("update");
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn tiny danger"
                          onClick={() => {
                            onSelectForEdit(loc);
                            setOperation("delete");
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* RIGHT = FORM */}
        <div className="right">
          {operation === "read" && (
            <h4>Use the list on the left. Click Refresh to reload.</h4>
          )}

          {operation === "insert" && (
            <form onSubmit={handleInsert} className="crud-form">
              <h3>Insert Location</h3>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Home"
              />
              <label>City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Delhi"
              />
              <label>Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g., India"
              />
              <button type="submit" className="btn">
                Insert
              </button>
            </form>
          )}

          {operation === "update" && (
            <form onSubmit={handleUpdate} className="crud-form">
              <h3>Update Location</h3>
              <label>Select location</label>
              <select
                value={selectedId || ""}
                onChange={(e) => {
                  const id = e.target.value;
                  const loc = list.find(
                    (x) =>
                      String(x.id || x.favoriteId || x.favorite_location_id) ===
                      id
                  );
                  if (loc) onSelectForEdit(loc);
                }}
              >
                <option value="">-- choose --</option>
                {list.map((loc) => {
                  const id =
                    loc.id ?? loc.favoriteId ?? loc.favorite_location_id;
                  return (
                    <option key={id} value={id}>
                      {loc.name || loc.city}
                    </option>
                  );
                })}
              </select>

              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
              <label>City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
              <label>Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <button type="submit" className="btn">
                Update
              </button>
            </form>
          )}

          {operation === "delete" && (
            <form onSubmit={handleDelete} className="crud-form">
              <h3>Delete Location</h3>
              <label>Select location</label>
              <select
                value={selectedId || ""}
                onChange={(e) => {
                  const id = e.target.value;
                  const loc = list.find(
                    (x) =>
                      String(x.id || x.favoriteId || x.favorite_location_id) ===
                      id
                  );
                  if (loc) onSelectForEdit(loc);
                }}
              >
                <option value="">-- choose --</option>
                {list.map((loc) => {
                  const id =
                    loc.id ?? loc.favoriteId ?? loc.favorite_location_id;
                  return (
                    <option key={id} value={id}>
                      {loc.name || loc.city}
                    </option>
                  );
                })}
              </select>
              <button type="submit" className="btn danger">
                Delete
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
