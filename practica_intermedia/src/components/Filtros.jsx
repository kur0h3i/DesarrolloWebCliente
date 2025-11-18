import { useState, useMemo } from "react";
import "../styles/Filtros.css";

const Filtros = ({ series, onFilterChange, onSortChange }) => {
  const [favoriteFilter, setFavoriteFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Extraer géneros únicos de todas las series
  const genres = useMemo(() => {
    const allGenres = new Set();
    series.forEach((serie) => {
      if (serie.genres && Array.isArray(serie.genres)) {
        serie.genres.forEach((genre) => allGenres.add(genre));
      }
    });
    return Array.from(allGenres).sort();
  }, [series]);

  const handleFavoriteFilterChange = (e) => {
    const value = e.target.value;
    setFavoriteFilter(value);
    onFilterChange({ favorite: value, genre: genreFilter });
  };

  const handleGenreFilterChange = (e) => {
    const value = e.target.value;
    setGenreFilter(value);
    onFilterChange({ favorite: favoriteFilter, genre: value });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="favorite-filter">Favoritos:</label>
        <select
          id="favorite-filter"
          value={favoriteFilter}
          onChange={handleFavoriteFilterChange}
          className="filter-select"
        >
          <option value="all">Todas</option>
          <option value="favorites">Solo favoritas</option>
          <option value="non-favorites">No favoritas</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="genre-filter">Género:</label>
        <select
          id="genre-filter"
          value={genreFilter}
          onChange={handleGenreFilterChange}
          className="filter-select"
        >
          <option value="all">Todos los géneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-by">Ordenar:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="default">Por defecto</option>
          <option value="rating-desc">Valoración (mayor)</option>
          <option value="rating-asc">Valoración (menor)</option>
          <option value="name-asc">Nombre (A-Z)</option>
          <option value="name-desc">Nombre (Z-A)</option>
          <option value="year-desc">Año (más reciente)</option>
          <option value="year-asc">Año (más antiguo)</option>
        </select>
      </div>
    </div>
  );
};

export default Filtros;
