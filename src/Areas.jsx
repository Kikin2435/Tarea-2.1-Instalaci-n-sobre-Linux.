import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Estilos.css"; // Se importa el CSS global

const Areas = ({ areas, setAreas }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      setAreas(areas.filter((_, index) => index !== selectedIndex));
      setSelectedIndex(null);
    }
  };

  const handleModify = () => {
    if (selectedIndex !== null) {
      navigate("/modificar_area", {
        state: { index: selectedIndex, area: areas[selectedIndex] },
      });
    }
  };

  return (
    <div className="container">
      <h1>Página de Áreas</h1>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {areas.length > 0 ? (
              areas.map((area, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(index)}
                  className={selectedIndex === index ? "selected-row" : ""}
                >
                  <td>{area.nombre}</td>
                  <td>{area.ubicacion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No hay áreas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <Link to="/add_areas" className="button">Agregar</Link>
        <button className="button" disabled={selectedIndex === null} onClick={handleModify}>
          Modificar
        </button>
        <button className="button" disabled={selectedIndex === null} onClick={handleDelete}>
          Eliminar
        </button>
        <Link to="/" className="button">Regresar</Link>
      </div>
    </div>
  );
};

export default Areas;
