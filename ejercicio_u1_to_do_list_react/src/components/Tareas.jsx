import Tarea from "./Tarea";
import "../styles/Tareas.css";

export default function Tareas({ tareas, eliminar, toggleCompletada }) {
  const tareasCompletadas = tareas.filter((t) => t.completada).length;
  const tareasPendientes = tareas.length - tareasCompletadas;

  return (
    <div className="tareas-container">
      <div className="tareas-lista">
        {tareas.map((tarea) => (
          <Tarea
            key={tarea.id}
            tarea={tarea}
            eliminar={eliminar}
            toggleCompletada={toggleCompletada}
          />
        ))}
      </div>

      <div className="tareas-estadisticas">
        <div className="tareas-estadisticas-item">
          <p>Pendientes:</p>
          <p className="tareas-estadisticas-numero">{tareasPendientes}</p>
        </div>
        <div className="tareas-estadisticas-item">
          <p>Completadas:</p>
          <p className="tareas-estadisticas-numero">{tareasCompletadas}</p>
        </div>
        <div className="tareas-estadisticas-item">
          <p>Progreso:</p>
          <p className="tareas-estadisticas-numero">
            {tareas.length > 0
              ? Math.round((tareasCompletadas / tareas.length) * 100)
              : 0}
            %
          </p>
        </div>
      </div>
    </div>
  );
}
