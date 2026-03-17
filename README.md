# 💰 Sistema de Controle Financeiro

Projeto desenvolvido para a disciplina **Projeto de Software**.

O objetivo do sistema é permitir o gerenciamento de informações financeiras, começando pelo cadastro de usuários.

---

# 📚 Disciplina

Software Product Analysis,specification,Project e Implementation

---

# 👨‍💻 Aluno

Felippe Pereira

---

# 🛠 Tecnologias Utilizadas

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express

### Banco de Dados
- PostgreSQL

---

# 🏗 Arquitetura do Sistema

O sistema foi desenvolvido utilizando **arquitetura de 3 camadas**:

```
Frontend (React)
       ↓
Backend (Node.js / Express)
       ↓
Banco de Dados (PostgreSQL)
```

---

# 🚀 Funcionalidade Implementada (AC1)

Nesta primeira entrega foi implementada a funcionalidade de:

✔ Cadastro de usuário  
✔ Integração entre frontend e backend  
✔ Armazenamento de dados no banco PostgreSQL  

Fluxo da aplicação:

```
Usuário preenche formulário
        ↓
Frontend envia requisição para API
        ↓
Backend processa a requisição
        ↓
Dados são armazenados no PostgreSQL
```
# 🚀 Funcionalidades Implementadas (AC2)

Nesta segunda entrega foram implementadas as seguintes funcionalidades:

✔ Cadastro de usuário  
✔ Sistema de Login  
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

# 📂 Estrutura do Projeto

```
controle-financeiro
│
├── backend
│   ├── index.js
│   ├── db.js
│   ├── package.json
│
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── main.jsx
│
├── .gitignore
├── README.md
```

---

# ▶ Como Executar o Projeto

## 1️⃣ Clonar o repositório

```
git clone https://github.com/Felippezs/controle-financeiro.git
```

Entrar na pasta do projeto:

```
cd controle-financeiro
```

---

# ⚙️ Executar Backend

Entrar na pasta:

```
cd backend
```

Instalar dependências:

```
npm install
```

Executar servidor:

```
node index.js
```

Servidor irá rodar em:

```
http://localhost:3000
```

---

# ⚙️ Executar Frontend

Abrir outro terminal.

Entrar na pasta:

```
cd frontend
```

Instalar dependências:

```
npm install
```

Executar aplicação:

```
npm run dev
```

Frontend irá rodar em:

```
http://localhost:5173
```

---

# 🗄 Banco de Dados

Banco utilizado:

PostgreSQL

Nome do banco:

```
controle_financeiro
```

Tabela utilizada:

```
users
```

Campos da tabela:

- id
- name
- email
- password

---

# 📹 Demonstração

A funcionalidade da sprint apresenta:

✔ Cadastro de usuário  
✔ Integração entre frontend e backend  
✔ Persistência dos dados no banco de dados
---
