import React from "react";
import "../styles/AdminPanel.css";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";


import {
  FaBoxOpen,
  FaTruck,
  FaUsers,
  FaMoneyBillAlt,
  FaChartBar,
  FaShoppingBag,
} from "react-icons/fa";

const modules = [
  { name: "Productos", icon: <FaShoppingBag size={40} />, path: "/products" },
  { name: "Marcas", icon: <FaBoxOpen size={40} />, path: "/brands" },
  { name: "Usuarios", icon: <FaUsers size={40} />, path: "/users" },
  { name: "Proveedores (Proximamente)", icon: <FaTruck size={40} />, path: "/suppliers" },
  { name: "Ventas (Proximamente)", icon: <FaMoneyBillAlt size={40} />, path: "/reportes" },
  { name: "Reportes (Proximamente)", icon: <FaChartBar size={40} />, path: "/reportes" },
  
];

export default function MenuAdmin() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Usuario";
  
    const handleLogout = () => {
      localStorage.clear(); // Limpia datos de sesión
      navigate("/login");
    };
  
    return (
      <Layout>
  
        {/* Grid de módulos */}
        <div className="admin-grid">
          {modules.map((mod, index) => (
            <Link key={index} to={mod.path} className="admin-card">
              <div className="admin-icon">{mod.icon}</div>
              <p>{mod.name}</p>
            </Link>
          ))}
        </div>
  

</Layout>
    );
  }

