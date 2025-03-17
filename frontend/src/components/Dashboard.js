import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <button
        onClick={() => {
          handleLogout();
          navigate("/login");
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;

