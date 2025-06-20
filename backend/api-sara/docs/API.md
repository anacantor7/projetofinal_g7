## 📘 Documentação da API

API desenvolvida para gerenciamento de clientes, serviços, profissionais e agendamentos em salões de beleza.

### 🌐 Base URL

```
Local: http://localhost:3000
Online (Render): [em breve]
```

---

## 🔹 Clientes

- `GET /clientes`
- `GET /clientes/:id`
- `POST /clientes`
- `PUT /clientes/:id`
- `PUT /clientes/:id/ativo`
- `DELETE /clientes/:id`

---

## 🔹 Serviços

- `GET /servicos`
- `GET /servicos/:id`
- `POST /servicos`
- `PUT /servicos/:id`
- `PUT /servicos/:id/ativo`
- `DELETE /servicos/:id`

---

## 🔹 Tipos de Serviço

- `GET /tipos`
- `GET /tipos/:id`
- `POST /tipos`

---

## 🔹 Profissionais

- `GET /profissionais`
- `GET /profissionais/:id`
- `POST /profissionais`
- `PUT /profissionais/:id`
- `PUT /profissionais/:id/ativo`

---

## 🔹 Agendamentos

- `GET /agendamentos`

  - Suporta filtros: `?data=`, `?clienteId=`, `?profissionalId=`, `?data=...&hora=...`

- `GET /agendamentos/:id`
- `POST /agendamentos`
- `PUT /agendamentos/:id`
- `DELETE /agendamentos/:id`

> ⚠️ A API previne a criação de agendamentos duplicados para o mesmo profissional, data e horário.

---

## 💡 Observações

- Todos os endpoints utilizam `Content-Type: application/json`
- A API é pública (sem autenticação)
