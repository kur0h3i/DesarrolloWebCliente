import "../styles/TarjetaSerie.css";

const TarjetaSerie = ({
  serie,
  onShowDetail,
  onToggleFavorite,
  isFavorite,
}) => {
  const imageUrl =
    serie.show?.image?.medium ||
    serie.image?.medium ||
    "https://via.placeholder.com/210x295?text=No+Image";
  const name = serie.show?.name || serie.name;

  return (
    <div className="serie-card">
      <img
        src={imageUrl}
        alt={name}
        className="serie-image"
        onClick={() => onShowDetail(serie.show || serie)}
      />
      <div className="serie-info">
        <h3
          className="serie-title"
          onClick={() => onShowDetail(serie.show || serie)}
        >
          {name}
        </h3>
        <button
          className={`favorite-btn ${isFavorite ? "is-favorite" : ""}`}
          onClick={() => onToggleFavorite(serie.show || serie)}
          title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};

export default TarjetaSerie;
