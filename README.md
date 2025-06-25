# 🌱 EcoMarket

> Projeto Full Stack para disciplina de testes — Faculdade  
> Marketplace de produtos ecológicos com autenticação, listagem de produtos, upload de imagens e painel administrativo.

---

## 🔗 Tecnologias Utilizadas

### 💻 Frontend

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [Testing Library](https://testing-library.com/)

### 🧠 Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)

---

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuários
- 🛒 Cadastro de produtos com imagem e descrição
- 👔 Gerenciamento de usuários e produtos
- 🔍 Filtro e busca de produtos
- 🔐 Autenticação com JWT
- 🧪 Testes automatizados no frontend e backend
- ⚙️ Integração contínua com GitHub Actions

---

## 🛠️ Como rodar o projeto localmente

### 📦 Requisitos

- Node.js 18+
- MongoDB local ou MongoDB Atlas

### 🔄 Instalação

```bash
# Clonar o repositório
git clone https://github.com/ricardoiwata/eco-market.git

# Acessar pastas e instalar dependências
cd eco-market/ecomarket-frontend
npm install

cd ../eco-market-backend
npm install
```

### 🖥️ Rodar o frontend

```bash
cd ecomarket-frontend
npm start
```

### 🧪 Rodar os testes do frontend

```bash
npm test -- --watchAll=false
```

### 🔙 Rodar o backend

```bash
cd ../eco-market-backend/src
node index.js
```

### 🧪 Testes do backend

```bash
npm test
```

> 💡 Os testes do backend usam `mongodb-memory-server`, não precisa ter o banco ativo para os testes!

### 🦾 Testes usando robot
``` bash
# Instale o robot e a selenium library (Tenha o python instalado no seu computador)
pip install robotframework
pip install robotframework-seleniumlibrary

# Acessar a pasta dos testes
cd eco-market/robot-tests

# Rodar o comando para rodar todos os testes, lembre-se que para testes robot é necessário ter a aplicação rodando no computador!

python -m robot .
```

---

## 🤖 GitHub Actions

Este projeto roda testes automaticamente em cada **push** e **pull request**.  
Veja os workflows em `.github/workflows`.

![CI Backend](https://github.com/ricardoiwata/eco-market/actions/workflows/backend.yml/badge.svg)
![CI Frontend](https://github.com/ricardoiwata/eco-market/actions/workflows/frontend.yml/badge.svg)

---

## 📚 Licença

Projeto acadêmico — Uso livre para fins educacionais.  
Feito com 💚 por [Ricardo Iwata](https://github.com/ricardoiwata)
