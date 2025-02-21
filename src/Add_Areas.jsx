import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAreas = ({ setAreas }) => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAreas((prevAreas) => [...prevAreas, { nombre, ubicacion }]);
    navigate("/areas"); // Redirige de vuelta a Áreas
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Agregar Área</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddAreas;
