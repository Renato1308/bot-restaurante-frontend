import sqlite3

conn = sqlite3.connect(
    "restaurante.db",
    check_same_thread=False
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT,
    telefone TEXT,
    endereco TEXT,
    pagamento TEXT,
    produto TEXT,
    valor REAL  
)
""")

conn.commit()