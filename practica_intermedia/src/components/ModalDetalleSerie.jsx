import { useEffect } from "react";
import "../styles/ModalDetalleSerie.css";

const ModalDetalleSerie = ({
  serie,
  onClose,
  onToggleFavorite,
  isFavorite,
}) => {
  useEffect(() => {
    // Prevenir scroll cuando el modal está abierto
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!serie) return null;

  const imageUrl =
    serie.image?.original ||
    serie.image?.medium ||
    "https://via.placeholder.com/400x600?text=No+Image";

  // Limpiar HTML de la descripción
  const cleanSummary = serie.summary
    ? serie.summary.replace(/<[^>]*>/g, "")
    : "No hay descripción disponible";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <img src={imageUrl} alt={serie.name} />
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{serie.name}</h2>

            <button
              className={`modal-favorite-btn ${
                isFavorite ? "is-favorite" : ""
              }`}
              onClick={() => onToggleFavorite(serie)}
            >
              {isFavorite ? "★ Quitar de favoritos" : "☆ Añadir a favoritos"}
            </button>

            <div className="modal-details">
              {serie.genres && serie.genres.length > 0 && (
                <p>
                  <strong>Géneros:</strong> {serie.genres.join(", ")}
                </p>
              )}

              {serie.premiered && (
                <p>
                  <strong>Estreno:</strong> {serie.premiered}
                </p>
              )}

              {serie.status && (
                <p>
                  <strong>Estado:</strong> {serie.status}
                </p>
              )}

              {serie.rating?.average && (
                <p>
                  <strong>Valoración:</strong> {serie.rating.average}/10
                </p>
              )}

              {serie.network?.name && (
                <p>
                  <strong>Cadena:</strong> {serie.network.name}
                </p>
              )}

              {serie.language && (
                <p>
                  <strong>Idioma:</strong> {serie.language}
                </p>
              )}
            </div>

            <div className="modal-summary">
              <h3>Sinopsis</h3>
              <p>{cleanSummary}</p>
            </div>

            {serie.officialSite && (
              <a
                href={serie.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="official-site-link"
              >
                Sitio oficial ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalleSerie;
