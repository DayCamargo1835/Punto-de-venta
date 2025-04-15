// Users.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Products.css";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este usuario?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        console.error("Error al eliminar el usuario:", err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-users/${id}`);
  };

  const handleAddUser = () => {
    navigate("/register");
  };

  return (
  
    <Layout>
    <div className="inventario-container">
      <header className="inventario-header">
        
        <h2>Usuarios</h2>
      </header>

      <div className="action-buttons">
        <button className="add-product" onClick={handleAddUser}>
          Agregar Usuario
        </button>
        <input
          className="search-bar"
          type="text"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((u) =>
              u.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user) => (
              <tr key={user.id} className="product-row">
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.rol_id}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user.id)}>🖉</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>🗑</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </Layout>
  );
};

export default Users;
