// 1. IMPORTAÇÕES: Trazendo os componentes externos e ícones necessários
import Chatbot from "./pages/Chatbot";
import Cardapio from "./pages/Cardapio";
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import './App.css';
import './styles/sobreNos.css';
import './styles/contato.css';

function App() {
  // 2. ESTADOS: Controla apenas a abertura do Chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="landing-page">

      {/* 3. HERO-SECTION: O topo do site */}
      <header className="hero-section">
        <nav className="navbar">
          <div className="logo"> 🎒 Renato's Bistrô</div>
          <ul className="nav-links">
            <li>
              <a href="#menu">Cardápio</a>
            </li>
            <li>
              <a href="#sobre-nos">Sobre Nós</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </nav>

        {/* Conteúdo de impacto no centro do banner inicial */}
        <div className="hero-content">
          <h1>O verdadeiro sabor da culinária artesanal</h1>
          <p>Ingredientes frescos, receitas exclusivas e um toque de amor em cada prato.</p>
          <a href="#menu" className="cta-button">
            Ver Cardápio Digital
          </a>  
        </div>
      </header>

      {/* 4. SEÇÃO DO CARDÁPIO: Sempre visível na Landing Page (Opção 1) */}
      <section id="menu" className="info-section">
        <Cardapio />
      </section>

      {/* 5. SEÇÃO SOBRE NÓS: História e diferenciais */}
      <section id="sobre-nos" className="sobre-secao">
        <div className="sobre-container">

          <div className="sobre-imagens">
            <div className="imagem-wrapper principal">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80"
                alt="Cozinha do Renato's Bistrô"
              />  
            </div>
            <div className="imagem-wrapper secundaria">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80"
                alt="Ambiente do Restaurante"
              />  
            </div>
          </div>
          
          <div className="sobre-conteudo">
            <span className="sobre-subtitulo">Nossa História</span>
            <h2>Paixão pela gastronomia, respeito aos ingredientes</h2>
            <p>
              O <strong>Renato's Bistrô</strong> nasceu do sonho de transformar refeições simples em momentos inesquecíveis.
              Fundado em 2024, nosso compromisso sempre foi unir a alta gastronomia a um ambiente
              acolhedor e descontraído.
            </p>
            <p>
              Cada prato do nosso menu - desde o nosso famoso Xis Coração até as massas de longa fermentação
              das nossas pizzas - é preparado artesanalmente com ingredientes selecionados de produtores locais.
              Aqui, nós não servimos apenas comida; nós compartilhamos nossa paixão.
            </p>

            <div className="sobre-diferenciais">
              <div className="diferencial-item">
                <strong>100% Artesanal</strong>
                <p>Molhos, misturas e massas feitas na casa.</p>
              </div>
              <div className="diferencial-item">
                <strong>Ingredientes Locais</strong>
                <p>Apoio aos produtores da nossa região.</p>
              </div>
            </div> 
          </div>

        </div>
      </section>

      {/* 6. SEÇÃO DE CONTATO */}
      <section id="contato" className="contato-secao">
        <div className="contato-container">

          {/* Informações Práticas */}
          <div className="contato-info">
            <span className="contato-subtitulo">Fale Conosco</span>
            <h2>Venha nos visitar ou faça seu pedido.</h2>

            <div className="info-bloco">
              <strong>📍 Endereço</strong>
              <p>Rua dos Sabores, 742 - Bairro Gourmet, Porto Alegre - RS</p>
            </div>

            <div className="info-bloco">
              <strong>📞 Telefone / WhatsApp</strong>
              <p>(51) 99999-8888 / (51) 3333-2222</p>
            </div>

            <div className="info-bloco">
              <strong>🕕 Horário de Funcionamento</strong>
              <p>Terça a Domingo: 18h às 23h30</p>
              <p>Sábados e Domingos: Almoço das 11h30 às 15h</p>
            </div>          
          </div>

          {/* Formulário */}
          <div className="contato-formulario">
            <h3>Envie uma mensagem</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-grupo">
                <label>Nome</label>
                <input type="text" placeholder="Seu nome completo" required />
              </div>
              <div className="form-grupo">
                <label>E-mail</label>
                <input type="email" placeholder="seuemail@exemplo.com" required />
              </div>
              <div className="form-grupo">
                <label>Mensagem</label>
                <textarea rows="4" placeholder="Em que podemos ajudar? (Dúvidas, eventos, elogios...)" required></textarea>
              </div>
              <button type="submit" className="form-botao">Enviar Mensagem</button>      
            </form>
          </div>

        </div>
      </section> 

      {/* 7. BOTÃO FLUTUANTE DO CHATBOT */}
      <button
        className="floating-chat-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{ zIndex: 1000 }}
      >
        {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* 8. JANELA CONTAINER DO CHATBOT */}
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