function Chatbot() {
  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* 1. TOPO: Barra superior azul escura estilizada */}
      <header style={{
        backgroundColor: "#0b2545",
        color: "white",
        padding: "10px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3 style={{ margin: 0, fontWeight: "normal" }}>Renato's Bot</h3>
        
        {/* Campo de pesquisa (Corrigido de 'stile' para 'style') */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "none",
              marginRight: "10px",
              outline: "none"
            }}
          />
          <span>🔍</span>     
        </div>
      </header>

      {/* 2. LOGO CENTRAL: Onde ficará o brasão do restaurante */}
      <div style={{ textAlign: "center", padding: "30px 10px 10px 10px" }}>
        <h1 style={{ color: "#0b2545", margin: "0 0 5px 0", fontSize: "2.5rem", fontWeight: "bold" }}>
          RESTAURANTE DO RENATO    
        </h1>
        <p style={{ color: "#374151", margin: 0, fontSize: "1.2rem", fontWeight: "500" }}>
          Chatbot de Atendimento 🇧🇷 🦅 🍷 
        </p>
      </div>

      {/* 3. CORPO PRINCIPAL (Adicionamos a tag <main> que estava faltando!) */}
      <main style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>

        {/* Coluna Esquerda (Brasil/USA) */}
        <div style={{ width: "20%", border: "1px dashed #ccc", textAlign: "center", padding: "10px" }}>
          [Imagens Brasil / USA]
        </div>

        {/* Coluna Central (Caixa do Chat que tinha sumido) */}
        <div style={{ width: "55%", backgroundColor: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3>Conversa com o Bot</h3>
          <p>Olá! Bem-vindo ao Restaurante do Renato!</p>
        </div>

        {/* Coluna Direita (França/Torre Eiffel) */}
        <div style={{ width: "20%", border: "1px dashed #ccc", textAlign: "center", padding: "10px" }}>
          [Imagem Paris]
        </div>

      </main> 

    </div>
  );
}

export default Chatbot;