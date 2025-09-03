// src/test/pages/Cadastro.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, test, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Cadastro from '../../pages/Cadastro'

// Mock do useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const CadastroWithRouter = () => (
  <BrowserRouter>
    <Cadastro />
  </BrowserRouter>
)

beforeEach(() => {
  vi.clearAllMocks()
  fetch.mockClear()
})

test('deve renderizar formulário de cadastro', () => {
  render(<CadastroWithRouter />)
  
  expect(screen.getByRole('heading', { name: 'Criar Conta' })).toBeInTheDocument()
  expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument()
})

test('deve validar campos obrigatórios', async () => {
  render(<CadastroWithRouter />)
  
  const submitButton = screen.getByRole('button', { name: /criar conta/i })
  fireEvent.click(submitButton)

  // Verificar se não houve chamada à API sem dados
  expect(fetch).not.toHaveBeenCalled()
})

test('deve enviar dados válidos para API', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, nome: 'João', email: 'joao@teste.com' }),
  })

  render(<CadastroWithRouter />)
  
  const nomeInput = screen.getByLabelText(/nome/i)
  const emailInput = screen.getByLabelText(/email/i)
  const telefoneInput = screen.getByLabelText(/telefone/i)
  const senhaInput = screen.getByLabelText(/senha/i)
  const submitButton = screen.getByRole('button', { name: /criar conta/i })

  fireEvent.change(nomeInput, { target: { value: 'João Silva' } })
  fireEvent.change(emailInput, { target: { value: 'joao@teste.com' } })
  fireEvent.change(telefoneInput, { target: { value: '11999999999' } })
  fireEvent.change(senhaInput, { target: { value: 'senha123' } })
  
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'João Silva',
        telefone: '11999999999',
        email: 'joao@teste.com',
        senha: 'senha123'
      })
    })
  })
})

test('deve exibir erro quando API retorna erro', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ erro: 'Email já existe' }),
  })

  render(<CadastroWithRouter />)
  
  const nomeInput = screen.getByLabelText(/nome/i)
  const emailInput = screen.getByLabelText(/email/i)
  const telefoneInput = screen.getByLabelText(/telefone/i)
  const senhaInput = screen.getByLabelText(/senha/i)
  const submitButton = screen.getByRole('button', { name: /criar conta/i })

  fireEvent.change(nomeInput, { target: { value: 'João Silva' } })
  fireEvent.change(emailInput, { target: { value: 'joao@teste.com' } })
  fireEvent.change(telefoneInput, { target: { value: '11999999999' } })
  fireEvent.change(senhaInput, { target: { value: 'senha123' } })
  
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.getByText(/email já existe/i)).toBeInTheDocument()
  })
})
