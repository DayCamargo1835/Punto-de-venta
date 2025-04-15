// src/components/Layout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Layout.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Usuario";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const nombre = localStorage.getItem("nombre") || "Usuario";


  return (
    <div className="layout-container">
      <header className="admin-header">
      <h2>Bienvenido, {nombre}</h2>
        <div className="header-date">
    {new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
  </div>
      </header>

      <main className="layout-content">
        {children}
      </main>

      <footer className="admin-footer">
      <div className="navigation-buttons-compact">
          <button className="btn-nav-small" onClick={() => navigate(-1)}>⏪ Regresar</button>
          <button className="btn-nav-small" onClick={() => navigate("/admin-dashboard")}>🏠 Menú</button>
        </div>
        <button className="menu-logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </footer>
    </div>
  );
};

export default Layout;
