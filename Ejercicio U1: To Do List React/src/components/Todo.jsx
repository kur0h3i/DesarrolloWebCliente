import { useState } from "react";
import CreadorTarea from "./CreadorTarea";
import Tareas from "./Tareas";
import "../styles/Todo.css";

export default function Todo() {
  const [tareas, setTareas] = useState([]);

  const agregarTareas = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]);
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List React</h1>

      <div className="todo-input-section">
        <CreadorTarea agregar={agregarTareas} />
      </div>

      <Tareas
        tareas={tareas}
        eliminar={eliminarTarea}
        toggleCompletada={toggleCompletada}
      />
    </div>
  );
}
