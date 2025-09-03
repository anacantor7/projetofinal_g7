@echo off
REM scripts/test-all.bat - Script para executar todos os testes no Windows

echo 🧪 Executando todos os testes do AgendaBeleza...
echo ================================================

echo 📋 Verificando dependências...

REM Verificar se as dependências estão instaladas
if not exist "backend\api-sara\node_modules" (
    echo ❌ Dependências do backend não encontradas. Instalando...
    cd backend\api-sara
    call npm install
    cd ..\..
)

if not exist "frontend\vite-app\node_modules" (
    echo ❌ Dependências do frontend não encontradas. Instalando...
    cd frontend\vite-app
    call npm install
    cd ..\..
)

echo ✅ Dependências verificadas

REM Executar testes do backend
echo.
echo 🔙 Executando testes do Backend (Jest + Supertest)...
echo ==============================================
cd backend\api-sara
call npm test
set BACKEND_RESULT=%ERRORLEVEL%
cd ..\..

REM Executar testes do frontend
echo.
echo 🎨 Executando testes do Frontend (Vitest + RTL)...
echo ==============================================
cd frontend\vite-app
call npm test --run
set FRONTEND_RESULT=%ERRORLEVEL%
cd ..\..

REM Resumo final
echo.
echo 📊 RESUMO DOS TESTES
echo ====================

if %BACKEND_RESULT% equ 0 (
    echo ✅ Backend: PASSOU
) else (
    echo ❌ Backend: FALHOU
)

if %FRONTEND_RESULT% equ 0 (
    echo ✅ Frontend: PASSOU
) else (
    echo ❌ Frontend: FALHOU
)

echo.
echo 🎯 Para executar testes individuais:
echo Backend:  cd backend\api-sara ^&^& npm test
echo Frontend: cd frontend\vite-app ^&^& npm test
echo.
echo 🔍 Para executar com cobertura:
echo Backend:  cd backend\api-sara ^&^& npm run test:coverage
echo Frontend: cd frontend\vite-app ^&^& npm run test:coverage

if %BACKEND_RESULT% equ 0 if %FRONTEND_RESULT% equ 0 (
    echo.
    echo 🎉 TODOS OS TESTES PASSARAM!
    exit /b 0
) else (
    echo.
    echo ⚠️  ALGUNS TESTES FALHARAM
    exit /b 1
)
