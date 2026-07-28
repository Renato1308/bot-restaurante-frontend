// 1. IMPORTAÇÕES: Trazendo os componentes externos e ícones necessários
import Chatbot from "./pages/Chatbot";
import Cardapio from "./pages/Cardapio";
import React, { useState } from 'react';
import { MessageSquare, X, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import './App.css';
import './styles/sobreNos.css';
import './styles/contato.css';

function App() {
  // 2. ESTADOS: Controla a abertura do Chatbot e o estado de envio do formulário
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Função para lidar com o envio do formulário
  const handleSubmit = () => {
    setEnviado(true);
  };

  return (
    <div className="landing-page">

      {/* 3. HERO-SECTION: O topo do site */}
      <header className="hero-section">
        <nav className="navbar">
          
          {/* Menu de Links (ACIMA DO LOGO) */}
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

          {/* Logo Centralizado (ABAIXO DO MENU) */}
          <div className="logo-center">
            <UtensilsCrossed className="logo-icon" size={32} />
            <span className="brand-title">Renato's Bistrô</span>
          </div>

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

      {/* 4. SEÇÃO DO CARDÁPIO */}
      <section id="menu" className="info-section">
        <Cardapio />
      </section>

      {/* 5. SEÇÃO SOBRE NÓS */}
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

          {/* Formulário Conectado ao E-mail com Resposta Automática e Confirmação */}
          <div className="contato-formulario">
            <h3>Envie uma mensagem</h3>

            {enviado ? (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                marginTop: '15px',
                border: '1px solid #c3e6cb'
              }}>
                <CheckCircle2 size={40} color="#28a745" style={{ marginBottom: '10px' }} />
                <h4 style={{ margin: '0 0 10px 0' }}>Mensagem Enviada!</h4>
                <p style={{ margin: 0 }}>
                  Obrigado pela sua mensagem, nossa equipe do Renato's Bistrô irá retornar o mais breve possível.
                </p>
              </div>
            ) : (
              <form 
                action="https://formsubmit.co/09914700d0036ac7738777a21a97e7b6" 
                method="POST"
                onSubmit={handleSubmit}
              >
                
                <input type="hidden" name="_subject" value="Novo Contato - Renato's Bistrô!" />
                <input type="hidden" name="_captcha" value="false" />
                
                {/* Envia e-mail automático de confirmação para quem preencheu */}
                <input 
                  type="hidden" 
                  name="_autoresponse" 
                  value="Olá! Recebemos a sua mensagem e agradecemos o contato com o Renato's Bistrô. Nossa equipe irá retornar em breve!" 
                />

                <input 
                  type="hidden" 
                  name="_next" 
                  value="https://bot-restaurante-frontend-git-main-renato130887.vercel.app/" 
                />

                <div className="form-grupo">
                  <label>Nome</label>
                  <input type="text" name="Nome" placeholder="Seu nome completo" required />
                </div>

                <div className="form-grupo">
                  <label>E-mail</label>
                  <input type="email" name="E-mail" placeholder="seuemail@exemplo.com" required />
                </div>

                <div className="form-grupo">
                  <label>Mensagem</label>
                  <textarea name="Mensagem" rows="4" placeholder="Em que podemos ajudar? (Dúvidas, eventos, elogios...)" required></textarea>
                </div>

                <button type="submit" className="form-botao">Enviar Mensagem</button>      
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 7. BOTÃO FLUTUANTE DO CHATBOT */}
      <button
        className="floating-chat-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* 8. JANELA CONTAINER DO CHATBOT */}
      {isChatOpen && (
        <div className="chat-window">
          <Chatbot />
        </div>  
      )}        
    </div>
  );
}

export default App;