import React, { useState } from "react";
import "../css/SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  return (
    <form
      className="searchbar"
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim()) return;
        onSearch(q);
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="🔍 Search city..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
