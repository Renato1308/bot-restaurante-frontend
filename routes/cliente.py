from fastapi import APIRouter

router = APIRouter()

@router.get("/cliente")
def cliente():
    
    return {
        "nome": "Renato",
        "telefone": "(11)99999-9999",
        "bairro": "Centro"
    }