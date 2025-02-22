import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Estilos.css"; // Se importa el CSS para aplicar los estilos

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
    <div className="container">
      <h1>Agregar Área</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="ubicacion">Ubicación:</label>
        <input
          id="ubicacion"
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />

        <div className="button-container">
          <button type="submit" className="button agregar">Agregar</button>
          <button type="button" className="button" onClick={() => navigate("/areas")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAreas;
