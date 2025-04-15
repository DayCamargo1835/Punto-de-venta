import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Products.css"
import { useNavigate } from "react-router-dom";  // Importa useNavigate
import Layout from "./Layout";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Estado para el texto de búsqueda
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para los productos filtrados
  const navigate = useNavigate(); // Usa useNavigate para la redirección

  useEffect(() => {
    
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product");
        setProductos(response.data); // Asignamos los productos
        setFilteredProducts(response.data); // Inicialmente, mostramos todos los productos
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        console.error("Detalles del error:", error.response ? error.response.data : error);
        setLoading(false);
      }
    };
    

    fetchProductos();
  }, []);

  // Filtrar productos cuando el usuario escribe en la barra de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);

    // Filtrar productos por nombre, código o categoría
    const filtered = productos.filter((producto) => {
      return (
        producto.name.toLowerCase().includes(value.toLowerCase()) ||
        producto.id.toString().includes(value) ||
        producto.category_id.toString().includes(value)
      );
    });

    setFilteredProducts(filtered); // Actualizamos los productos filtrados
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProductos(productos.filter((producto) => producto.id !== id));
        setFilteredProducts(filteredProducts.filter((producto) => producto.id !== id));
        alert("Producto eliminado exitosamente.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Error al eliminar el producto.");
      }
    }
  };

  const username = localStorage.getItem("username") || "Usuario";
  
    const handleLogout = () => {
      localStorage.clear(); // Limpia datos de sesión
      navigate("/login");
    };

  

  return (
    <Layout>
  
      
    <div className="inventario-container">
    
      <div className="inventario-header">
        

        

        <h2>Inventario / Productos</h2>
        
      </div>

      <div className="action-buttons">
        <button className="add-product" onClick={handleAddProduct}>Agregar Producto</button>
        <button className="excel-btn">Excel</button>
        <select className="show-rows">
          <option>Show 10 rows</option>
          <option>Show 20 rows</option>
          <option>Show 30 rows</option>
        </select>
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre, código o categoría..."
            className="search-bar"
          />
        </div>
      </div>

      <table className="productos-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Marca</th>
            <th>Precio U</th>
            <th>Stock</th>
            <th>Min. Stock</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((producto, index) => (
            <tr key={index} className="product-row">
              <td>{producto.id}</td>
              <td>{producto.name}</td>
              <td>{producto.brand.name}</td> {/* Mostrar nombre de la marca */}
              <td>{producto.price}</td>
              <td>{producto.stock}</td>
              <td>{producto.stock - 5}</td>
              <td>{producto.category.name}</td> {/* Mostrar nombre de la categoría */}
              <td>{producto.supplier.name}</td> {/* Mostrar nombre del proveedor */}
              <td>
                <button className="edit-btn" onClick={() => handleEditProduct(producto.id)}>🖉</button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(producto.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
    </Layout>  
  );
};

export default Inventario;
