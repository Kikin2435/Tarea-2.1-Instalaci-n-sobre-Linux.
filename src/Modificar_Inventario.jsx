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
  const [areasSeleccionadas, setAreasSeleccionadas] = useState(item?.areas || []);
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

  const handleAreaChange = (area) => {
    setAreasSeleccionadas((prev) =>
      prev.some((a) => a.nombre === area.nombre)
        ? prev.filter((a) => a.nombre !== area.nombre)
        : [...prev, area]
    );
  };

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
      areas: areasSeleccionadas,
    };

    const updatedInventario = [...inventario];
    updatedInventario[index] = updatedItem;
    setInventario(updatedInventario);
    navigate("/inventario");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
              <label>Áreas:</label>
              {areasDisponibles.length > 0 ? (
                areasDisponibles.map((area, i) => (
                  <div key={i}>
                    <input
                      type="checkbox"
                      checked={areasSeleccionadas.some((a) => a.nombre === area.nombre)}
                      onChange={() => handleAreaChange(area)}
                    />
                    <label>{area.nombre}</label>
                  </div>
                ))
              ) : (
                <p>No hay áreas disponibles</p>
              )}
            </div>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => navigate("/inventario")}>Cancelar</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ModificarInventario;
