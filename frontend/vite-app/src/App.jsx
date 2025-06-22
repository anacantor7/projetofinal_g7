import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PageInit from './pages/pagInit'
import Cadastro from './pages/Cadastro'
import RecuperarSenha from './pages/recuperarSn'
// ...existing code...

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PageInit />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      </Routes>
      <Footer />
    </Router>
  );
}