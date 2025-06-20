# 💇‍♀️ Agenda Inteligente para Salões de Beleza

Aplicação Full Stack para gerenciamento de agendamentos em salões de beleza, desenvolvida como projeto final do curso Full Stack da Toti.

Com ela, é possível cadastrar clientes, serviços, profissionais e agendamentos de forma totalmente digital, com opções de classificação e filtros avançados, facilitando a rotina de profissionais que ainda utilizam cadernos físicos para controle.

---

## ✨ Funcionalidades

- Cadastro, edição e remoção de **clientes**
- Cadastro, edição e remoção de **serviços**
- Cadastro, edição e remoção de **profissionais**
- Registro e gerenciamento de **agendamentos** com vinculação a cliente, serviço e profissional
- Cadastro de **tipos de serviço** para classificação (ex: Cabelo, Maquiagem, etc.)
- Visualização da agenda por dia e por semana (em desenvolvimento no front-end)
- Filtros: busca de agendamentos por data, cliente, profissional e horário
- Prevenção de conflitos de horário para o mesmo profissional
- Controle de visibilidade com o campo `ativo: boolean` (sem exclusão definitiva)
- **Horário de funcionamento configurado:** agendamentos permitidos apenas entre **09h e 18h**
- **Validação automática da especialidade do profissional** conforme o tipo do serviço
- Validações para evitar cadastros duplicados:
  - Cliente com mesmo nome + telefone
  - Profissional com mesmo nome + telefone
  - Serviço com nome repetido
  - Tipo de serviço com nome repetido

---

## 🚀 Tecnologias utilizadas

### 🔧 Back-End

- Node.js
- Express
- Sequelize
- SQLite
- Cors
- Dotenv

### 🎨 Front-End

- React (a ser desenvolvido)
- Figma (protótipo visual)

---

## 👩‍💻 Time de desenvolvimento

| Nome          | Responsável por                         |
| ------------- | --------------------------------------- |
| **Ana Maria** | Design da interface (Figma) + Front-End |
| **Sara**      | API (Node.js/Express) + Rotas + Banco   |
| **Nuvia**     | Banco de dados (SQLite) + Testes        |

---

## 📡 Acesso online (após deploy)

> Em breve, a API estará disponível online através do Render, permitindo que a interface em React e testes externos (como Postman ou Insomnia) possam acessar os dados remotamente.

🔗 URL da API no Render (será adicionado aqui após o deploy):

---

## 🛠️ Como rodar o projeto localmente

### 🛆 Pré-requisitos

- Node.js instalado
- Git instalado (opcional)

### 🚀 Passos para rodar

1. Clone o repositório:

   ```bash
   git clone https://github.com/anacantor7/projetofinal_g7.git
   cd projetofinal_g7
   ```

2. No terminal, acesse a pasta `backend/api-sara`:

   ```bash
   cd backend
   cd api-sara
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   node app.js
   ```

5. A API estará disponível em:

   ```bash
   http://localhost:3000
   ```

6. Use ferramentas como **Postman** ou **Insomnia** para testar os endpoints.

---

📘 A documentação completa da API está disponível em [`docs/API.md`](./docs/API.md)

---

## 🔮 Melhorias futuras

As ideias abaixo ainda não foram implementadas, mas podem ser consideradas em versões futuras:

- 🔐 Adicionar autenticação e login (visual já esboçado no Figma)
- 📩 Enviar confirmações de agendamento por e-mail
- 🧪 Testes automatizados com Jest no back-end
- ⏰ Impedir agendamentos sobrepostos com base na duração dos serviços, garantindo que o(a) profissional esteja disponível durante todo o período da execução
- 🕒 Impedir agendamentos com datas passadas, garantindo que todos os horários cadastrados sejam futuros
- 📅 Definir dias úteis e feriados como indisponíveis para agendamentos futuros
- 💳 Integração com sistema de pagamentos (ex: Pix, cartão) para serviços pagos online
