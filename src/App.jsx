import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Inventario from "./Inventario";
import Areas from "./Areas";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/areas" element={<Areas />} />
      </Routes>
    </Router>
  );
};

export default App;
