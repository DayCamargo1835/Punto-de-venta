import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/productos").then((response) => {
      setProductos(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

