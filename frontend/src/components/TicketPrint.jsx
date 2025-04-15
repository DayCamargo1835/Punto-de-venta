import React from 'react';

const TicketPrint = ({ ticket }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🎟️ Ticket de Venta</h2>
      <p><strong>ID Venta:</strong> {ticket.id}</p>
      <p><strong>Vendedor:</strong> {ticket.user?.name}</p>
      <p><strong>Fecha:</strong> {new Date(ticket.date).toLocaleString()}</p>
      <p><strong>Total Venta:</strong> ${Number(ticket.total || 0).toFixed(2)}</p>

      <h3 style={{ marginTop: '20px' }}>Productos:</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Cantidad</th>
            <th style={thStyle}>Precio Unitario</th>
            <th style={thStyle}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {ticket.details.map((detail, idx) => (
            <tr key={idx}>
              <td style={tdStyle}>{detail.product.id}</td>
              <td style={tdStyle}>{detail.product.name}</td>
              <td style={tdStyle}>{detail.quantity}</td>
              <td style={tdStyle}>${Number(detail.unit_price).toFixed(2)}</td>
              <td style={tdStyle}>${Number(detail.subtotal).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

export default TicketPrint;