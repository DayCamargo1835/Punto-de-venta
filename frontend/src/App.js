import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products"; // Pantalla de productos después del login
import Dashboard from "./components/Dashboard"; // Otra pantalla si es necesario

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Redirigir la raíz "/" al Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ Definir las rutas principales */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Ruta protegida para Productos (después del login) */}
        <Route path="/products" element={<Products />} />

        {/* ✅ Ruta protegida para Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
