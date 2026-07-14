import Chatbot from "./pages/chatbot";
import Cardapio from "./pages/Cardapio";
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  // 1. Estado para controlar se o cardápio deve ser exibido ou não
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="landing-page">
      <header className="hero-section">
        <nav className="navbar">
          <div className="logo">🎒 Renato's Bistrô</div>
          <ul className="nav-links">
            {/* 2. Ao clicar no link do topo, ativa o cardápio */}
            <li>
              <a href="#menu" onClick={() => setIsMenuOpen(true)}>Cardápio</a>
            </li>
            <li><a href="about">Sobre Nós</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>

        <div className="hero-content">
          <h1>O verdadeiro sabor da culinária artesanal</h1>
          <p>Ingredientes frescos, receitas exclusivas e um toque de amor em cada prato.</p>
          {/* 3. Ao clicar no botão principal, ativa o cardápio também */}
          <a 
            href="#menu" 
            className="cta-button" 
            onClick={() => setIsMenuOpen(true)}
          >
            Ver Cardápio Digital
          </a>
        </div>
      </header>

      {/* 4. O cardápio só aparece se "isMenuOpen" for verdadeiro (true) */}
      {isMenuOpen && (
        <section id="menu" className="info-section">
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
            {/* Botão para o cliente fechar o cardápio se quiser voltar para a home */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              style={{ padding: '8px 16px', background: '#0b2545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Fechar Cardápio ✕
            </button>
          </div>
          <Cardapio /> 
        </section>
      )}

      {/* Botão Flutuante do Chatbot */}
      <button
        className="floating-chat-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{ zIndex: 1000 }}
      >
        {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Janela do Chatbot */}
      {isChatOpen && (
        <div style={{
          position: "fixed",
          bottom: "85px",
          right: "20px",
          width: "400px",
          maxWidth: "90vw",
          height: "500px",
          zIndex: 999,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)"
        }}>
          <Chatbot />
        </div>
      )}
    </div>
  );
}

export default App;