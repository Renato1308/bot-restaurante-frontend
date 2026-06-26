from fastapi import APIRouter
from models.cliente import Cliente

router = APIRouter()

@router.get(
    "/cliente",
    response_model=Cliente,
    tags=["Cliente"],
    summary="Consultar Cliente",
    description="Retorna os dados do cliente."
)
def cliente():
    
    return {
        "nome": "Renato",
        "telefone": "(11)99999-9999",
        "bairro": "Centro"
    }