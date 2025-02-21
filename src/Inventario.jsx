import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Inventario = ({ inventario, setInventario, setSelectedIndex }) => {
  const [selectedIndex, setLocalSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (index) => {
    setLocalSelectedIndex(index === selectedIndex ? null : index);
    setSelectedIndex(index); // Guarda el índice globalmente para que ModificarInventario lo use
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Inventario</h1>

      <table border="1" style={{ margin: "auto", width: "90%", textAlign: "center" }}>
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
                style={{
                  backgroundColor: selectedIndex === index ? "lightblue" : "white",
                  cursor: "pointer",
                }}
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

      <div style={{ marginTop: "20px" }}>
        <button>
          <Link to="/agregar_inventario">Agregar</Link>
        </button>
        <button disabled={selectedIndex === null} onClick={handleModify}>
          Modificar
        </button>
        <button disabled={selectedIndex === null} onClick={handleDelete}>
          Eliminar
        </button>
        <button>
          <Link to="/">Regresar</Link>
        </button>
      </div>
    </div>
  );
};

export default Inventario;
