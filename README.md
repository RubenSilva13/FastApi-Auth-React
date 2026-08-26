# FastAPI Auth — Frontend

Frontend em React para uma API de autenticação e gestão de tarefas, com autenticação por JWT.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📸 Screenshots

<img width="1919" height="913" alt="Captura de ecrã 2026-08-26 173729" src="https://github.com/user-attachments/assets/5607787d-df6c-44bc-af4c-fe42ea2c8c85" />
<img width="1908" height="915" alt="Captura de ecrã 2026-08-26 172838" src="https://github.com/user-attachments/assets/b20421b4-0cf0-4c0e-85a3-0a1ab0e884f5" />
<img width="1919" height="909" alt="Captura de ecrã 2026-08-26 161533" src="https://github.com/user-attachments/assets/f15eb39e-9be3-459f-b367-441ee86fbc4d" />



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
