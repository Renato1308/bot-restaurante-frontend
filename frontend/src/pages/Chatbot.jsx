import { useState, useEffect } from "react";

function Chatbot() {
  // Detector de tela de celular (largura menor que 768px)
  const [larguraJanela, setLarguraJanela] = useState(window.innerWidth);

  useEffect(() => {
    const lidarComRedimensionamento = () => setLarguraJanela(window.innerWidth);
    window.addEventListener("resize", lidarComRedimensionamento);
    return () => window.removeEventListener("resize", lidarComRedimensionamento);
  }, []);

  const isCelular = larguraJanela < 768;

  const obterDataAtual = () => {
    return new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      texto: "Olá! Bem-vindo ao Restaurante do Renato! Sou seu assistente digital. Como posso te ajudar hoje?",
      remetente: "bot",
      horario: obterDataAtual()
    }
  ]);

  const [textoDigitado, setTextoDigitado] = useState("");

  const lidarComEnvio = () => {
    if (textoDigitado.trim() === "") return;

    const novaMensagemCliente = {
      id: Date.now(),
      texto: textoDigitado,
      remetente: "cliente",
      horario: obterDataAtual()
    };

    setMensagens([...mensagens, novaMensagemCliente]);
    setTextoDigitado("");

    setTimeout(() => {
      const respostaBot = {
        id: Date.now() + 1,
        texto: "Perfeito! O Renato já está preparando o cardápio para você. Só um minutinho! 🍳",
        remetente: "bot",
        horario: obterDataAtual()
      };
      setMensagens((prev) => [...prev, respostaBot]);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", fontFamily: "sans-serif" }}>

      <header style={{
        backgroundColor: "#0b2545",
        color: "white",
        padding: isCelular ? "10px 15px" : "10px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3 style={{ margin: 0, fontWeight: "normal", fontSize: isCelular ? "1.1rem" : "1.3rem" }}>Renato's Bot</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{ padding: "6px 12px", borderRadius: "4px", border: "none", marginRight: "10px", outline: "none", width: isCelular ? "100px" : "auto" }}
          />
          <span>🔍</span>     
        </div>
      </header>

      <div style={{ textAlign: "center", padding: isCelular ? "15px 10px" : "30px 10px 10px 10px" }}>
        <h1 style={{ color: "#0b2545", margin: "0 0 5px 0", fontSize: isCelular ? "1.8rem" : "2.5rem", fontWeight: "bold" }}>
          RESTAURANTE DO RENATO    
        </h1>
        <p style={{ color: "#374151", margin: 0, fontSize: isCelular ? "1rem" : "1.2rem", fontWeight: "500" }}>
          Chatbot de Atendimento 🇧🇷 🦅 🍷 
        </p>
      </div>

      <main style={{ display: "flex", justifyContent: "space-between", padding: isCelular ? "10px" : "20px", gap: "15px" }}>

        {/* Coluna Esquerda - ESCONDE SE FOR CELULAR */}
        {!isCelular && (
          <div style={{ width: "20%", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <img src="data:image/png;base64,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" alt="Bandeira do Brasil" style={{ width: "80px", height: "auto", borderRadius: "4px", marginBottom: "10px" }} />
              <h4 style={{ margin: "0 0 5px 0", color: "#0b2545" }}>Português</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>Atendimento em PT-BR</p>
            </div>
            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <img src="https://flagcdn.com/w160/us.png" alt="Bandeira dos EUA" style={{ width: "80px", height: "auto", borderRadius: "4px", marginBottom: "10px" }} />
              <h4 style={{ margin: "0 0 5px 0", color: "#0b2545" }}>English</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>English Support</p>
            </div>
          </div>
        )}

        {/* Coluna Central (O Chat se adapta a 100% no celular) */}
        <div style={{ 
          width: isCelular ? "100%" : "55%", 
          backgroundColor: "#ffffff", borderRadius: "12px", 
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)", overflow: "hidden",
          display: "flex", flexDirection: "column", height: isCelular ? "450px" : "500px"
        }}>
          
          <div style={{ backgroundColor: "#0b2545", color: "white", padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "35px", height: "35px", backgroundColor: "#f4c430", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>👨🏽‍🍳</div>
            <span style={{ fontWeight: "bold" }}>Renato's Bot</span>
          </div>

          <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8fafc", overflowY: "auto" }}>
            {mensagens.map((msg) => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.remetente === "bot" ? "flex-start" : "flex-end", marginBottom: "15px" }}>
                {msg.remetente === "bot" ? (
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: "28px", height: "28px", backgroundColor: "#f4c430", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>👨🏽‍🍳</div>
                    <div>
                      <div style={{ backgroundColor: "#ffffff", padding: "10px 14px", borderRadius: "0 12px 12px 12px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", color: "#1e293b", maxWidth: isCelular ? "240px" : "400px" }}>
                        {msg.texto}
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", marginLeft: "5px" }}>{msg.horario}</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "right", maxWidth: "80%" }}>
                    <div style={{ backgroundColor: "#0b2545", color: "white", padding: "10px 14px", borderRadius: "12px 0 12px 12px", textAlign: "left" }}>
                      {msg.texto}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", marginRight: "5px" }}>{msg.horario}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ padding: "15px 20px", backgroundColor: "#ffffff", borderTop: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={textoDigitado}
              onChange={(e) => setTextoDigitado(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lidarComEnvio()}
              style={{ flex: 1, padding: "12px 20px", borderRadius: "25px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.95rem", backgroundColor: "#f8fafc" }}
            />
            <button 
              onClick={lidarComEnvio}
              style={{ backgroundColor: "#0b2545", color: "white", border: "none", width: "42px", height: "42px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1.1rem" }}
            >
              ➤
            </button>
          </div>

        </div>

        {/* Coluna Direita - ESCONDE SE FOR CELULAR */}
        {!isCelular && (
          <div style={{ width: "20%", display: "flex", flexDirection: "column" }}>
            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", textAlign: "center" }}>
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop&q=60" alt="Torre Eiffel" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
              <h4 style={{ margin: "0 0 5px 0", color: "#0b2545" }}>Français</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>Service em Français</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Chatbot;