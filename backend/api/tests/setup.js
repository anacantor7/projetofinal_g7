// tests/setup.js - Configuración global para tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-testing-only';
process.env.PORT = 3001;

// Mock da base de dados para testes
jest.setTimeout(10000);

// Configuração global para testes
global.console = {
  ...console,
  // Silenciar logs durante testes
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
