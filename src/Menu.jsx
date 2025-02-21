import { Link } from "react-router-dom";
import "./styles.css";

const Menu = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Menú</h1>
      <button>
        <Link to="/inventario">Inventario</Link>
      </button>
      <button>
        <Link to="/areas">Áreas</Link>
      </button>
    </div>
  );
};

export default Menu;
