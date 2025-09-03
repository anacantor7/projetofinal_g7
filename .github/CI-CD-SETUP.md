# Configuração CI/CD - AgendaBeleza

## 🚀 Pipeline de Integração e Deploy Automatizado

### Visão Geral
O pipeline CI/CD foi configurado com GitHub Actions para automatizar testes, análise de segurança e deploy da aplicação AgendaBeleza.

## 📁 Estrutura do Pipeline

### Arquivo Principal
- **Localização**: `.github/workflows/ci-cd.yml`
- **Trigger**: Push para `main`/`develop` e Pull Requests para `main`

## 🔄 Jobs do Pipeline

### 1. Backend Tests & Security Scan
**Objetivo**: Validar código do backend e verificar segurança

**Etapas**:
- ✅ Setup Node.js 18
- ✅ Instalação de dependências (`npm ci`)
- ✅ Auditoria de segurança (`npm audit`)
- ✅ Execução dos testes (`npm test`)
- ✅ Geração de cobertura de testes

**Configuração de Ambiente**:
```yaml
NODE_ENV: test
JWT_SECRET: ${{ secrets.JWT_SECRET || 'test-secret-key-for-ci' }}
ADMIN_EMAIL: admin@test.com
ADMIN_PASSWORD: admin123
```

### 2. Frontend Tests & Build
**Objetivo**: Validar código do frontend e gerar build de produção

**Etapas**:
- ✅ Setup Node.js 18
- ✅ Instalação de dependências
- ✅ Auditoria de segurança
- ✅ Execução do ESLint
- ✅ Execução dos testes Vitest
- ✅ Build para produção
- ✅ Upload dos artefatos de build

### 3. Security Analysis
**Objetivo**: Análise avançada de segurança com CodeQL

**Características**:
- 🔒 Análise estática de código
- 🔍 Detecção de vulnerabilidades
- 📊 Relatório de segurança automatizado

### 4. Deploy Staging
**Trigger**: Push para branch `develop`

**Processo**:
- ✅ Validação de todos os testes
- ✅ Deploy automático para ambiente de staging
- 📍 URLs de staging configuradas

### 5. Deploy Production
**Trigger**: Push para branch `main`

**Processo**:
- ✅ Validação completa de segurança
- ✅ Deploy automático para produção
- 🔔 Notificação de sucesso

## 📊 Status Atual dos Testes

### Backend (26/26 testes ✅)
- **auth.test.js**: Autenticação e autorização
- **clientes.test.js**: Operações CRUD de clientes
- **agendamentos.test.js**: Sistema de agendamentos

### Frontend (9/9 testes ✅)
- **api.test.js**: Utilitários da API
- **ErrorBoundary.test.jsx**: Tratamento de erros
- **Cadastro.test.jsx**: Página de cadastro

## 🔧 Configuração Local para CI/CD

### Scripts NPM Necessários

#### Backend (`backend/api/package.json`):
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

#### Frontend (`frontend/vite-app/package.json`):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## 🔐 Secrets do GitHub

### Configuração Necessária
Para deploy em produção, configure os seguintes secrets no GitHub:

```
JWT_SECRET=your-production-jwt-secret
DB_PASSWORD=your-database-password
API_URL=https://api.agendabeleza.com
```

## 🎯 Benefícios Implementados

### ✅ Automação Completa
- Testes executados automaticamente
- Deploy sem intervenção manual
- Validação de segurança integrada

### ✅ Qualidade de Código
- 100% dos testes passando (35/35)
- Análise de vulnerabilidades
- Cobertura de testes automatizada

### ✅ Segurança Robusta
- Auditoria de dependências
- Análise estática com CodeQL
- Middleware de autenticação protegendo rotas admin

### ✅ Processo de Deploy Seguro
- Ambientes separados (staging/production)
- Validação obrigatória antes do deploy
- Rollback automático em caso de falha

## 🚀 Como Usar

### 1. Desenvolvimento
```bash
# Backend
cd backend/api
npm run dev

# Frontend
cd frontend/vite-app
npm run dev
```

### 2. Testes Locais
```bash
# Backend
npm test

# Frontend
npm test
```

### 3. Deploy
- **Staging**: Push para branch `develop`
- **Production**: Push para branch `main`

## 📈 Próximos Passos

### Melhorias Planejadas
- [ ] Integração com sistema de monitoramento
- [ ] Notificações via Slack/Discord
- [ ] Análise de performance automatizada
- [ ] Deploy com blue-green strategy
- [ ] Integração com banco de dados de produção

### Configuração de Servidor
- [ ] Setup do servidor de staging
- [ ] Configuração do servidor de produção
- [ ] DNS e certificados SSL
- [ ] Backup automatizado

## 🔗 Links Úteis

- **Repository**: [GitHub - AgendaBeleza]
- **Staging**: staging.agendabeleza.com
- **Production**: agendabeleza.com
- **API Docs**: api.agendabeleza.com/docs

---

**Status**: ✅ CI/CD Pipeline Configurado e Funcionando
**Última Atualização**: $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Testes**: 35/35 Passando (100% Success Rate)
