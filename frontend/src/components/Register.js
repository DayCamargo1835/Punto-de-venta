// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Asegúrate de importar el CSS
import "../styles/Auth.css";
import Layout from "./Layout";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    rol_id: "2", // Por defecto, usuario normal. Cambia a "1" para administrador si lo deseas.
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Respuesta del servidor:", response.data);
      setSuccess("Usuario registrado correctamente");
      // Redirige al login después de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Error en el registro:", err.response ? err.response.data : err.message);
      // Puedes personalizar el mensaje según lo que retorne la API
      setError("Error en el registro. Verifica los datos.");
    }
  };

  return (
    <Layout>
    <div className="auth-container">
  

  <h2>Registro</h2>
  {error && <p className="auth-error">{error}</p>}
  {success && <p className="auth-success">{success}</p>}

  <form onSubmit={handleSubmit} className="auth-form">
    <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} required />
    <input type="email" name="email" placeholder="Correo" onChange={handleChange} value={formData.email} required />
    <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} required />
    <input type="password" name="password_confirmation" placeholder="Confirmar Contraseña" onChange={handleChange} value={formData.password_confirmation} required />
    <select name="rol_id" onChange={handleChange} value={formData.rol_id}>
      <option value="1">Administrador</option>
      <option value="2">Usuario</option>
    </select>
    <button type="submit">Registrar</button>
  </form>
</div>

</Layout>
  );
};

export default Register;

