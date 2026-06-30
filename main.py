from fastapi import FastAPI
from dotenv import load_dotenv
import os 

from routes.cardapio import router as cardapio_router
from routes.pedidos import router as pedidos_router
from routes.cliente import router as cliente_router
from routes.endereco import router as endereco_router
from routes.pagamento import router as pagamento_router

load_dotenv()

app = FastAPI(
    title=os.getenv("APP_NAME"),
    description=os.getenv("DESCRIPTION"),
    version=os.getenv("VERSION")
)

app.include_router(cardapio_router)
app.include_router(pedidos_router)
app.include_router(cliente_router)
app.include_router(endereco_router)
app.include_router(pagamento_router)

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
            