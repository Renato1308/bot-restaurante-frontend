import { useState, useEffect } from "react";

function Cardapio() {
  const [itens, setItens] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Busca os pratos do seu banco de dados SQLite através do backend Python
  useEffect(() => {
    const buscarCardapio = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch("https://defog-politely-directly.ngrok-free.dev");
        
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar o cardápio.");
        }
        
        const dados = await resposta.json();
        setItens(dados);
        setErro(null);
      } catch (err) {
        console.error("Erro ao buscar cardápio:", err);
        setErro("Não conseguimos carregar o cardápio no momento. Verifique se o servidor Python está rodando!");
      } finally {
        setCarregando(false);
      }
    };

    buscarCardapio();
  }, []);

  // Extrai as categorias únicas existentes nos pratos vindos do banco
  const categorias = ["Todos", ...new Set(itens.map((item) => item.categoria))];

  // Filtra os itens com base na categoria que o usuário clicar
  const itensFiltrados = categoriaAtiva === "Todos" 
    ? itens 
    : itens.filter((item) => item.categoria === categoriaAtiva);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: "40px" }}>
      
      {/* Cabeçalho do Restaurante */}
      <header style={{ backgroundColor: "#0b2545", color: "white", padding: "40px 20px", textAlign: "center", backgroundImage: "linear-gradient(rgba(11, 37, 69, 0.85), rgba(11, 37, 69, 0.95))" }}>
        <h1 style={{ margin: "0 0 10px 0", fontSize: "2.5rem", fontWeight: "bold" }}>Renato's Bistro</h1>
        <p style={{ margin: 0, color: "#cbd5e1", fontSize: "1.1rem" }}>Massas artesanais, vinhos finos e experiências inesquecíveis</p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        
        {/* Menu de Categorias (Filtros) */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "30px" }}>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: categoriaAtiva === cat ? "#0b2545" : "#ffffff",
                color: categoriaAtiva === cat ? "#ffffff" : "#475569",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                transition: "all 0.2s"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Estado de Carregamento */}
        {carregando && (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            <h3 style={{ margin: 0 }}>Preparando a mesa e carregando o cardápio... 🍕</h3>
          </div>
        )}

        {/* Mensagem de Erro (caso o Python esteja desligado) */}
        {erro && (
          <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", padding: "15px", borderRadius: "8px", textAlign: "center", margin: "20px auto", maxWidth: "600px" }}>
            {erro}
          </div>
        )}

        {/* Estado de Cardápio Vazio */}
        {!carregando && !erro && itens.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            <p style={{ fontSize: "1.2rem" }}>Nenhum prato cadastrado no banco de dados ainda!</p>
            <p style={{ fontSize: "0.9rem" }}>Cadastre itens via Swagger (http://127.0.0.1:8000/docs) ou no painel.</p>
          </div>
        )}

        {/* Grid de Pratos do Cardápio */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
          {itensFiltrados.map((prato, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: "#ffffff", 
                borderRadius: "12px", 
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)", 
                overflow: "hidden", 
                display: "flex", 
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid #f1f5f9"
              }}
            >
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1.2rem" }}>{prato.nome}</h3>
                  <span style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "0.75rem", padding: "4px 8px", borderRadius: "12px", textTransform: "uppercase", fontWeight: "bold" }}>
                    {prato.categoria}
                  </span>
                </div>
                
                <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 15px 0", lineHeight: "1.4" }}>
                  {prato.descricao || "Sem descrição disponível."}
                </p>
              </div>

              <div style={{ padding: "15px 20px", borderTop: "1px solid #f1f5f9", backgroundColor: "#fafafa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "600" }}>Preço</span>
                <span style={{ fontSize: "1.3rem", color: "#0b2545", fontWeight: "bold" }}>
                  R$ {prato.preco.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default Cardapio;