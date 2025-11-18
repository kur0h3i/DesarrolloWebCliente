import { useState, useEffect } from "react";
import BarraBusqueda from "./components/BarraBusqueda";
import ListaSeries from "./components/ListaSeries";
import ModalDetalleSerie from "./components/ModalDetalleSerie";
import Filtros from "./components/Filtros";
import { getAllShows } from "./utils/apiTVMaze";
import { useFavorites } from "./utils/useFavoritos";
import "./styles/App.css";

function App() {
  const [series, setSeries] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ favorite: "all", genre: "all" });
  const [sortBy, setSortBy] = useState("default");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Cargar todas las series al iniciar
  useEffect(() => {
    const loadAllShows = async () => {
      setLoading(true);
      setError(null);
      try {
        const allShows = await getAllShows();
        setAllSeries(allShows);
        setSeries(allShows);
        setFilteredSeries(allShows);
      } catch (err) {
        setError("Error al cargar las series. Por favor, recarga la página.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAllShows();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      // Si el campo está vacío, mostrar todas las series
      setSeries(allSeries);
      return;
    }

    // Búsqueda local en las series cargadas
    const queryLower = query.toLowerCase();
    const filtered = allSeries.filter((serie) => {
      const name = serie.name?.toLowerCase() || "";
      const summary = serie.summary?.toLowerCase() || "";
      const genres = serie.genres?.join(" ").toLowerCase() || "";

      return (
        name.includes(queryLower) ||
        summary.includes(queryLower) ||
        genres.includes(queryLower)
      );
    });

    setSeries(filtered);
  };

  const handleShowDetail = (serie) => {
    setSelectedSerie(serie);
  };

  const handleCloseModal = () => {
    setSelectedSerie(null);
  };

  // Aplicar filtros y ordenamiento cuando cambian los favoritos o las series
  useEffect(() => {
    let filtered = [...series];

    // Filtrar por favoritos
    if (filters.favorite === "favorites") {
      filtered = filtered.filter((serie) =>
        favorites.some((fav) => fav.id === serie.id)
      );
    } else if (filters.favorite === "non-favorites") {
      filtered = filtered.filter(
        (serie) => !favorites.some((fav) => fav.id === serie.id)
      );
    }

    // Filtrar por género
    if (filters.genre !== "all") {
      filtered = filtered.filter(
        (serie) => serie.genres && serie.genres.includes(filters.genre)
      );
    }

    // Ordenar
    if (sortBy !== "default") {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "rating-desc":
            return (b.rating?.average || 0) - (a.rating?.average || 0);
          case "rating-asc":
            return (a.rating?.average || 0) - (b.rating?.average || 0);
          case "name-asc":
            return (a.name || "").localeCompare(b.name || "");
          case "name-desc":
            return (b.name || "").localeCompare(a.name || "");
          case "year-desc":
            return (b.premiered || "").localeCompare(a.premiered || "");
          case "year-asc":
            return (a.premiered || "").localeCompare(b.premiered || "");
          default:
            return 0;
        }
      });
    }

    setFilteredSeries(filtered);
  }, [favorites, series, filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title-container">
          <img
            src="/tv-icon-sign-symbol-design-free-png-2599499549.png"
            alt="TV Icon"
            className="app-logo"
          />
          <h1>TV Series Finder</h1>
        </div>
        <p className="app-subtitle">Encuentra y guarda tus series favoritas</p>
      </header>

      <main className="app-main">
        <BarraBusqueda onSearch={handleSearch} />

        {loading && <p className="loading-message">Cargando series...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <>
            <Filtros
              series={allSeries}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
            <section className="search-results">
              <h2 className="section-title">
                Series ({filteredSeries.length})
              </h2>
              <ListaSeries
                series={filteredSeries}
                onShowDetail={handleShowDetail}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            </section>
          </>
        )}
      </main>

      {selectedSerie && (
        <ModalDetalleSerie
          serie={selectedSerie}
          onClose={handleCloseModal}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(selectedSerie.id)}
        />
      )}
    </div>
  );
}

export default App;
