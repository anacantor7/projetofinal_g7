import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PageInit from './pages/pagInit'
import Cadastro from './pages/Cadastro'
import RecuperarSenha from './pages/recuperarSn'
import PagSeg from './pages/PagSeg';
import Agendamentos from './pages/Agendamento';
import Servicos from './pages/Servicos';
import Feedback from './pages/feedback';
import Admin from './pages/Admin';
import { useEffect } from 'react';

function AdminRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (usuario && usuario.role === 'admin') {
    return children;
  } else {
    return <h1>Acceso denegado</h1>;
  }
}

export default function App() {
  // Redirigir automáticamente a /admin si el usuario es admin
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario && usuario.role === 'admin' && window.location.pathname !== '/admin') {
      window.location.href = '/admin';
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PageInit />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/pagseg" element={<PagSeg />} />
        <Route path="/Agendamento" element={<Agendamentos />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />
        {/* Add more routes as needed */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}