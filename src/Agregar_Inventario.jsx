import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Estilos.css"; 

const AgregarInventario = ({ setInventario, areas }) => {
  const [nombreCorto, setNombreCorto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [serie, setSerie] = useState("");
  const [color, setColor] = useState("");
  const [fechaAdquisicion, setFechaAdquisicion] = useState("");
  const [tipoAdquisicion, setTipoAdquisicion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [areaSeleccionada, setAreaSeleccionada] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInventario((prev) => [
      ...prev,
      {
        nombreCorto,
        descripcion,
        serie,
        color,
        fechaAdquisicion,
        tipoAdquisicion,
        observaciones,
        areas: areas.filter((area) => area.nombre === areaSeleccionada), 
      },
    ]);
    navigate("/inventario");
  };

  return (
    <div className="container">
      <h1>Agregar Inventario</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombreCorto">Nombre Corto:</label>
        <input 
          id="nombreCorto" 
          type="text" 
          value={nombreCorto} 
          onChange={(e) => setNombreCorto(e.target.value)} 
          required 
        />

        <label htmlFor="descripcion">Descripción:</label>
        <input 
          id="descripcion" 
          type="text" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          required 
        />

        <label htmlFor="serie">Serie:</label>
        <input 
          id="serie" 
          type="text" 
          value={serie} 
          onChange={(e) => setSerie(e.target.value)} 
          required 
        />

        <label htmlFor="color">Color:</label>
        <input 
          id="color" 
          type="text" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          required 
        />

        <label htmlFor="fechaAdquisicion">Fecha de Adquisición:</label>
        <input 
          id="fechaAdquisicion" 
          type="date" 
          value={fechaAdquisicion} 
          onChange={(e) => setFechaAdquisicion(e.target.value)} 
          required 
        />

        <label htmlFor="tipoAdquisicion">Tipo de Adquisición:</label>
        <select 
          id="tipoAdquisicion" 
          value={tipoAdquisicion} 
          onChange={(e) => setTipoAdquisicion(e.target.value)} 
          required
        >
          <option value="">Seleccione...</option>
          <option value="Compra">Compra</option>
          <option value="Donación">Donación</option>
        </select>

        <label htmlFor="observaciones">Observaciones:</label>
        <input 
          id="observaciones" 
          type="text" 
          value={observaciones} 
          onChange={(e) => setObservaciones(e.target.value)} 
        />

        <label htmlFor="areaSeleccionada">Área:</label>
        <select 
          id="areaSeleccionada" 
          value={areaSeleccionada} 
          onChange={(e) => setAreaSeleccionada(e.target.value)} 
          required
        >
          <option value="">Seleccione...</option>
          {areas.length > 0 ? (
            areas.map((area, index) => (
              <option key={index} value={area.nombre}>
                {area.nombre}
              </option>
            ))
          ) : (
            <option disabled>No hay áreas disponibles</option>
          )}
        </select>

        <div className="button-container">
          <button type="submit" className="button agregar">Agregar</button>
          <button type="button" className="button" onClick={() => navigate("/inventario")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarInventario;
