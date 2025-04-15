import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from "./Layout";

const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://127.0.0.1:8000/api/brands/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.name);
      } catch (error) {
        console.error("Error al obtener la marca:", error);
        alert("Error al obtener la marca");
      }
    };
    fetchBrand();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://127.0.0.1:8000/api/brands/${id}`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Marca actualizada exitosamente.");
      navigate("/brands");
    } catch (error) {
      console.error("Error al actualizar la marca:", error);
      alert("Error al actualizar la marca");
    }
  };

  return (
    
    <Layout>
    <div className="add-product-container">
        
      <h2>Editar Marca</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la Marca:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Actualizar Marca</button>
      </form>
    </div>
    </Layout>
  );
};

export default EditBrand;
