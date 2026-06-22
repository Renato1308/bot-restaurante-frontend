from fastapi import APIRouter
from database import conn, cursor
from models.pedido import Pedido
import json

router = APIRouter()

@router.get("/pedidos-banco")
def listar_pedidos_banco():
    
    cursor.execute("SELECT * FROM pedidos")
    
    pedidos = cursor.fetchall()
    
    return pedidos

@router.get("/pedido/{produto_id}")
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
    
@router.post("/novo-pedido")
def criar_pedido(pedido: Pedido):
    
    cursor.execute(
        """
        INSERT INTO pedidos
        (cliente, telefone, endereco, pagamento, produto, valor)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            pedido.cliente,
            pedido.telefone,
            pedido.endereco,
            pedido.pagamento,
            pedido.produto,
            pedido.valor
        )
    )
    
    conn.commit()
    
    return {
        "mensagem": "Pedido cadastrado com sucesso"
    }