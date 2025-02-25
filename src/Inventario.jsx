import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./Estilos.css"; // Importa los estilos generales

const Inventario = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [libros, setLibros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/mostrarLibros")
    .then((response) => {
      console.log("Estado de la respuesta: ", response.status);
      console.log("Tipo de contenido:", response.headers.get("content-type"));

      return response.json();
    })
    .then((data) => {
      console.log("Datos recibidos!", data);
      setLibros(data);
    })
    .catch((error) => console.error("Error al cargar los libros: ", error));
  }, []);

  const handleRowClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const id_libro = libros[selectedIndex].id;

      Axios.put("http://localhost:3002/eliminarLibro", {
        id: id_libro,
      })
      .then((response) => {
        console.log("Respuesta del backend: ", response.data);

        setLibros((prevLibros) => prevLibros.filter((ar) => ar.id !== id_libro));

        setSelectedIndex(null);
      })
      .catch((error) => {
        console.error("Error al eliminar libro: ", error);
        if(error.response && error.response.data.message){
          alert(error.response.data.message);
        } else {
          alert("Ocurrio un error al eliminar el libro!");
        }
      })
    } else {
      console.error("No se ha seleccionado un libro valido!");
    }
  };

  const handleModify = () => {
    if (selectedIndex !== null) {
      const select = libros[selectedIndex];
      navigate("/modificar_inventario", {
        state: {item: select}
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
              <th>ID</th>
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
            {libros.length > 0 ? (
              libros.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(index)}
                  className={selectedIndex === index ? "selected-row" : ""}
                >
                  <td>{item.id}</td>
                  <td>{item.NombreCorto || "—"}</td>
                  <td>{item.Descripcion || "—"}</td>
                  <td>{item.Serie || "—"}</td>
                  <td>{item.Color || "—"}</td>
                  <td>{item.FechaAdquisicion || "—"}</td>
                  <td>{item.TipoAdquisicion || "—"}</td>
                  <td>{item.Observaciones || "—"}</td>
                  <td>{item.Areas || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No hay elementos en el inventario</td>
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