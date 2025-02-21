import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ModificarInventario = ({ inventario, setInventario, obtenerAreas }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item, index } = location.state || {};

  const [nombre, setNombre] = useState(item?.nombreCorto || "");
  const [descripcion, setDescripcion] = useState(item?.descripcion || "");
  const [serie, setSerie] = useState(item?.serie || "");
  const [color, setColor] = useState(item?.color || "");
  const [fechaAdquisicion, setFechaAdquisicion] = useState(item?.fechaAdquisicion || "");
  const [tipoAdquisicion, setTipoAdquisicion] = useState(item?.tipoAdquisicion || "");
  const [observaciones, setObservaciones] = useState(item?.observaciones || "");
  const [areaSeleccionada, setAreaSeleccionada] = useState(item?.areas?.[0]?.nombre || ""); 
  const [areasDisponibles, setAreasDisponibles] = useState([]);

  useEffect(() => {
    const cargarAreas = async () => {
      if (typeof obtenerAreas === "function") {
        const areas = await obtenerAreas();
        setAreasDisponibles(areas);
      } else {
        console.error("Error: obtenerAreas no es una función.");
      }
    };
    cargarAreas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === undefined) return;

    const updatedItem = {
      nombreCorto: nombre,
      descripcion,
      serie,
      color,
      fechaAdquisicion,
      tipoAdquisicion,
      observaciones,
      areas: areasDisponibles.filter((area) => area.nombre === areaSeleccionada),
    };

    const updatedInventario = [...inventario];
    updatedInventario[index] = updatedItem;
    setInventario(updatedInventario);
    navigate("/inventario");
  };

  return (
    <div className="container">
      {index === undefined ? (
        <h1>Error: No hay datos para modificar</h1>
      ) : (
        <>
          <h1>Modificar Inventario</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
              <label>Descripción:</label>
              <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            </div>
            <div>
              <label>Serie:</label>
              <input type="text" value={serie} onChange={(e) => setSerie(e.target.value)} required />
            </div>
            <div>
              <label>Color:</label>
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
            </div>
            <div>
              <label>Fecha de Adquisición:</label>
              <input type="date" value={fechaAdquisicion} onChange={(e) => setFechaAdquisicion(e.target.value)} required />
            </div>
            <div>
              <label>Tipo de Adquisición:</label>
              <select value={tipoAdquisicion} onChange={(e) => setTipoAdquisicion(e.target.value)} required>
                <option value="">Selecciona un tipo</option>
                <option value="Compra">Compra</option>
                <option value="Donación">Donación</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label>Observaciones:</label>
              <input type="text" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
            </div>
            <div>
              <label>Área:</label>
              <select value={areaSeleccionada} onChange={(e) => setAreaSeleccionada(e.target.value)} required>
                <option value="">Selecciona un área</option>
                {areasDisponibles.length > 0 ? (
                  areasDisponibles.map((area, i) => (
                    <option key={i} value={area.nombre}>
                      {area.nombre}
                    </option>
                  ))
                ) : (
                  <option disabled>No hay áreas disponibles</option>
                )}
              </select>
            </div>
            <div className="button-container">
              <button type="submit" className="button">Guardar Cambios</button>
              <button type="button" className="button" onClick={() => navigate("/inventario")}>Cancelar</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ModificarInventario;
