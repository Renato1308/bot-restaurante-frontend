import os
import sys

# Adiciona o diretório raiz do projeto ao Python Path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Define as configurações do Django explicitamente para o ambiente Serverless
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

from core.wsgi import application

# A Vercel procura por uma variável chamada 'app'
app = application