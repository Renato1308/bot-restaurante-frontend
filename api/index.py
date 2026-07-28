import os
import sys

# Adiciona o diretório raiz do projeto ao Python Path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.wsgi import application

# A Vercel procura por uma variável chamada 'app'
app = application