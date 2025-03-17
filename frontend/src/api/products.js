import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/products";

const getProducts = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createProduct = async (product, token) => {
  const response = await axios.post(API_URL, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateProduct = async (id, product, token) => {
  const response = await axios.put(`${API_URL}/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteProduct = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { getProducts, createProduct, updateProduct, deleteProduct };
