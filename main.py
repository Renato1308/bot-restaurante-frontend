from fastapi import FastAPI
import json
import sqlite3

app = FastAPI()

conn = sqlite3.connect("restaurante.db",check_same_thread=False)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT,
    telefone TEXT,
    endereco TEXT,
    pagamento TEXT,
    produto TEXT,
    valor REAL  
)
""")

conn.commit()

pedidos = []

@app.get("/")
def home():
    return {"mensagem": "Renato criou sua primeira API"}

@app.get("/cardapio")
def cardapio():

    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)

    return dados

@app.get("/produto/{produto_id}")
def buscar_produto(produto_id: int):

    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)

    for produto in dados:
        if produto["id"] == produto_id:
            return produto

    return {"erro": "Produto não encontrado"}

@app.get("/buscar/{nome_produto}")
def buscar_por_nome(nome_produto: str):
    
    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)
        
    resultados = []
    
    for produto in dados:
        
        if nome_produto.lower() in produto["nome"].lower():
            resultados.append(produto)
            
    return resultados

@app.get("/pedido/{produto_id}")
def fazer_pedido(produto_id: int):
    
    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)
        
        
    for produto in dados:
        
        if produto["id"] == produto_id:
            
            cursor.execute(
    """
    INSERT INTO pedidos
    (cliente, telefone, endereco, pagamento, produto, valor)
    Values (?, ?, ?, ?, ?, ?)
    """,
    (
        "Renato",
        "(11)99999-9999",
        "Rua das Flores 123",
        "PIX",
        produto["nome"],
        produto["preco"]
    )
)
       
        conn.commit()
            
    return {
                "mensagem": "pedido adicionado",
                "produto": produto["nome"],
                "valor": produto["preco"]
            }
    return {"erro": "Produto não encontrado"}

@app.get("/resumo/{produto_id}")    
def resumo_pedido(produto_id: int):
    
    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)
        
        for produto in dados:
            
            if produto["id"] == produto_id:
                
                taxa_entrega = 8.0
                
                total = produto["preco"] + taxa_entrega
                
                return {
                    "cliente": "Renato",
                    "produto": produto["nome"],
                    "valor": produto["preco"],
                    "taxa_entrega": taxa_entrega,
                    "total": total
                }
        return {"erro": "Produto não encontrado"}
    
@app.get("/carrinho")
def carrinho():
    
    itens = [
        {
            "nome": "Xis Coração",
            "preco": 32.0
        },
        {
            "nome": "Pizza Calabreza",
            "preco": 45.0
        }
    ]
    
    total = 0
    
    for item in itens:
        total += item["preco"]
        
    return {
        "itens": itens,
        "total": total
    }
    
@app.get("/cliente")
def cliente ():
    
    return {
        "nome": "Renato",
        "telefone": "(11)99999-9999",
        "bairro": "Centro"
    }
    
@app.get("/novo-pedido/{produto_id}")
def novo_pedido(produto_id: int):
    
    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)
        
    for produto in dados:
        
        if produto["id"] == produto_id:
            
            pedidos.append(produto)
            
            return {
                "mensagem": "Produto adicionado",
                "produto": produto
            }
            
    return {"erro": "Produto não encontrado"}

@app.get("/pedidos")
def listar_pedidos():
    
    return pedidos

@app.get("/total-pedidos")
def total_pedidos():
    
    total = 0
    
    for pedido in pedidos:
        total += pedido["preco"]
        
    return {
        "quantidade": len(pedidos),
        "total": total
        
    }
    
@app.get("/endereco")
def endereco():
    
    return {
        "rua": "Rua das Flores",
        "numero": "123",
        "complemento": "Apartamento 10",
        "bairro": "Centro"
    }
    
@app.get("/pagamento")
def pagamento():
    
    return {
        "forma": "PIX"
    }
    
@app.get("/pedido-completo")
def pedido_completo():
    
    total = 0
    
    for pedido in pedidos:
        total += pedido["preco"]
        
    return {
        "cliente": "Renato",
        "telefone": "(11)99999-9999",
        "itens": pedidos,
        "endereco": {
            "rua": "Rua das Flores",
            "numero": "123",
            "bairro": "Centro"
        },
        "pagamento": "PIX",
        "total": total
    }
    
@app.get("/pedidos-banco")
def listar_pedidos_banco():
    
    cursor.execute("SELECT * FROM pedidos")
    
    pedidos = cursor.fetchall()
    
    return pedidos

@app.get("/pedido-banco/{pedido_id}")
def buscar_pedido_banco(pedido_id: int):
    
    cursor.execute(
        "SELECT * FROM pedidos WHERE id = ?",
        (pedido_id,)
    )
    
    pedido = cursor.fetchone()
    
    if pedido:
        return pedido
    
    return{"Erro": "Pedido não encontrado"}

@app.get("/atualizar-pagamento/{pedido_id}/{novo_pagamento}")
def atualizar_pagamento(pedido_id: int, novo_pagamento: str):
    
    cursor.execute(
        "UPDATE pedidos SET pagamento = ? WHERE id = ?",
        (novo_pagamento, pedido_id)
    )
    
    conn.commit()
    
    return{
        "mensagem": "Pagamento atualizado com sucesso"
    }
    
@app.get("/deletar-pedido/{pedido_id}")
def deletar_pedido(pedido_id: int):
    
    cursor.execute(
        "DELETE FROM pedidos WHERE id = ?",
        (pedido_id,)
    )
    
    conn.commit()
    
    return{
        "mensagem": "Pedido removido com sucesso"
    }