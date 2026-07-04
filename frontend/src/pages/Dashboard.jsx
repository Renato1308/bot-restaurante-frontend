function Dashboard() {
  return (
    <main style={{ flex: 1, padding: "30px" }}>
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
        }}
      >
        <h2>0</h2>
        <p>Produtos</p>
      </div>
    </div>
  </main>
);
}

export default Dashboard;   