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
// ...existing code...

export default function App() {
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
        {/* Add more routes as needed */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}