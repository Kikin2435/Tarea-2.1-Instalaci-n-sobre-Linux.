import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";

const ModificarArea = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { area } = location.state || {}; // Datos de la fila seleccionada

  const [nombre, setNombre] = useState(area?.Nombre || "");
  const [ubicacion, setUbicacion] = useState(area?.Ubicacion || "");

  const handleUpdate = (e) => {

    e.preventDefault();

    Axios.put("http://localhost:3002/modificarArea", {
      id: area.id,
      Nombre: nombre,
      Ubicacion: ubicacion,
    })
    .then((response) => {
      console.log("Area modificada con exito!");
      navigate("/areas");
    }).catch((error) => {
      console.log("Error al modificar aera:", error);
    });
  };

  return (
    <div className="container">
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
        <div className="button-container">
          <button type="submit" className="button">Guardar Cambios</button>
          <button type="button" className="button" onClick={() => navigate("/areas")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModificarArea;
