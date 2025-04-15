import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Products.css";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/brands", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBrands(response.data);
        setFilteredBrands(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBrands(filtered);
  };

  const handleAddBrand = () => {
    navigate("/add-brands");
  };

  const handleEditBrand = (id) => {
    navigate(`/edit-brands/${id}`);
  };

  const handleDeleteBrand = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta marca?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/api/brands/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updated = brands.filter((brand) => brand.id !== id);
        setBrands(updated);
        setFilteredBrands(updated);
        alert("Marca eliminada correctamente.");
      } catch (error) {
        console.error("Error al eliminar la marca:", error);
        alert("No se pudo eliminar la marca.");
      }
    }
  };

  if (loading) return <div>Cargando marcas...</div>;

  return (
    <Layout>
    <div className="inventario-container">
      <header className="inventario-header">

        
      
        <h2>Catálogo / Marcas</h2>
        <div className="search-buttons">
          <button>Buscar por nombre</button>
        </div>
      </header>

      <div className="action-buttons">
        <button className="add-product" onClick={handleAddBrand}>Agregar Marca</button>
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar marca..."
            className="search-bar"
          />
        </div>
      </div>

      <table className="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredBrands.map((brand, index) => (
            <tr key={index} className="product-row">
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditBrand(brand.id)}>🖉</button>
                <button className="delete-btn" onClick={() => handleDeleteBrand(brand.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </Layout>
  );
};

export default Brands;
