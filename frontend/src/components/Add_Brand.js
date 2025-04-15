import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const AddBrand = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/brands", { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Marca agregada exitosamente");
      navigate("/brands");
    } catch (error) {
      console.error("Error al agregar la marca:", error);
      alert("Error al agregar la marca");
    }
  };

  return (
    <Layout>
    <div className="add-product-container">
      

      <h2>Agregar Marca</h2>

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
        <button type="submit">Agregar</button>
      </form>
    </div>
    </Layout>
  );
};

export default AddBrand;
