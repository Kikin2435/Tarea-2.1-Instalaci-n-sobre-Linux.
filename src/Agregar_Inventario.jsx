import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgregarInventario = ({ setInventario, areas }) => {
  const [nombreCorto, setNombreCorto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [serie, setSerie] = useState("");
  const [color, setColor] = useState("");
  const [fechaAdquisicion, setFechaAdquisicion] = useState("");
  const [tipoAdquisicion, setTipoAdquisicion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
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
        areas: areasSeleccionadas,
      },
    ]);
    navigate("/inventario");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Agregar Inventario</h1>
      <form onSubmit={handleSubmit}>
        <div><label>Nombre Corto: <input type="text" value={nombreCorto} onChange={(e) => setNombreCorto(e.target.value)} required /></label></div>
        <div><label>Descripción: <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required /></label></div>
        <div><label>Serie: <input type="text" value={serie} onChange={(e) => setSerie(e.target.value)} required /></label></div>
        <div><label>Color: <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required /></label></div>
        <div><label>Fecha de Adquisición: <input type="date" value={fechaAdquisicion} onChange={(e) => setFechaAdquisicion(e.target.value)} required /></label></div>
        <div><label>Tipo de Adquisición: <select value={tipoAdquisicion} onChange={(e) => setTipoAdquisicion(e.target.value)} required><option value="">Seleccione...</option><option value="Compra">Compra</option><option value="Donación">Donación</option></select></label></div>
        <div><label>Observaciones: <input type="text" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} /></label></div>
        <div>
          <label>Áreas:</label>
          {areas.map((area, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={area.nombre}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAreasSeleccionadas([...areasSeleccionadas, e.target.value]);
                  } else {
                    setAreasSeleccionadas(areasSeleccionadas.filter((a) => a !== e.target.value));
                  }
                }}
              />
              {area.nombre}
            </div>
          ))}
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AgregarInventario;
