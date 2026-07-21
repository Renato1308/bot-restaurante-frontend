import { useState, useEffect, useRef } from "react";

function Chatbot() {
  const [larguraJanela, setLarguraJanela] = useState(window.innerWidth);
  const fimDasMensagensRef = useRef(null);

  // 1. Definição dinâmica da URL do Backend (Render no deploy / Localhost no dev)
  const API_URL = import.meta.env.VITE_API_URL || "https://bot-restaurante-backend.onrender.com";

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

  useEffect(() => {
    fimDasMensagensRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  useEffect(() => {
    const lidarComRedimensionamento = () => setLarguraJanela(window.innerWidth);
    window.addEventListener("resize", lidarComRedimensionamento);
    return () => window.removeEventListener("resize", lidarComRedimensionamento);
  }, []);

  const isCelular = larguraJanela < 768;

  const lidarComEnvio = async () => {
    if (textoDigitado.trim() === "") return;

    const mensagemUsuario = textoDigitado;
    const novaMensagemCliente = {
      id: Date.now(),
      texto: mensagemUsuario,
      remetente: "cliente",
      horario: obterDataAtual()
    };

    setMensagens((prev) => [...prev, novaMensagemCliente]);
    setTextoDigitado("");

    const idMensagemDigitando = Date.now() + 1;
    setMensagens((prev) => [...prev, {
      id: idMensagemDigitando,
      texto: "Digitando... 👨🏽‍🍳✏",
      remetente: "bot",
      horario: obterDataAtual()
    }]);

    try {
      // CORRIGIDO: Agora usa a URL do Render com HTTPS
      const respostaServidor = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ texto: mensagemUsuario }),
      });

      if (!respostaServidor.ok) {
        throw new Error(`Erro na resposta do servidor: Código ${respostaServidor.status}`);
      }

      const dados = await respostaServidor.json();

      setMensagens((prev) =>
        prev.map((msg) =>
          msg.id === idMensagemDigitando ? { ...msg, texto: dados.resposta } : msg
        )
      );
    } catch (erro) {
      console.error("Erro detalhado ao conectar com a API:", erro);
      
      setMensagens((prev) =>
        prev.map((msg) =>
          msg.id === idMensagemDigitando
            ? { ...msg, texto: `Não consegui me conectar ao servidor Python. Detalhes: ${erro.message}` }
            : msg
        )
      );
    }
  };    
    
  return (
    <div style={{ backgroundColor: "#f3f4f6", height: "100vh", overflow: "hidden", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <header style={{ backgroundColor: "#0b2545", color: "white", padding: isCelular ? "10px 15px" : "10px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <h3 style={{ margin: 0, fontWeight: "normal", fontSize: isCelular ? "1.1rem" : "1.3rem" }}>Renato's Bot</h3>
      </header>

      <main style={{ display: "flex", justifyContent: "center", padding: "10px", flex: 1, overflow: "hidden" }}>
        <div style={{ 
          width: isCelular ? "100%" : "500px", 
          backgroundColor: "#ffffff", 
          borderRadius: "12px", 
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)", 
          display: "flex", 
          flexDirection: "column", 
          height: "100%"
        }}>
          <div style={{ backgroundColor: "#0b2545", color: "white", padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <span>👨🏽‍🍳 Renato's Bot</span>
          </div>

          <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8fafc", overflowY: "auto" }}>
            {mensagens.map((msg) => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.remetente === "bot" ? "flex-start" : "flex-end", marginBottom: "15px" }}>
                <div style={{ backgroundColor: msg.remetente === "bot" ? "#ffffff" : "#0b2545", color: msg.remetente === "bot" ? "#1e293b" : "white", padding: "10px 14px", borderRadius: "12px", maxWidth: "80%" }}>
                  {msg.texto}
                </div>
              </div>
            ))}
            <div ref={fimDasMensagensRef} />
          </div>

          <div style={{ padding: "15px", borderTop: "1px solid #e2e8f0", display: "flex", gap: "10px", flexShrink: 0 }}>
            <input
              type="text"
              value={textoDigitado}
              onChange={(e) => setTextoDigitado(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lidarComEnvio()}
              style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "1px solid #cbd5e1" }}
            />
            <button onClick={lidarComEnvio} style={{ padding: "10px 20px", borderRadius: "20px", border: "none", backgroundColor: "#0b2545", color: "white" }}>Enviar</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chatbot;