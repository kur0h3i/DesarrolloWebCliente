import "../styles/Imagen.css";

export default function Imagen({ nombre, url }) {
  return (
    <div className="imagen-container">
      <img className="imagen-logo" src={url} alt={nombre} loading="lazy" />
    </div>
  );
}
