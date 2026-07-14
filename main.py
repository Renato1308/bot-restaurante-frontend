import os
import json
import time
import requests
import urllib3
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Desativa os avisos chatos do urllib3 no terminal por conta do SSL desativado
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 1. Carrega as variáveis de ambiente (.env)
load_dotenv()

# 2. Inicializa o FastAPI
app = FastAPI(
    title=os.getenv("APP_NAME", "Restaurante do Renato"),
    description=os.getenv("DESCRIPTION", "Chatbot do Restaurante"),
    version=os.getenv("VERSION", "1.0.0")
)

# 3. Liberação de segurança (CORS) para o React conseguir conversar com o Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chave de API direta do seu Gemini
API_KEY = ""

# 4. Define as instruções de comportamento do bot e o cardápio oficial
INSTRUCOES_DO_SISTEMA = """
Você é o atendente virtual super educado e prestativo do "Renato's Bistro".
Seu objetivo é ajudar os clientes a tirarem dúvidas sobre o cardápio e fazerem pedidos.

Aqui está o nosso cardápio oficial:
1. Hambúrguer Bistro Gourmet (R$ 35,00) - Carne artesanal de 150g, queijo cheddar derretido, bacon crocante e maionese da casa.
2. Massa Suprema (R$ 42,00) - Fettuccine artesanal ao molho carbonara com queijo parmesão ralado na hora.
3. Batata Rústica (R$ 18,00) - Porção de batatas fritas com casca, salpicadas com alecrim e páprica.
4. Bebidas: Refrigerante Lata (R$ 6,00), Suco Natural de Laranja (R$ 8,00).

Regras de comportamento:
- Seja sempre simpático e use emojis de comida de vez em quando.
- Se o cliente perguntar algo que não está no cardápio, diga educadamente que não trabalhamos com esse prato.
- Responda de forma curta e direta para o chat não ficar poluído.
"""

# 5. Define a estrutura de dados que o React vai enviar ao Python
class MensagemUsuario(BaseModel):
    texto: str

# Importação e inclusão das rotas adicionais
try:
    from routes.cardapio import router as cardapio_router
    from routes.pedidos import router as pedidos_router
    from routes.cliente import router as cliente_router
    from routes.endereco import router as endereco_router
    from routes.pagamento import router as pagamento_router

    app.include_router(cardapio_router)
    app.include_router(pedidos_router)
    app.include_router(cliente_router)
    app.include_router(endereco_router)
    app.include_router(pagamento_router)
except ImportError as e:
    print(f"Aviso ao carregar sub-rotas: {e}")

# Rotas de teste
@app.get("/")
def home():
    return {"mensagem": "Renato criou sua primeira API"}

@app.get("/resumo/{produto_id}")    
def resumo_pedido(produto_id: int):
    try:
        with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
            dados = json.load(arquivo)
            for produto in dados:
                if produto["id"] == produto_id:
                    taxa_entrega = 8.0
                    return {
                        "cliente": "Renato",
                        "produto": produto["nome"],
                        "valor": produto["preco"],
                        "taxa_entrega": taxa_entrega,
                        "total": produto["preco"] + taxa_entrega
                    }
    except FileNotFoundError:
        return {"erro": "Arquivo cardapio.json não encontrado"}
    return {"erro": "Produto não encontrado"}
    
@app.get("/carrinho")
def carrinho():
    itens = [
        {"nome": "Xis Coração", "preco": 32.0},
        {"nome": "Pizza Calabreza", "preco": 45.0}
    ]
    return {"itens": itens, "total": sum(item["preco"] for item in itens)}

@app.post("/chat")
def responder_chat(dados: MensagemUsuario):
    # Endpoint padrão e estável com a sua chave nova
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"Instruções do Sistema:\n{INSTRUCOES_DO_SISTEMA}\n\nCliente: {dados.texto}"}
                ]
            }
        ]
    }
    
    try:
        resposta = requests.post(url, headers=headers, json=payload, verify=False, timeout=15.0)
        
        if resposta.status_code == 200:
            resultado_json = resposta.json()
            texto_resposta = resultado_json['candidates'][0]['content']['parts'][0]['text']
            return {"resposta": texto_resposta}
        else:
            return {"resposta": f"Erro na API do Google (Código {resposta.status_code})."}
            
    except Exception as e:
        return {"resposta": "Não consegui me conectar aos servidores."}