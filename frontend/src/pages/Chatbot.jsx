function Chatbot() {
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

  const horaDaMensagem = obterDataAtual();
  
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
          Chatbot de Atendimento 👨🏽‍💻🦅 🍷 
        </p>
      </div>

      {/* 3. CORPO PRINCIPAL */}
      <main style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>

       {/* Coluna Esquerda (Brasil/USA) */}
        <div style={{ 
          width: "20%", 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px" 
        }}>
          {/* Cartão do Brasil */}
          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "12px", 
            padding: "15px", 
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)", 
            textAlign: "center" 
          }}>
            <img 
              src="https://flagcdn.com/w160/br.png" 
              alt="Bandeira do Brasil" 
              style={{ width: "80px", height: "auto", borderRadius: "4px", marginBottom: "10px" }} 
            />
            <h4 style={{ margin: "0 0 5px 0", color: "#0b2545" }}>Português</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>Atendimento em PT-BR</p>
          </div>

          {/* Cartão dos USA */}
          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "12px", 
            padding: "15px", 
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)", 
            textAlign: "center" 
          }}>
            {/* Imagem real da bandeira dos EUA */}
            <img 
              src="https://flagcdn.com/w160/us.png" 
              alt="Bandeira dos EUA" 
              style={{ width: "80px", height: "auto", borderRadius: "4px", marginBottom: "10px" }} 
            />
            <h4 style={{ margin: "0 0 5px 0", color: "#0b2545" }}>English</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>English Support</p>
          </div>
        </div>

        {/* Coluna Central (Caixa do Chat) */}
        <div style={{ 
          width: "55%", 
          backgroundColor: "#ffffff", 
          borderRadius: "12px", 
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "500px"
        }}>
          
          {/* A. Cabeçalho do Chat */}
          <div style={{ 
            backgroundColor: "#0b2545", 
            color: "white", 
            padding: "12px 20px", 
            display: "flex", 
            alignItems: "center",
            gap: "10px"
          }}>
            <div style={{ 
              width: "35px", 
              height: "35px", 
              backgroundColor: "#f4c430", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: "1.2rem"
            }}>
              👨🏽‍🍳
            </div>
            <span style={{ fontWeight: "bold" }}>Renato's Bot</span>
          </div>

          {/* B. Corpo das Mensagens */}
          <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8fafc", overflowY: "auto" }}>
            
            {/* Mensagem do Bot (Esquerda) */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px", alignItems: "flex-start" }}>
              <div style={{ width: "28px", height: "28px", backgroundColor: "#f4c430", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>👨🏽‍🍳</div>
              <div>
                <div style={{ backgroundColor: "#ffffff", padding: "10px 14px", borderRadius: "0 12px 12px 12px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", color: "#1e293b", maxWidth: "80%" }}>
                  Olá! Bem-vindo ao Restaurante do Renato! Sou seu assistente digital. Como posso te ajudar hoje?
                </div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", marginLeft: "5px" }}>
                  {horaDaMensagem}
                </span>
              </div>
            </div>

            {/* Mensagem do Cliente (Direita) */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
              <div style={{ textAlign: "right", maxWidth: "80%" }}>
                <div style={{ backgroundColor: "#0b2545", color: "white", padding: "10px 14px", borderRadius: "12px 0 12px 12px", textAlign: "left" }}>
                  Quero ver o cardápio, por favor!
                </div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", marginRight: "5px" }}>
                  {horaDaMensagem}
                </span>
              </div>
            </div>

          </div>

          {/* C. Rodapé do Chat */}  
          <div style={{
            padding: "15px 20px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <input
              type="text"
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: "25px",
                border: "1px solid #cbd5e1",
                outline: "none",
                fontSize: "0.95rem",
                backgroundColor: "#f8fafc"
              }}
            />

            <button style={{
              backgroundColor: "#0b2545",
              color: "white",
              border: "none",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.1rem"
            }}>
              ➤
            </button>
          </div>

        </div>

        {/* Coluna Direita (França/Torre Eiffel) */}
        <div style={{ 
          width: "20%", 
          display: "flex", 
          flexDirection: "column" 
        }}>
          {/* Cartão de Paris */}
          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "12px", 
            padding: "15px", 
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)", 
            textAlign: "center" 
          }}>
            
            <img 
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&auto=format&fit=crop&q=60" 
              alt="Torre Eiffel" 
              style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} 
            />
            <h4 style={{ margin: "0 0 5px 0", color: "#0b2545" }}>Français</h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>Service em Français</p>
          </div>
        </div>

      </main> 

    </div>
  );
}

export default Chatbot;