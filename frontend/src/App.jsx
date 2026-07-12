import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Olá! Sou o assistente virtual do restaurante. Como posso te ajudar hoje?", sender: "bot" }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Perfeito! Em breve meu cérebro em Python vai responder isso de verdade 🤖🍕", sender: 'bot'}]);
    }, 1000);
  };

  return (
    <div className="landing-page">
      <header className="hero-section">
        <nav className="navbar">
          <div className="logo">🎒 Renato's Bistrô</div>
          <ul className="nav-links">
            <li><a href="menu">Cardápio</a></li>
            <li><a href="about">Sobre Nós</a></li>
            <li><a href="#contact">Contato</a></li>
           </ul>
         </nav>

         <div className="hero-content">
           <h1>O verdadeiro sabor da culinária artesanal</h1>
           <p>Ingredientes frescos, receitas exclusivas e um toque de amor em cada prato.</p>
           <a href="#menu" className="cta-button">Ver Cardápio Digital</a>
         </div>
       </header>

       <section id="menu" className="info-section">
         <h2>Destaques do Chefe</h2>
         <p>Explore nossos pratos mais pedidos, desde hambúrgueres gourmet até massas frescas.</p>
       </section>

       <button
         className="floating-chat-button"
         onClick={() => setIsChatOpen(!isChatOpen)}
       >
         {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
       </button>

       {isChatOpen && (
         <div className="chat-window">
           <div className="chat-header">
             <h3>Atendimento Virtual</h3>
             <p>Online agora</p>
           </div>

           <div className="chat-messages">
             {messages.map((msg, index) => (
               <div key={index} className={'message-bubble ${msg.sender}'}>
                 {msg.text}
               </div>
             ))}
           </div>

           <form onSubmit={handleSendMessage} className="chat-input-area">
             <input
               type="text"
               value={input}
               onChange={(e) =>setInput(e.target.value)}
               placeholder="Digite sua dúvida aqui..."
             />
             <button type="submit"><Send size={8} /></button>
           </form> 
         </div>
       )}
     </div>
  );
}

export default App;