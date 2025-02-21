import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Página de Áreas</h1>

      <table border="1" style={{ margin: "auto", width: "50%", textAlign: "center" }}>
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
                style={{
                  backgroundColor: selectedIndex === index ? "lightblue" : "white",
                  cursor: "pointer",
                }}
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

      <div style={{ marginTop: "20px" }}>
        <button>
          <Link to="/add_areas">Agregar</Link>
        </button>
        <button disabled={selectedIndex === null} onClick={handleModify}>
          Modificar
        </button>
        <button disabled={selectedIndex === null} onClick={handleDelete}>
          Eliminar
        </button>
        <button>
            <Link to="/">Regresar</Link>
        </button>
      </div>
    </div>
  );
};

export default Areas;
