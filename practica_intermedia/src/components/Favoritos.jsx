import ListaSeries from "./ListaSeries";
import "../styles/Favoritos.css";

const Favoritos = ({ favorites, onShowDetail, onToggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="favorites-section">
        <h2 className="favorites-title">Mis Favoritos</h2>
        <p className="favorites-empty">No tienes series favoritas todavía</p>
      </div>
    );
  }

  return (
    <div className="favorites-section">
      <h2 className="favorites-title">Mis Favoritos ({favorites.length})</h2>
      <ListaSeries
        series={favorites}
        onShowDetail={onShowDetail}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
      />
    </div>
  );
};

export default Favoritos;
