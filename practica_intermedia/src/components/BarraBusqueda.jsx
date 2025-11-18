import { useState, useEffect } from "react";
import "../styles/BarraBusqueda.css";

const BarraBusqueda = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Búsqueda dinámica cuando cambia el query
  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-form">
        <input
          type="text"
          placeholder="Buscar series..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default BarraBusqueda;
