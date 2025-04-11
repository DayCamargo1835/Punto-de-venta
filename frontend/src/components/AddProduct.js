import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/AddProduct.css";
import Layout from "./Layout";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    brand_id: '',
    supplier_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/product', product, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Producto agregado:', response.data);
      navigate('/products');
    } catch (error) {
      console.error('Error al agregar el producto:', error.response ? error.response.data : error);
      alert('Error al agregar el producto');
    }
  };

  const username = localStorage.getItem("username") || "Usuario";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Layout>
    <div className="page-layout"> {/* NUEVO: layout general */}
      

      {/* Contenido principal */}
      <main className="add-product-main">
        <div className="add-product-container">
          <h2>Agregar Nuevo Producto</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Código:
              <input type="number" name="id" value={product.id} onChange={handleChange} required />
            </label>
            <label>
              Nombre:
              <input type="text" name="name" value={product.name} onChange={handleChange} required />
            </label>
            <label>
              Descripción:
              <textarea name="description" value={product.description} onChange={handleChange} required />
            </label>
            <label>
              Precio:
              <input type="number" name="price" value={product.price} onChange={handleChange} required />
            </label>
            <label>
              Stock:
              <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
            </label>
            <label>
              Categoría:
              <input type="number" name="category_id" value={product.category_id} onChange={handleChange} required />
            </label>
            <label>
              Marca:
              <input type="number" name="brand_id" value={product.brand_id} onChange={handleChange} required />
            </label>
            <label>
              Proveedor:
              <input type="number" name="supplier_id" value={product.supplier_id} onChange={handleChange} />
            </label>
            <button type="submit">Agregar Producto</button>
          </form>
        </div>
      </main>

      
    </div>
    </Layout>
  );
};

export default AddProduct;

