import React, { useState } from 'react';
import '../styles/cardapio.css';

// 1. SEUS ITENS DO CARDÁPIO
const itensCardapio = [
  { 
    id: 1, 
    nome: 'Pizza de Calabresa', 
    categoria: 'Pizza', 
    descricao: 'Massa artesanal, calabresa defumada e queijo derretido.', 
    preco: 'R$ 45,00', 
    imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 2, 
    nome: 'Xis Coração', 
    categoria: 'Lanche', 
    descricao: 'Clássico gaúcho com coraçãozinho na chapa, maionese temperada e milho.', 
    preco: 'R$ 28,00', 
    imagem: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 3, 
    nome: 'Hambúrguer Artesanal', 
    categoria: 'Hambúrguer', 
    descricao: 'Blend bovino de 180g, queijo cheddar, bacon e molho especial.', 
    preco: 'R$ 35,00', 
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' 
  }
];

// 2. SUAS CATEGORIAS
const categorias = ['Pizza', 'Lanche', 'Hambúrguer'];

function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Pizza');

  return (
    <div className="cardapio-container">
      
      <div className="cardapio-header">
        <span className="cardapio-subtitulo">Nosso Menu</span>
        <h2>Explore nossas delícias artesanais</h2>
        <p>Cada prato é uma experiência única, preparada com ingredientes selecionados e muito carinho.</p>
      </div>

      {/* Área dos botões de categoria com as classes que você curtiu */}
      <div className="categoria-filtros">
        {categorias.map(categoria => (
          <button 
            key={categoria}
            className={`filtro-btn ${categoriaAtiva === categoria ? 'ativo' : ''}`}
            onClick={() => setCategoriaAtiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Grid de Itens */}
      <div className="cardapio-grid">
        {itensCardapio
          .filter(item => item.categoria === categoriaAtiva)
          .map(item => (
            <div key={item.id} className="card-item">
              <div className="card-image-wrapper">
                <img className="card-image" src={item.imagem} alt={item.nome} loading="lazy" />
              </div>
              <div className="card-info">
                <h3>{item.nome}</h3>
                <p>{item.descricao}</p>
                <div className="card-footer">
                  <div>
                    <span className="card-preco-label">A partir de</span>
                    <strong className="card-preco">{item.preco}</strong>
                  </div>
                  <button className="card-btn-add">Adicionar</button>
                </div>
              </div>
            </div>
          ))}
      </div>

    </div>
  );
}

export default Cardapio;