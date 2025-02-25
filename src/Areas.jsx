import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./Estilos.css"; 

const Areas = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/mostrarAreas")
      .then((response) => {
        console.log("Estado de la respuesta:", response.status);
        console.log("Tipo de contenido:", response.headers.get("content-type"));

        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setAreas(data);
      })
      .catch((error) => console.error("Error al cargar las áreas:", error));
  }, []);

  const handleRowClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleDelete = () => {
    if (selectedIndex !== null && areas[selectedIndex]) {
      const id_area = areas[selectedIndex].id;
      console.log("Eliminando área con ID:", id_area);

      Axios.put("http://localhost:3002/eliminarArea", { id: id_area })
        .then((response) => {
          console.log("Respuesta del backend:", response.data);
          
          setAreas((prevAreas) => prevAreas.filter((ar) => ar.id !== id_area));

          setSelectedIndex(null);
        })
        .catch((error) => {
          console.error("Error al eliminar área:", error);
          if (error.response && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("Ocurrió un error al eliminar el área.");
          }
        });
    } else {
      console.error("No se ha seleccionado un área válida.");
    }
  };

  const handleModify = () => {
    if (selectedIndex !== null && areas[selectedIndex]) {
      const selectArea = areas[selectedIndex];
      console.log(selectArea);
      navigate("/modificar_area", {
        state: { area: selectArea},
      });
    }
  };

  return (
    <div className="container">
      <h1>Página de Áreas</h1>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {areas.length > 0 ? (
              areas.map((area, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(index)}
                  className={selectedIndex === index ? "selected-row" : ""}
                >
                  <td>{area.id}</td>
                  <td>{area.Nombre}</td>
                  <td>{area.Ubicacion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No hay áreas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <Link to="/add_areas" className="button">Agregar</Link>
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

export default Areas;
