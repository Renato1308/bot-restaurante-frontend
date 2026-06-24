from fastapi import APIRouter
from database import conn, cursor
from models.pedido import Pedido, PedidoResponse
import json

router = APIRouter()

@router.get(
    "/pedido-banco/{pedido_id}",
    response_model=PedidoResponse
)
def buscar_pedido_banco(pedido_id: int):
    
    cursor.execute(
        "SELECT * FROM pedidos WHERE id = ?",
        (pedido_id,)
    )
    
    pedido = cursor.fetchone()
    
    if not pedido:
        return {"erro": "Pedido não encontrado"}
    
    return {
        "id": pedido[0],
        "cliente": pedido[1],
        "telefone": pedido[2],
        "endereco": pedido[3],
        "pagamento": pedido[4],
        "produto": pedido[5],
        "valor": pedido[6]
    }

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
 
@router.put("/pedido-banco/{pedido_id}")
def atualizar_pedido(pedido_id: int, pedido: Pedido):
     
    cursor.execute(
        """
        UPDATE pedidos
        SET cliente = ?,
            telefone = ?,
            endereco = ?,
            pagamento = ?,
            produto = ?,
            valor = ?
        WHERE id = ?
        """,
        (
            pedido.cliente,
            pedido.telefone,
            pedido.endereco,
            pedido.pagamento,
            pedido.produto,
            pedido.valor,
            pedido_id 
        )
    )
     
    conn.commit()
     
    return {
        "mensagem": "Pedido atualizado com sucesso"
    }