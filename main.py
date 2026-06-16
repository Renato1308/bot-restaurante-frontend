from fastapi import FastAPI
from database import conn, cursor
from routes.cardapio import router as cardapio_router
from routes.pedidos import router as pedidos_router
from routes.cliente import router as cliente_router
import json

app = FastAPI()

app.include_router(cardapio_router)
app.include_router(pedidos_router)
app.include_router(cliente_router)

pedidos = []

@app.get("/")
def home():
    return {"mensagem": "Renato criou sua primeira API"}

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