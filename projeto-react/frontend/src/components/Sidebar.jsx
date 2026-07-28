import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#374151",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>

      <br />

      {/* Usamos o componente Link e a propriedade 'to' apontando para a rota */}
      <p><Link to="/" style={{ color: "white", textDecoration: "none" }}>🏠 Dashboard</Link></p>

      <br />

      <p><Link to="/products" style={{ color: "white", textDecoration: "none" }}>📦 Produtos</Link></p>

      <br />

      <p><Link to="/orders" style={{ color: "white", textDecoration: "none" }}>🛒 Pedidos</Link></p>

      <br />

      <p><Link to="/customers" style={{ color: "white", textDecoration: "none" }}>👥 Clientes</Link></p>

      <br />

      <p><Link to="/reports" style={{ color: "white", textDecoration: "none" }}>📊 Relatórios</Link></p>
    </aside>
  );
}

export default Sidebar;