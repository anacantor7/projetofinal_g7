// src/test/components/ErrorBoundary.test.jsx
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import ErrorBoundary from '../../components/ErrorBoundary'

// Componente que gera erro para teste
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Erro de teste')
  }
  return <div>Componente funcionando</div>
}

test('deve renderizar children quando não há erro', () => {
  render(
    <ErrorBoundary>
      <ThrowError shouldThrow={false} />
    </ErrorBoundary>
  )
  
  expect(screen.getByText('Componente funcionando')).toBeInTheDocument()
})

test('deve exibir mensagem de erro quando há erro', () => {
  // Silenciar console.error para este teste
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  
  render(
    <ErrorBoundary>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  )
  
  expect(screen.getByText('Ocorreu um erro inesperado.')).toBeInTheDocument()
  expect(screen.getByText('Por favor, tente recarregar a página ou entre em contato com o suporte.')).toBeInTheDocument()
  
  consoleSpy.mockRestore()
})
