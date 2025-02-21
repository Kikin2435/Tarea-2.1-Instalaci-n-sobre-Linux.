import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ModificarArea = ({ areas, setAreas }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { index, area } = location.state || {}; // Datos de la fila seleccionada

  const [nombre, setNombre] = useState(area?.nombre || "");
  const [ubicacion, setUbicacion] = useState(area?.ubicacion || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedAreas = [...areas];
    updatedAreas[index] = { nombre, ubicacion };
    setAreas(updatedAreas);
    navigate("/areas"); // Volver a la tabla
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Modificar Área</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ubicación:</label>
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ModificarArea;
