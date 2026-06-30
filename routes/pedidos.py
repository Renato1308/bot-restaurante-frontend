from fastapi import APIRouter, HTTPException
from database import conn, cursor
from models.pedido import Pedido, PedidoResponse
from services.pedido_service import pedido_para_dict
import json

router = APIRouter()

@router.get(
    "/pedidos-banco",
    response_model=list[PedidoResponse],
    tags=["Pedidos"],
    summary="Listar pedidos",
    description="Retorna todos os pedidos cadastrados no banco de dados."
)
def listar_pedidos(
    cliente: str = None,
    pagamento: str = None,
    valor_minimo: float = None,
    valor_maximo: float = None
):
    
    if cliente:
    
        cursor.execute(
            "SELECT * FROM pedidos WHERE cliente = ?",
            (cliente,)
        )
    elif pagamento:
        
        cursor.execute(
            "SELECT * FROM pedidos WHERE pagamento = ?",
            (pagamento,)
        )
        
    elif valor_minimo is not None and valor_maximo is not None:
        
        cursor.execute(
            """
            SELECT * FROM pedidos
            WHERE valor BETWEEN ? AND ?
            """,
            (valor_minimo, valor_maximo)
        )
    
    else:
    
        cursor.execute(
            "SELECT * FROM pedidos"
        )
        
    pedidos = cursor.fetchall()
    
    resultado = []
    
    for pedido in pedidos:
        resultado.append(
            pedido_para_dict(pedido)
        )
            
    return resultado

    pedido = cursor.fetchone()
    
    if not pedido:
        raise HTTPException(
            status_code=404,
            detail="Pedido não encontrado" 
        )
    
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
    
@router.post(
    "/novo-pedido",
    tags=["Pedidos"],
    summary="Cadastrar um novo pedido",
    description="Cria um novo pedido no banco de dados."
)
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
        "mensagem": "Pedido cadastrado com sucesso",
        "id": cursor.lastrowid
    }
 
@router.put(
    "/pedido-banco/{pedido_id}",
    tags=["Pedidos"],
    summary="Atualiza um pedido",
    description="Atualiza os dados de um pedido existente."
)
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
    
@router.delete(
    "/pedido-banco/{pedido_id}",
    tags=["Pedidos"],
    summary="Excluir um pedido",
    description="Remove um pedido do banco de dados."
)
def deletar_pedido(pedido_id: int):
    
    cursor.execute(
        "DELETE FROM pedidos WHERE id = ?",
        (pedido_id,)
    )
    
    conn.commit()
    
    return {
        "mensagem": "Pedido removido com sucesso"
    }
 
@router.get(
    "/pedido-banco/{pedido_id}",
    response_model=PedidoResponse,
    tags=["Pedidos"],
    summary="Buscar pedido por ID",
    description="Retorna um pedido específico pelo seu ID."
)
def buscar_pedido_banco(pedido_id: int):
    
    cursor.execute(
        "SELECT * FROM pedidos WHERE id = ?",
        (pedido_id,)
    )
    
    pedido = cursor.fetchone()
    
    if not pedido:
        raise HTTPException(
            status_code=404,
            detail="Pedido não encontrado"
        )
        
    return pedido_para_dict(pedido)