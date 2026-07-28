from pydantic import BaseModel

class Pedido(BaseModel):
    
    cliente: str
    telefone: str
    endereco: str
    pagamento: str
    produto: str
    valor: float
    
class PedidoResponse(Pedido):
    id: int
    