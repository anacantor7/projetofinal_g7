#!/bin/bash
# scripts/test-all.sh - Script para executar todos os testes

echo "🧪 Executando todos os testes do AgendaBeleza..."
echo "================================================"

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Verificando dependências...${NC}"

# Verificar se as dependências estão instaladas
if [ ! -d "backend/api-sara/node_modules" ]; then
    echo -e "${RED}❌ Dependências do backend não encontradas. Instalando...${NC}"
    cd backend/api-sara && npm install && cd ../..
fi

if [ ! -d "frontend/vite-app/node_modules" ]; then
    echo -e "${RED}❌ Dependências do frontend não encontradas. Instalando...${NC}"
    cd frontend/vite-app && npm install && cd ../..
fi

echo -e "${GREEN}✅ Dependências verificadas${NC}"

# Executar testes do backend
echo -e "\n${BLUE}🔙 Executando testes do Backend (Jest + Supertest)...${NC}"
echo "=============================================="
cd backend/api-sara
npm test
BACKEND_RESULT=$?
cd ../..

# Executar testes do frontend
echo -e "\n${BLUE}🎨 Executando testes do Frontend (Vitest + RTL)...${NC}"
echo "=============================================="
cd frontend/vite-app
npm test --run
FRONTEND_RESULT=$?
cd ../..

# Resumo final
echo -e "\n${BLUE}📊 RESUMO DOS TESTES${NC}"
echo "===================="

if [ $BACKEND_RESULT -eq 0 ]; then
    echo -e "${GREEN}✅ Backend: PASSOU${NC}"
else
    echo -e "${RED}❌ Backend: FALHOU${NC}"
fi

if [ $FRONTEND_RESULT -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend: PASSOU${NC}"
else
    echo -e "${RED}❌ Frontend: FALHOU${NC}"
fi

echo -e "\n${BLUE}🎯 Para executar testes individuais:${NC}"
echo "Backend:  cd backend/api-sara && npm test"
echo "Frontend: cd frontend/vite-app && npm test"
echo ""
echo -e "${BLUE}🔍 Para executar com cobertura:${NC}"
echo "Backend:  cd backend/api-sara && npm run test:coverage"
echo "Frontend: cd frontend/vite-app && npm run test:coverage"

if [ $BACKEND_RESULT -eq 0 ] && [ $FRONTEND_RESULT -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TODOS OS TESTES PASSARAM!${NC}"
    exit 0
else
    echo -e "\n${RED}⚠️  ALGUNS TESTES FALHARAM${NC}"
    exit 1
fi
