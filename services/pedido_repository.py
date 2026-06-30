from database import cursor, conn


def listar_pedidos():
    cursor.execute("SELECT * FROM pedidos")
    return cursor.fetchall()


def buscar_pedido_por_id(pedido_id: int):
    cursor.execute(
        "SELECT * FROM pedidos WHERE id = ?",
        (pedido_id,)
    )
    return cursor.fetchone()