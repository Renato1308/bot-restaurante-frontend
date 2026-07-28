function Header() {
  return (
    <header
      style={{
        height: "70px",
        background: "#1f2937",
        color: "white",
        display: "flex",
        alignItems: "center", // 👈 Corrigido aqui (era alignItens)
        padding: "0 30px",
      }}
    >
      <h2> 🍽 Restaurante do Renato 🍔</h2>
    </header>
  );
}

export default Header;