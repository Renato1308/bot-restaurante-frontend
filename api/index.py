import os
import sys
from pathlib import Path

# Adiciona o diretório raiz do projeto ao Python Path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Força a criação da pasta staticfiles na Vercel antes de carregar o app
from django.core.management import call_command
from django.core.wsgi import get_wsgi_application

try:
    call_command('collectstatic', '--noinput', '--clear')
except Exception as e:
    print(f"Erro no collectstatic: {e}")

app = get_wsgi_application()