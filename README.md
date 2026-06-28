# 🍔 Bot Restaurante API

> 🚧 Projeto em desenvolvimento — novas funcionalidades estão sendo implementadas continuamente.

API REST desenvolvida com **FastAPI** para gerenciamento de pedidos de um restaurante.

O projeto foi criado com foco em aprendizado de desenvolvimento Backend utilizando Python e boas práticas de construção de APIs, servindo como base para futuras versões com React e Django.

---

## 🚀 Tecnologias

* Python 3
* FastAPI
* Pydantic
* SQLite
* Uvicorn
* Git e GitHub

---

## 📁 Estrutura do Projeto

```
bot-restaurante/
│
├── data/
├── models/
├── routes/
├── services/
├── venv/
├── database.py
├── main.py
├── README.md
└── restaurante.db
```

---

## 📌 Funcionalidades

### Cardápio

* Listar produtos
* Buscar produto por ID
* Buscar produtos pelo nome

### Cliente

* Consultar dados do cliente

### Pedidos

* Criar pedido
* Buscar pedido por ID
* Listar pedidos
* Atualizar pedido
* Excluir pedido
* Filtrar pedidos por cliente
* Filtrar pedidos por forma de pagamento
* Filtrar pedidos por faixa de preço

---

## ✅ Recursos implementados

* API REST com FastAPI
* Validação de dados utilizando Pydantic
* Documentação automática com Swagger
* Integração com banco de dados SQLite
* Respostas tipadas (`response_model`)
* Tratamento de erros utilizando `HTTPException`
* Organização do projeto em módulos (`routes`, `models` e `services`)

---

## ▶️ Como executar

1. Clone o repositório.

2. Crie um ambiente virtual:

```bash
python -m venv venv
```

3. Ative o ambiente virtual.

Windows:

```bash
venv\Scripts\activate
```

4. Instale as dependências:

```bash
pip install fastapi uvicorn pydantic
```

5. Execute a aplicação:

```bash
uvicorn main:app --reload
```

---

## 📖 Documentação

Após iniciar a aplicação, acesse:

Swagger:

http://127.0.0.1:8000/docs

Redoc:

http://127.0.0.1:8000/redoc

---

## 🎯 Próximas melhorias

* React consumindo a API
* Deploy da aplicação
* PostgreSQL
* Docker
* Autenticação de usuários
* Django REST Framework
* Dashboard administrativo

---

## 👨‍💻 Autor

**Renato da Silva Araujo**

Projeto desenvolvido como parte dos estudos em desenvolvimento Backend com Python, FastAPI e APIs REST, com foco na construção de um portfólio profissional.

## 🚧 Status do Projeto

**Em desenvolvimento.**

Este projeto faz parte da minha jornada de aprendizado em Desenvolvimento Backend com Python.

Novas funcionalidades estão sendo implementadas continuamente, incluindo melhorias na arquitetura, integração com React, migração para PostgreSQL, autenticação, deploy e, futuramente, uma versão completa utilizando Django e Django REST Framework.

O objetivo é evoluir este projeto gradualmente até transformá-lo em uma aplicação Full Stack moderna e pronta para produção.
