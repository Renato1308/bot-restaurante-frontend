from fastapi import APIRouter

router = APIRouter()

@router.get("/pagamento")
def pagamento():
    
    return {
        "forma": "PIX"
    }
    