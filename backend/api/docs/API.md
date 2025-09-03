## 📘 Documentação da API

API desenvolvida para gerenciamento de clientes, serviços, tipos de serviços, profissionais e agendamentos em salões de beleza.

## 🌐 Base URL da API

- Local: [http://localhost:3000](http://localhost:3000)
- Online (Render): [https://agenda-inteligente-backend.onrender.com](https://agenda-inteligente-backend.onrender.com)

---

## 🔹 Clientes

- `GET /clientes`
- `GET /clientes/:id`
- `POST /clientes`

📥 **Exemplo de requisição**:

```json
{
  "nome": "Luna Gustavo",
  "telefone": "11999999999",
  "observacoes": "Cliente nova"
}
```

- `PUT /clientes/:id`
- `PUT /clientes/:id/ativo`
- `DELETE /clientes/:id`

---

## 🔹 Tipos de Serviço

- `GET /tipos`
- `GET /tipos/:id`
- `POST /tipos`

📥 **Exemplo de requisição**:

```json
{
  "nome": "Cabelo"
}
```

---

## 🔹 Serviços

- `GET /servicos`
- `GET /servicos/:id`
- `POST /servicos`

📥 **Exemplo de requisição**:

```json
{
  "nome": "Corte",
  "duracao": 20,
  "preco": 80,
  "tipoId": 1
}
```

- `PUT /servicos/:id`
- `PUT /servicos/:id/ativo`
- `DELETE /servicos/:id`

---

## 🔹 Profissionais

- `GET /profissionais`
- `GET /profissionais/:id`
- `POST /profissionais`

📥 **Exemplo de requisição**:

```json
{
  "nome": "Juliana Costa",
  "telefone": "11988887777",
  "especialidade": "Cabelo"
}
```

- `PUT /profissionais/:id`
- `PUT /profissionais/:id/ativo`

---

## 🔹 Agendamentos

- `GET /agendamentos`

  - Suporta filtros: `?data=`, `?clienteId=`, `?profissionalId=`, `?data=...&hora=...`

- `GET /agendamentos/:id`
- `POST /agendamentos`

📥 **Exemplo de requisição**:

```json
{
  "clienteId": 1,
  "servicoId": 1,
  "profissionalId": 1,
  "data": "2025-07-10",
  "hora": "10:00"
}
```

- `PUT /agendamentos/:id`
- `DELETE /agendamentos/:id`

> ⚠️ A API previne a criação de agendamentos duplicados para o mesmo profissional, data e horário.

---

## 💡 Observações

- Todos os endpoints utilizam `Content-Type: application/json`
- A API é pública (sem autenticação)
