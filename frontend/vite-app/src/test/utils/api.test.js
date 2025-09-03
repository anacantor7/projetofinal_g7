// src/test/utils/api.test.js
import { expect, test, vi, beforeEach } from 'vitest'

// Mock do fetch
global.fetch = vi.fn()

beforeEach(() => {
  fetch.mockClear()
})

test('deve fazer requisição GET corretamente', async () => {
  const mockResponse = { id: 1, nome: 'Teste' }
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  })

  const response = await fetch('http://localhost:3000/clientes')
  const data = await response.json()

  expect(fetch).toHaveBeenCalledWith('http://localhost:3000/clientes')
  expect(data).toEqual(mockResponse)
})

test('deve fazer requisição POST corretamente', async () => {
  const mockData = { nome: 'Novo Cliente', email: 'teste@email.com' }
  const mockResponse = { id: 1, ...mockData }
  
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  })

  const response = await fetch('http://localhost:3000/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mockData)
  })
  
  const data = await response.json()

  expect(fetch).toHaveBeenCalledWith('http://localhost:3000/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mockData)
  })
  expect(data).toEqual(mockResponse)
})

test('deve tratar erros de rede', async () => {
  fetch.mockRejectedValueOnce(new Error('Erro de rede'))

  try {
    await fetch('http://localhost:3000/clientes')
  } catch (error) {
    expect(error.message).toBe('Erro de rede')
  }
})
