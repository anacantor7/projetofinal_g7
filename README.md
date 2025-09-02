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

- React
- Vite
- React Router DOM
- React Icons
- ESLint

---

## 👩‍💻 Time de desenvolvimento

| Nome          | Responsável por                                         |
| ------------- | ------------------------------------------------------- |
| **Ana Maria** | Design da interface (Figma) + Front-End (React) +  Banco de dados (SQLite) + Rotas  |
| **Sara**      | API (Node.js/Express) + Banco de dados (SQLite) + Rotas |

---

## 📡 Acesso online (após deploy)

> A API está disponível online através do Render, permitindo que a interface em React e testes externos (como Postman ou Insomnia) possam acessar os dados remotamente.

🔗 URL da API no Render: https://agenda-inteligente-backend.onrender.com

⚠️ Obs: Como é uma instância gratuita, o servidor pode levar alguns segundos para "acordar" após um tempo inativo.

---

## 🛠️ Como rodar o projeto localmente

### 🛆 Pré-requisitos

- Node.js (versão 16 ou superior)
- Git
- npm ou yarn

### 🚀 Passos para instalação e execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/juansolor/AgendaBeleza.git
   cd AgendaBeleza
   ```

2. **Instale as dependências do backend:**

   ```bash
   cd backend/api-sara
   npm install
   ```

3. **Instale as dependências do frontend:**

   ```bash
   cd ../../frontend/vite-app
   npm install
   cd ../..
   ```

4. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na pasta `backend/api-sara` com:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=./database.sqlite
   JWT_SECRET=your-secret-key-here
   ```

5. **Inicie o backend:**

   ```bash
   cd backend/api-sara
   npm start
   # ou para desenvolvimento:
   npm run dev
   ```

6. **Inicie o frontend (em outro terminal):**

   ```bash
   cd frontend/vite-app
   npm run dev
   ```

7. **Acesse a aplicação:**

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

---

## � Scripts disponíveis

### Backend
```bash
npm start          # Inicia o servidor em produção
npm run dev        # Inicia o servidor em modo desenvolvimento
npm test           # Executa os testes
npm run lint       # Executa o linter
```

### Frontend
```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
npm run lint       # Executa o linter
```

---

## 🏗️ Estrutura do projeto

```
AgendaBeleza/
├── backend/
│   └── api-sara/
│       ├── controllers/     # Controladores da API
│       ├── models/         # Modelos do Sequelize
│       ├── routes/         # Definições das rotas
│       ├── database/       # Configuração do banco
│       ├── docs/          # Documentação da API
│       └── app.js         # Arquivo principal
├── frontend/
│   └── vite-app/
│       ├── public/        # Assets estáticos
│       ├── src/
│       │   ├── components/ # Componentes React
│       │   ├── pages/     # Páginas da aplicação
│       │   ├── utils/     # Utilitários
│       │   └── App.jsx    # Componente principal
│       └── package.json
└── README.md
```

---

## 🔧 Melhorias implementadas

### ✅ Segurança
- [x] Hashing de senhas com bcrypt
- [x] Autenticação JWT
- [x] Middleware de autenticação
- [x] Validação de entrada

### ✅ Qualidade de código
- [x] Correção de erros de linting (32 erros encontrados)
- [ ] Padronização de linguagem (Português)
- [x] **Refatoração do componente Admin (871 linhas → componentes menores)** ✅
- [x] Correção de dependências em useEffect

### ✅ Arquitetura
- [x] Migração para PostgreSQL
- [x] Separação em camadas (controllers, services, middlewares)
- [x] Configuração com variáveis de ambiente
- [x] Sistema de logs estruturado
- [x] **Refatoração do componente Admin (871 linhas → componentes menores)** ✅

### ✅ Performance
- [ ] Implementação de cache
- [ ] Paginación en endpoints
- [ ] Compresión gzip
- [ ] Optimización de imágenes

### ✅ Testing
- [ ] Tests unitários com Jest
- [ ] Tests de integração
- [ ] Cobertura de código >70%
- [ ] CI/CD com GitHub Actions

---

## 🔄 Refatoração do Componente Admin

### 📊 Antes da Refatoração
- **Arquivo único:** `Admin.jsx` com 871 linhas
- **Problemas identificados:**
  - Violação do princípio da responsabilidade única
  - Dificuldade de manutenção e debug
  - Código duplicado
  - Estado complexo e difícil de gerenciar
  - Múltiplas responsabilidades em um só componente

### ✅ Após a Refatoração
- **Componente principal:** `AdminDashboard.jsx` (37 linhas)
- **Componentes especializados criados:**
  - `AdminHeader.jsx` - Header com informações do usuário e logout
  - `UserManagement.jsx` - Gestão completa de usuários/clientes
  - `EmployeeManagement.jsx` - Gestão completa de funcionários
  - `ServiceManagement.jsx` - Gestão completa de serviços
  - `ScheduleManagement.jsx` - Gestão completa de horários
  - `SubcategoryManagement.jsx` - Gestão completa de subcategorias
  - `ActivityLogs.jsx` - Visualização de logs de atividade

