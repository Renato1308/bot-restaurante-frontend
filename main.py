from fastapi import FastAPI
import json

app = FastAPI()

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