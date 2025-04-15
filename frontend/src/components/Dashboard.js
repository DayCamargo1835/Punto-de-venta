import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Layout from "./Layout";
import TicketPrint from './TicketPrint.jsx';
import "../styles/Products.css";

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/product')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, price: Number(item.price) }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, price: Number(product.price) }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null;
        }
      }
      return item;
    }).filter(Boolean));
  };

  const handlePayment = async () => {
    try {
      const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      const ventaData = {
        user_id: user.id,
        total,
        products: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          subtotal: item.price * item.quantity
        }))
      };

      const response = await axios.post('http://localhost:8000/api/sales', ventaData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const saleId = response.data.sale_id;

      const ticketResponse = await axios.get(`http://localhost:8000/api/sales/${saleId}/ticket`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTicket(ticketResponse.data);
      setShowTicketModal(true);
      setCart([]);
      alert('Venta registrada correctamente');
    } catch (error) {
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        alert(`Error del servidor: ${error.response.data.error || error.response.data.message}`);
      } else if (error.request) {
        console.error('No hubo respuesta del servidor');
        alert('No hubo respuesta del servidor');
      } else {
        console.error('Error al configurar la petición:', error.message);
        alert(`Error inesperado: ${error.message}`);
      }
    }
  };

  const handlePrint = () => {
    console.log('Datos del ticket:', ticket);  // Verifica que ticket no sea nulo ni vacío

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      alert("Tu navegador bloqueó la ventana emergente.");
      return;
    }
    // Inyecta el HTML directamente en el documento de la ventana emergente
    printWindow.document.open();
    printWindow.document.write(`
      <div id="ticket">
        <h2>🎟️ Ticket de Venta</h2>
        <p><strong>ID Venta:</strong> ${ticket.id}</p>
        <p><strong>Vendedor:</strong> ${ticket.user?.name}</p>
        <p><strong>Fecha:</strong> ${new Date(ticket.date).toLocaleString()}</p>
        <p><strong>Total Venta:</strong> $${Number(ticket.total || 0).toFixed(2)}</p>
        <h3 style="margin-top: 20px;">Productos:</h3>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">ID</th>
              <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Nombre</th>
              <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Cantidad</th>
              <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Precio Unitario</th>
              <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${ticket.details.map(detail => `
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">${detail.product.id}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${detail.product.name}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${detail.quantity}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">$${Number(detail.unit_price).toFixed(2)}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">$${Number(detail.subtotal).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Layout>

      <div className="inventario-container">
      <div className="inventario-header">
        

        

        <h2>Ventas</h2>
        
      </div>

        {errors && <p className="text-red-500 mb-2">{errors}</p>}

        <input
          type="text"
          placeholder="Buscar producto"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm.trim() !== '' && (
          <ul className="mb-4">
            {products.filter(p =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(product => (
              <li key={product.id} className="border-b py-1 flex justify-between items-center">
                <span>{product.name} - ${product.price}</span>
                <div className="action-buttons">
                <button
                  className="add-product"
                  onClick={() => addToCart(product)}
                >
                  Agregar
                </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold mt-6 mb-2">Carrito</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No hay productos en el carrito.</p>
        ) : (
          <>
            <table className="w-full text-left border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Precio Unitario</th>
                  <th className="p-2 border">Cantidad</th>
                  <th className="p-2 border">Precio Total</th>
                  <th className="p-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td className="p-2 border">{item.id}</td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">${item.price.toFixed(2)}</td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">${(item.quantity * item.price).toFixed(2)}</td>
                    <td className="p-2 border">
                      <button
                        className="text-yellow-600 mr-2"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-semibold">
                Total: ${cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handlePayment}
                disabled={cart.length === 0}
              >
                Pagar
              </button>
            </div>
          </>
        )}

        {showTicketModal && ticket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
              <TicketPrint ticket={ticket} />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={handlePrint}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Imprimir
                </button>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default SalesPage;

