import "./App.css";
import Imagen from "./components/Imagen";
import Todo from "./components/Todo";

export default function App() {
  return (
    <>
      <Imagen nombre="Logo U-Tad" url="/img/logo.jpg" />
      <Todo />
    </>
  );
}
