import { Link } from "react-router-dom";
import "./Estilos.css"; // Importamos los estilos

const Menu = () => {
  return (
    <div className="container">
      <h1 className="titulo-menu">Menú Principal</h1>
      <div className="button-container">
        <Link to="/inventario" className="button menu">
          📦 Inventario
        </Link>
        <Link to="/areas" className="button menu">
          🏢 Áreas
        </Link>
      </div>
    </div>
  );
};

export default Menu;
