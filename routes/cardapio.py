from fastapi import APIRouter
import json

router = APIRouter()

@router.get(
    "/cardapio",
    tags=["Cardápio"],
    summary="Listar cardápio",
    description="Retorna todos os produtosdo cardápio."
)
def cardapio():
    
    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)
        
    return dados

@router.get(
    "/produto/{produto_id}",
    tags=["Cardápio"],
    summary="Buscar produto por ID",
    description="Retorna um produto específico do cardápio."
)
def buscar_produto(produto_id: int):

    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)

    for produto in dados:
        if produto["id"] == produto_id:
            return produto

    return {"erro": "Produto não encontrado"}

@router.get(
    "/buscar/{nome_produto}",
    tags=["Cardápio"],
    summary="Buscar produto por nome",
    description="Pesquisa produtos do cardápio pelo nome."
)
def buscar_por_nome(nome_produto: str):
    
    with open("data/cardapio.json", "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)
        
    resultados = []
    
    for produto in dados:
        
        if nome_produto.lower() in produto["nome"].lower():
            resultados.append(produto)
            
    return resultados