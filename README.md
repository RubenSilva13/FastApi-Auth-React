# FastAPI Auth — Frontend

Frontend em React para uma API de autenticação e gestão de tarefas, com autenticação por JWT.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📸 Screenshots

<!-- Põe o cursor na linha em branco aqui em baixo e arrasta as tuas 3 imagens (registo, login, tarefas). -->


## 🛠️ Stack

- React
- JavaScript
- Tailwind CSS
- Axios — pedidos à API
- React Router — navegação

## ✨ Funcionalidades

- Registo e login de utilizadores
- Autenticação com JWT (token guardado no browser)
- Gestão de tarefas: criar, listar, editar e apagar

## 🚀 Correr localmente

Este frontend precisa da API a correr. Primeiro sobe o backend (repositório [FastApi-Auth-Rest](https://github.com/RubenSilva13/FastApi-Auth-Rest)) com `docker compose up`. Depois:

```bash
git clone https://github.com/RubenSilva13/FastApi-Auth-React
cd FastApi-Auth-React
npm install
npm start
```

A app abre em `http://localhost:3000`. O endereço da API está em `src/services/api.js` — para testar contra o backend local, muda o `baseURL` para `http://localhost:8000`.

## 🔗 Relacionado

- **Backend (FastAPI):** [FastApi-Auth-Rest](https://github.com/RubenSilva13/FastApi-Auth-Rest)
