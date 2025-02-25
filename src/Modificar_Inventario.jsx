import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";

const ModificarInventario = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {}; 
  const [nombre, setNombre] = useState(item?.NombreCorto || "");
  const [descripcion, setDescripcion] = useState(item?.Descripcion || "");
  const [serie, setSerie] = useState(item?.Serie || "");
  const [color, setColor] = useState(item?.Color || "");
  const [fechaAdquisicion, setFechaAdquisicion] = useState(item?.FechaAdquisicion || "");
  const [tipoAdquisicion, setTipoAdquisicion] = useState(item?.TipoAdquisicion || "");
  const [observaciones, setObservaciones] = useState(item?.Observaciones || "");
  const [areaSeleccionada, setAreaSeleccionada] = useState(item?.Areas || "");
  const [areasDisponibles, setAreasDisponibles] = useState([]);


  useEffect(() => {
    const cargarAreas = async () => {
      try {
        const response = await fetch(" http://localhost:3002/listaAreas");
        const areas = await response.json();
        setAreasDisponibles(areas);
      } catch (error) {
        console.error("Error al cargar las áreas:", error);
      }
    };
    cargarAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const updatedItem = {
      id: item.id, 
      NombreCorto: nombre,
      Descripcion: descripcion,
      Serie: serie,
      Color: color,
      FechaAdquisicion: fechaAdquisicion,
      TipoAdquisicion: tipoAdquisicion,
      Observaciones: observaciones,
      areaNombre: areaSeleccionada,
    };


    try {
      const response = await Axios.put("http://localhost:3002/modificarLibro", updatedItem);
      console.log("Libro actualizado con éxito:", response.data);
      navigate("/inventario");
    } catch (error) {
      console.error("Error al modificar el libro:", error);
    }
  };

  return (
    <div className="container">
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
            {areasDisponibles.map((area, i) => (
              <option key={i} value={area.Nombre}>
                {area.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <button type="submit" className="button">Guardar Cambios</button>
          <button type="button" className="button" onClick={() => navigate("/inventario")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ModificarInventario;
