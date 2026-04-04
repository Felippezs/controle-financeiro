# 💰 Sistema de Controle Financeiro

Projeto desenvolvido para a disciplina Projeto de Software.

O objetivo do sistema é permitir o gerenciamento de informações financeiras, começando pelo cadastro e autenticação de usuários.

---

# 📚 Disciplina

Software Product Analysis, Specification, Project and Implementation

---

# 👨‍💻 Aluno

Felippe Pereira  
RA: 2303780

---

# 🛠 Tecnologias Utilizadas

Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

Backend
- Node.js
- Express

Banco de Dados
- PostgreSQL

---

# 🏗 Arquitetura do Sistema

O sistema foi desenvolvido utilizando arquitetura de 3 camadas:

Frontend (React)  
↓  
Backend (Node.js / Express)  
↓  
Banco de Dados (PostgreSQL)

---

# 🚀 Funcionalidades Implementadas

## AC1

Nesta primeira entrega foram implementadas as seguintes funcionalidades:

✔ Estrutura inicial do projeto  
✔ Criação do backend com Node.js  
✔ Conexão com banco de dados PostgreSQL  
✔ API para cadastro de usuários  
✔ Integração entre frontend e backend  
✔ Persistência de dados no banco de dados  

Fluxo da aplicação:

Usuário preenche formulário  
↓  
Frontend envia requisição para API  
↓  
Backend processa a requisição  
↓  
Dados são armazenados no PostgreSQL  

---

## AC2

Nesta segunda entrega foram implementadas as seguintes funcionalidades:

✔ Sistema de Login de usuários  
✔ Cadastro de novos usuários  
✔ Logout do usuário  
✔ Listagem de usuários cadastrados  
✔ Exclusão de usuários  
✔ Integração entre frontend e backend  
✔ Persistência dos dados no banco PostgreSQL  

Fluxo da aplicação:

Usuário realiza cadastro ou login  
↓  
Frontend envia requisição para API  
↓  
Backend processa a requisição  
↓  
Dados são armazenados ou consultados no PostgreSQL  
↓  
Informações são retornadas para o frontend  

---

## AC3

Nesta terceira entrega foram implementadas as seguintes funcionalidades:

✔ Associação de transações ao usuário (user_id)  
✔ Registro de receitas e despesas  
✔ Listagem de transações por usuário  
✔ Cálculo automático do saldo  
✔ Separação entre receitas e despesas  
✔ Exclusão de transações  
✔ Validação de dados no formulário  
✔ Garantia de que cada usuário visualiza apenas seus próprios dados  

Fluxo da aplicação:

Usuário realiza login  
↓  
Sistema identifica o usuário pelo ID  
↓  
Usuário registra uma transação (receita ou despesa)  
↓  
Backend salva a transação vinculada ao usuário  
↓  
Frontend busca apenas as transações daquele usuário  
↓  
Saldo é calculado automaticamente  

---

# 📂 Estrutura do Projeto

controle-financeiro

backend  
index.js  
db.js  
package.json  

frontend  
src  
App.jsx  
main.jsx  

.gitignore  
README.md  

---

# ▶ Como Executar o Projeto

1 - Clonar o repositório

git clone https://github.com/Felippezs/controle-financeiro.git

Entrar na pasta do projeto:

cd controle-financeiro

---

# ⚙️ Executar Backend

Entrar na pasta:

cd backend

Instalar dependências:

npm install

Executar servidor:

node index.js

Servidor irá rodar em:

http://localhost:3000

---

# ⚙️ Executar Frontend

Abrir outro terminal.

Entrar na pasta:

cd frontend

Instalar dependências:

npm install

Executar aplicação:

npm run dev

Frontend irá rodar em:

http://localhost:5173

---

# 🗄 Banco de Dados

Banco utilizado:

PostgreSQL

Nome do banco:

controle_financeiro

Tabela utilizada:

users

Campos da tabela:

id  
name  
email  
password  

Tabela utilizada:

transactions

Campos da tabela:

id  
user_id  
description  
amount  
type  

---
