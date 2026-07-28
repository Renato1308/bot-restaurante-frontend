#!/bin/bash

# Para o script imediatamente em caso de erro
set -e

# Instala as dependências do Python
python3 -m pip install -r requirements.txt

# Coleta os arquivos estáticos do Django
python3 manage.py collectstatic --noinput --clear

echo "BUILD CONCLUÍDO COM SUCESSO!"