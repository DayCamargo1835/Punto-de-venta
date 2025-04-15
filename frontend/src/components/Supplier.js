import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Products.css";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/suppliers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuppliers(response.data);
        setFilteredSuppliers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los proveedores:", error);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  const handleAddSupplier = () => {
    navigate("/add-supplier");
  };

  const handleEditSupplier = (id) => {
    navigate(`/edit-supplier/${id}`);
  };

  const handleDeleteSupplier = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este proveedor?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updated = suppliers.filter((supplier) => supplier.id !== id);
        setSuppliers(updated);
        setFilteredSuppliers(updated);
        alert("Proveedor eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        alert("No se pudo eliminar el proveedor.");
      }
    }
  };

  if (loading) return <div>Cargando proveedores...</div>;

  return (
    <Layout>
    <div className="inventario-container">
      <header className="inventario-header">
        <div className="navigation-buttons-compact">
          <button className="btn-nav-small" onClick={() => navigate(-1)}>⏪ Regresar</button>
          <button className="btn-nav-small" onClick={() => navigate("/admin-dashboard")}>🏠 Menú</button>
        </div>

        <h2>Catálogo / Proveedores</h2>
        <div className="search-buttons">
          <button>Buscar por nombre</button>
        </div>
      </header>

      <div className="action-buttons">
        <button className="add-product" onClick={handleAddSupplier}>Agregar Proveedor</button>
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar proveedor..."
            className="search-bar"
          />
        </div>
      </div>

      <table className="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.length === 0 ? (
            <tr>
              <td colSpan="6">No se encontraron proveedores.</td>
            </tr>
          ) : (
            filteredSuppliers.map((supplier, index) => (
              <tr key={index} className="product-row">
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditSupplier(supplier.id)}>🖉</button>
                  <button className="delete-btn" onClick={() => handleDeleteSupplier(supplier.id)}>🗑</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default Suppliers;
