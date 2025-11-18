import TarjetaSerie from "./TarjetaSerie";
import "../styles/ListaSeries.css";

const ListaSeries = ({ series, onShowDetail, onToggleFavorite, favorites }) => {
  const isFavorite = (serieId) => {
    return favorites.some((fav) => fav.id === serieId);
  };

  if (!series || series.length === 0) {
    return null;
  }

  return (
    <div className="series-list">
      {series.map((serie) => {
        const serieData = serie.show || serie;
        return (
          <TarjetaSerie
            key={serieData.id}
            serie={serie}
            onShowDetail={onShowDetail}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite(serieData.id)}
          />
        );
      })}
    </div>
  );
};

export default ListaSeries;
