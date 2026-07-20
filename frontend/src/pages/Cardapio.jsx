import React, { useState, useEffect } from "react";
import "../styles/Cardapio.css"; // Garanta que este caminho está exatamente assim

export default function Cardapio() {
  const [itens, setItens] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  useEffect(() => {
    fetch("http://localhost:8000/cardapio")
      .then((res) => res.json())
      .then((data) => setItens(data))
      .catch((err) => console.error("Erro ao buscar cardápio:", err));
  }, []);

  // Lista de categorias únicas para os botões de filtro
  const categorias = ["Todos", "lanches", "Pizzas", "Hambúrgueres"];

  // Filtra os itens com base na categoria selecionada
  const itensFiltrados = categoriaAtiva === "Todos"
    ? itens
    : itens.filter(item => item.categoria === categoriaAtiva);

  return (
    <div className="cardapio-container">
      <header className="cardapio-header">
        <h2>🎒 Nosso Cardápio Digital</h2>
        <p>Massas artesanais, vinhos finos e experiências inesquecíveis</p>
      </header>

      {/* Botões de Filtro por Categoria */}
      <div className="categoria-filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`filtro-btn ${categoriaAtiva === cat ? "ativo" : ""}`}
            onClick={() => setCategoriaAtiva(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid de Pratos */}
      <div className="cardapio-grid">
        {itensFiltrados.map((item) => (
          <div key={item.id} className="card-item">
            {/* Se o seu backend enviar uma URL de imagem, ela aparece aqui. 
                Caso contrário, exibe uma imagem padrão de comida deliciosa */}
            <div className="card-image-wrapper">
              <img 
                src={item.imagem_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"} 
                alt={item.nome} 
                className="card-image"
              />
            </div>

            <div className="card-info">
              <span className="card-categoria">{item.categoria}</span>
              <h3>{item.nome}</h3>
              <p className="card-descricao">
                {item.descricao || "Sem descrição disponível no momento."}
              </p>
              
              <div className="card-footer">
                <span className="card-preco-label">Preço</span>
                <span className="card-preco">
                  {Number(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}