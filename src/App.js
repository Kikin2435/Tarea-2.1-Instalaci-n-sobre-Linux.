import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";
import Inventario from "./Inventario";
import Areas from "./Areas";
import AddAreas from "./Add_Areas";
import ModificarArea from "./Modificar_Area";
import AgregarInventario from "./Agregar_Inventario";
import ModificarInventario from "./Modificar_Inventario";

function App() {
  const [areas, setAreas] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Función para obtener las áreas disponibles
  const obtenerAreas = () => {
    return Promise.resolve(areas);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        
        {/* Rutas para Áreas */}
        <Route path="/areas" element={<Areas areas={areas} setAreas={setAreas} />} />
        <Route path="/add_areas" element={<AddAreas setAreas={setAreas} />} />
        <Route path="/modificar_area" element={<ModificarArea areas={areas} setAreas={setAreas} />} />
        
        {/* Rutas para Inventario */}
        <Route path="/inventario" element={<Inventario inventario={inventario} setInventario={setInventario} setSelectedIndex={setSelectedIndex} />} />
        <Route path="/agregar_inventario" element={<AgregarInventario setInventario={setInventario} areas={areas} />} />
        <Route 
          path="/modificar_inventario" 
          element={
            <ModificarInventario 
              inventario={inventario} 
              setInventario={setInventario} 
              selectedIndex={selectedIndex} 
              obtenerAreas={obtenerAreas} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
