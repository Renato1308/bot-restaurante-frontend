import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

# 1. Carrega as variáveis do .env
load_dotenv()

# 2. Inicializa o cliente da Groq
groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key) if groq_api_key else None

# 3. Inicializa o FastAPI
app = FastAPI(
    title=os.getenv("APP_NAME", "Restaurante do Renato"),
    description=os.getenv("DESCRIPTION", "Chatbot do Restaurante"),
    version=os.getenv("VERSION", "1.0.0")
)

# 4. Liberação de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 5. Instruções do Atendente e Cardápio
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

DIRETORIO_ATUAL = os.path.dirname(os.path.abspath(__file__))
CAMINHO_JSON = os.path.join(DIRETORIO_ATUAL, "data", "cardapio.json")

class MensagemUsuario(BaseModel):
    texto: str

class ItemCardapio(BaseModel):
    id: int
    nome: str
    categoria: str
    preco: float

def ler_json():
    if not os.path.exists(CAMINHO_JSON):
        return []
    try:
        with open(CAMINHO_JSON, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Erro ao ler arquivo JSON: {e}")
        return []

def salvar_json(dados):
    try:
        os.makedirs(os.path.dirname(CAMINHO_JSON), exist_ok=True)
        with open(CAMINHO_JSON, "w", encoding="utf-8") as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)
    except Exception as e:
        print(f"Erro ao salvar arquivo JSON: {e}")

# Importação das sub-rotas
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

@app.get("/")
def home():
    return {"mensagem": "API do Renato's Bistro rodando com sucesso!"}

@app.post("/cardapio", response_model=ItemCardapio)
def criar_item(novo_item: ItemCardapio):
    cardapio_atual = ler_json()
    cardapio_atual.append(novo_item.dict())
    salvar_json(cardapio_atual)
    return novo_item

# Rota principal do Chatbot - GROQ
@app.post("/chat")
def responder_chat(dados: MensagemUsuario):
    if not client:
        return {"resposta": "Erro: A chave GROQ_API_KEY não foi configurada no arquivo .env."}

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": INSTRUCOES_DO_SISTEMA},
                {"role": "user", "content": dados.texto}
            ],
            temperature=0.7,
        )
        return {"resposta": completion.choices[0].message.content}

    except Exception as e:
        print(f"Erro na chamada da Groq: {e}")
        return {"resposta": f"Erro ao conectar com a IA (Groq): {str(e)}"}