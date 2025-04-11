import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";

const EditProduct = () => {
  const { id } = useParams();  // Obtener el ID del producto desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    brand_id: '',
    supplier_id: '',
  });

  // Obtener el producto a editar
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de obtener el token de localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
          },
        });
        setProduct(response.data); // Asigna los datos del producto al estado
      } catch (error) {
        console.error("Error al obtener el producto:", error.response ? error.response.data : error);
        alert('Error al obtener el producto');
      }
    };

    fetchProduct();
  }, [id]);

  // Función para manejar el cambio de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://127.0.0.1:8000/api/product/${id}`, product, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Usa el token para autorizar la solicitud
        },
      });

      console.log('Producto actualizado:', response.data);
      navigate('/products');  // Redirige a la página de productos
    } catch (error) {
      console.error('Error al actualizar el producto:', error.response ? error.response.data : error);
      alert('Error al actualizar el producto');
    }
  };

  if (!product.name) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
    <div className="add-product-container">

      

      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Categoría:
          <input
            type="number"
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Marca:
          <input
            type="number"
            name="brand_id"
            value={product.brand_id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Proveedor:
          <input
            type="number"
            name="supplier_id"
            value={product.supplier_id}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
    </Layout>
  );
};

export default EditProduct;
