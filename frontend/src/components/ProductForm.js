import React, { useState } from "react";
import { createProduct, updateProduct } from "../api/products";

const ProductForm = ({ token, product, fetchProducts }) => {
  const [formData, setFormData] = useState(
    product || { name: "", description: "", price: "", stock: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateProduct(formData.id, formData, token);
    } else {
      await createProduct(formData, token);
    }
    fetchProducts();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
      <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
      <input name="price" type="number" placeholder="Precio" value={formData.price} onChange={handleChange} />
      <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} />
      <button type="submit">{formData.id ? "Actualizar" : "Agregar"}</button>
    </form>
  );
};

export default ProductForm;
