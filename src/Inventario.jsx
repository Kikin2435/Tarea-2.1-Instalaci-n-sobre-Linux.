import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Estilos.css"; // Importa los estilos generales

const Inventario = ({ inventario, setInventario, setSelectedIndex }) => {
  const [selectedIndex, setLocalSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (index) => {
    setLocalSelectedIndex(index === selectedIndex ? null : index);
    setSelectedIndex(index);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedInventario = inventario.filter((_, index) => index !== selectedIndex);
      setInventario(updatedInventario);
      setLocalSelectedIndex(null);
      setSelectedIndex(null);
    }
  };

  const handleModify = () => {
    if (selectedIndex !== null) {
      navigate("/modificar_inventario", {
        state: { item: inventario[selectedIndex], index: selectedIndex },
      });
    }
  };

  return (
    <div className="container">
      <h1>Inventario</h1>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Serie</th>
              <th>Color</th>
              <th>Fecha de Adquisición</th>
              <th>Tipo de Adquisición</th>
              <th>Observaciones</th>
              <th>Áreas</th>
            </tr>
          </thead>
          <tbody>
            {inventario.length > 0 ? (
              inventario.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(index)}
                  className={selectedIndex === index ? "selected-row" : ""}
                >
                  <td>{item.nombreCorto || "—"}</td>
                  <td>{item.descripcion || "—"}</td>
                  <td>{item.serie || "—"}</td>
                  <td>{item.color || "—"}</td>
                  <td>{item.fechaAdquisicion || "—"}</td>
                  <td>{item.tipoAdquisicion || "—"}</td>
                  <td>{item.observaciones || "—"}</td>
                  <td>{item.areas?.filter(a => a.nombre).map(a => a.nombre).join(", ") || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay elementos en el inventario</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <Link to="/agregar_inventario" className="button">Agregar</Link>
        <button className="button" disabled={selectedIndex === null} onClick={handleModify}>
          Modificar
        </button>
        <button className="button" disabled={selectedIndex === null} onClick={handleDelete}>
          Eliminar
        </button>
        <Link to="/" className="button">Regresar</Link>
      </div>
    </div>
  );
};

export default Inventario;
