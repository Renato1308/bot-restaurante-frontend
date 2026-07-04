function Dashboard() {
  return (
    <div style={{ flex: 1, padding: "30px" }}>
      <h1>Dashboard</h1>

      <br />

      <h3>Resumo</h3>

      <br />

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)" // Pequeno ajuste visual opcional para destacar os cards no fundo branco
          }}
        >
          <h2>0</h2>
          <p>Pedidos</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <h2>0</h2>
          <p>Clientes</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <h2>0</h2>
          <p>Produtos</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;