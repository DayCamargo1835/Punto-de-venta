import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import EditUser from "./components/Edit_User";

import Products from "./components/Products";
import AddProduct from "./components/AddProduct"; 
import EditProduct from "./components/EditProduct"; 

import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";

import Brand from "./components/Brand";
import AddBrand from "./components/Add_Brand";
import EditBrand from "./components/Edit_Brand";
import ReportesVentas from "./components/ReporteVentas";

import Suppliers from "./components/Supplier";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirección a login desde la raíz */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Paneles */}
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Productos */}
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />

        {/* Marcas */}
        <Route path="/brands" element={<Brand/>} />
        <Route path="/add-brands" element={<AddBrand />} />
        <Route path="/edit-brands/:id" element={<EditBrand />} />

       


        <Route path="/users" element={<User />} />
        <Route path="/edit-users/:id" element={<EditUser />} />

        <Route path="/reportes" element={<ReportesVentas />} />
      </Routes>
    </Router>
  );
}

export default App;

