import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "../styles/Auth.css";
import Layout from "./Layout";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                { email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("nombre", response.data.user.name);       // 👈 Aquí
  localStorage.setItem("rol_id", response.data.user.rol_id);   

            if (response.data.user.rol_id === 1) {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setError("Credenciales incorrectas o problema en la solicitud.");
        }
    };

    return (

    <Layout>
        <div className="auth-container">
  <h2>Iniciar Sesión</h2>
  {error && <p className="auth-error">{error}</p>}
  <form onSubmit={handleLogin} className="auth-form">
    <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
    <button type="submit">Iniciar Sesión</button>
  </form>
</div>

</Layout>
    );
};

export default Login;
