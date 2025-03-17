import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Products = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h2>Lista de Productos</h2>

            {/* Botón para agregar un nuevo usuario */}
            <button className="add-user-btn" onClick={() => navigate("/register")}>
                Agregar Usuario
            </button>

            {/* Aquí iría tu lista de productos */}
            <div className="product-list">
                <p>Aquí van los productos...</p>
            </div>
        </div>
    );
};

export default Products;

