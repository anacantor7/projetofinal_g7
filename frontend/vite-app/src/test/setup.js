// src/test/setup.js - Configuração dos testes do frontend
import '@testing-library/jest-dom'

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock do fetch
global.fetch = vi.fn()

// Mock do console.warn e console.error para testes mais limpos
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
}