- **Hooks personalizados criados:**
  - `useUsers.js` - Lógica para gestão de usuários
  - `useEmployees.js` - Lógica para gestão de funcionários
  - `useServices.js` - Lógica para gestão de serviços
  - `useSchedules.js` - Lógica para gestão de horários
  - `useTypesAndSubcategories.js` - Lógica para tipos e subcategorias
  - `useLogs.js` - Lógica para logs de atividade

### 🎯 Benefícios da Refatoração
- **Manutenibilidade:** Código mais fácil de entender e modificar
- **Reutilização:** Componentes podem ser reutilizados em outras partes da aplicação
- **Testabilidade:** Componentes menores são mais fáceis de testar
- **Performance:** Melhor controle de re-renderização com hooks especializados
- **Escalabilidade:** Fácil adicionar novas funcionalidades sem afetar outras partes
- **Separação de responsabilidades:** Cada componente tem uma única responsabilidade

---

## 🎯 Roadmap de melhorias

### 🔴 Prioridade Alta
- [x] Implementar autenticação JWT ✅
- [x] Corrigir todos os erros de linting ✅
- [x] **Refatorar componente Admin** ✅
- [ ] Adicionar validações de entrada

### 🟡 Prioridade Média
- [ ] Migrar para PostgreSQL
- [ ] Implementar testes automatizados
- [ ] Adicionar sistema de logs
- [ ] Melhorar responsividade mobile

### 🟢 Prioridade Baixa
- [ ] Implementar notificações por email
- [ ] Sistema de pagamentos
- [ ] Gestão financeira
- [ ] Painel individual para profissionais

---

## 🤝 Como contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

### 📝 Padrões de código

- Use ESLint para manter a qualidade do código
- Siga as convenções de nomenclatura em português
- Documente funções importantes com JSDoc
- Mantenha commits pequenos e descritivos

---

## 🐛 Issues conhecidos

- [ ] 32 erros de linting no frontend
- [ ] Senhas armazenadas em texto plano
- [ ] Falta autenticação em rotas sensíveis
- [ ] Componente Admin muito grande
- [ ] Dependências faltantes em useEffect
- [ ] Linguagens misturadas no código

---

## 📘 Documentação

- [API Documentation](./backend/api-sara/docs/API.md)
- [Frontend-Backend Integration](./backend/api-sara/docs/instrucoes-integracao.md)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🎯 **Mejora #2 COMPLETADA: Autenticación JWT**

### ✅ **Funcionalidades implementadas:**

#### 🔐 **Backend - Seguridad**
- ✅ **Hashing de senhas** com bcrypt (10 salt rounds)
- ✅ **Autenticação JWT** com tokens de 24 horas
- ✅ **Middleware de autenticação** (`authenticateToken`, `authenticateAdmin`)
- ✅ **Verificação de senhas** com `checkPassword()`
- ✅ **Proteção de rotas** admin com middleware
- ✅ **Migração de senhas** existentes (suporte backward compatibility)
- ✅ **Exclusão de senhas** em respostas JSON

#### 🔧 **Backend - Endpoints**
- ✅ `POST /clientes/login` - Login de clientes con JWT
- ✅ `POST /admin-auth/login` - Login de admins con JWT
- ✅ `GET /clientes/profile/me` - Perfil protegido (endpoint de prueba)
- ✅ Rutas admin protegidas con `authenticateAdmin`

#### 🎨 **Frontend - Utilidades**
- ✅ **Utilidad `apiRequest`** para requests autenticados
- ✅ **Gestión de tokens** en localStorage
- ✅ **Función `logout`** para cerrar sesión
- ✅ **Verificação de autenticação** com `isAuthenticated()`
- ✅ **Auto-redirecionamento** em caso de token expirado/inválido

#### 🔄 **Frontend - Atualizações**
- ✅ **Página de login** atualizada para salvar tokens
- ✅ **Compatibilidade** com respostas JWT do backend
- ✅ **Tratamento de erros** de autenticação

### 🧪 **Testing realizado:**
- ✅ Login de cliente exitoso con retorno de token
- ✅ Login de admin exitoso con retorno de token
- ✅ Servidor funcionando correctamente
- ✅ Base de datos sincronizada
- ✅ Middleware de autenticación operativo

### 🔑 **Credenciales de prueba:**
- **Admin:** `admin@salao.com` / `admin123`
- **Cliente:** `maria@mail.com` / `123`

### 📋 **Próximos pasos recomendados:**
1. **Refactorizar componente Admin** (871 líneas → componentes más pequeños)
2. **Implementar tests automatizados** con Jest
3. **Migrar a PostgreSQL** para producción
4. **Agregar validación de entrada** más robusta

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub ou entre em contato com a equipe de desenvolvimento.
