// Utilitários para API com autenticação JWT

// Função para fazer requests autenticados
export const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Agregar token de autorización si existe
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...defaultOptions, ...options });

  // Si el token es inválido o expiró, redirigir al login
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/';
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  return response;
};

// Função para verificar se el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('usuarioLogado');
  return !!(token && user);
};

// Função para obtener datos del usuario autenticado
export const getCurrentUser = () => {
  const user = localStorage.getItem('usuarioLogado');
  return user ? JSON.parse(user) : null;
};

// Função para logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuarioLogado');
  window.location.href = '/';
};
