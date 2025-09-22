import React from "react";
import "../css/MapView.css";

export default function MapView({ lat, lon }) {
  return (
    <div className="mapview">
      <h4>🗺️ Map</h4>
      {lat && lon ? (
        <iframe
          title="map"
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/view?key=${
            import.meta.env.VITE_MAPS_API_KEY
          }&center=${lat},${lon}&zoom=10`}
        ></iframe>
      ) : (
        <p>No location available.</p>
      )}
    </div>
  );
}
