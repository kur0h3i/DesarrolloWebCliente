import "../styles/Tarea.css";

export default function Tarea({ tarea, eliminar, toggleCompletada }) {
  return (
    <div className={`tarea-item ${tarea.completada ? "completada" : ""}`}>
      <input
        className="tarea-checkbox"
        type="checkbox"
        checked={tarea.completada}
        onChange={() => toggleCompletada(tarea.id)}
      />

      <p className={`tarea-texto ${tarea.completada ? "completada" : ""}`}>
        {tarea.texto}
      </p>

      <button
        className="tarea-eliminar"
        onClick={() => eliminar(tarea.id)}
        title="Eliminar tarea"
      >
        X
      </button>
    </div>
  );
}
