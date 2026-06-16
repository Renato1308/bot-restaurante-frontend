from fastapi import APIRouter

router = APIRouter()

@router.get("/endereco")
def endereco():
    
    return {
        "rua": "Rua das Flores",
        "numero": "123",
        "complemento": "Apartamento 10",
        "bairro": "Centro"
    }