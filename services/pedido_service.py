def pedido_para_dict(pedido):
    
    return{
        "id": pedido[0],
        "cliente": pedido[1],
        "telefone": pedido[2],
        "endereco": pedido[3],
        "pagamento": pedido[4],
        "produto": pedido[5],
        "valor": pedido[6]
    }