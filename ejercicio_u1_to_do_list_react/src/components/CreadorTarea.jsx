import { useState } from "react";
import "../styles/CreadorTarea.css";

export default function CreadorTarea({ agregar }) {
  const [texto, setTexto] = useState("");

  const manejarAgregar = () => {
    if (texto.trim()) {
      const nuevaTarea = {
        id: Date.now(),
        texto: texto.trim(),
        completada: false,
      };
      agregar(nuevaTarea);
      setTexto("");
    }
  };

  return (
    <div className="creador-tarea-container">
      <input
        className="creador-tarea-input"
        type="text"
        placeholder="Escribe una nueva tarea..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button className="creador-tarea-btn" onClick={manejarAgregar}>
        Agregar
      </button>
    </div>
  );
}
