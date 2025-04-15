import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Reportes.css";

const TotalVentas = () => {
  const [total, setTotal] = useState(null);

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchTotalVentas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/ganancia_semanal", config);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error al obtener el total de ventas:", error);
    }
  };

  useEffect(() => {
    fetchTotalVentas();
  }, []);

  return (
    <div className="reporte-contenedor">
      <h2>Total de Ventas</h2>
      <h3>Ganancia Total:</h3>
      <p className="ganancia">${total !== null ? total.toFixed(2) : "Cargando..."}</p>
    </div>
  );
};

export default TotalVentas;
