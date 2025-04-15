import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";

const EditUser = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [user, setUser] = useState({
    name: "",
    email: "",
    rol_id: "",
  });

  // Obtener el usuario a editar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error.response ? error.response.data : error);
        alert("Error al obtener el usuario");
      }
    };
  
    fetchUser();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://127.0.0.1:8000/api/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Usuario actualizado correctamente");
      navigate("/users");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.response ? error.response.data : error);
      alert("Error al actualizar el usuario");
    }
  };

  if (!user.name) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
    <div className="add-product-container">
      

      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rol ID:
          <input
            type="number"
            name="rol_id"
            value={user.rol_id}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Actualizar Usuario</button>
      </form>
    </div>

    </Layout>
  );
};

export default EditUser;
