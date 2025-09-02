import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import salaoImg from '../assets/salao-inicio.jpg';
import { capitalizeName } from '../utils/textUtils';

export default function PageInit() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email && password) {
      // Primero intenta login admin
      try {
        const adminResponse = await fetch("http://localhost:3000/admin-auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha: password })
        });
        const adminData = await adminResponse.json();
        console.log('Admin login response:', adminResponse.status, adminData); // <-- Debug
        if (adminResponse.ok) {
          setMensagem("Login admin bem-sucedido! Bem-vindo, " + capitalizeName(adminData.admin.nome));
          // Guardar token y datos del admin
          localStorage.setItem('token', adminData.token);
          localStorage.setItem('usuarioLogado', JSON.stringify({ ...adminData.admin, role: 'admin' }));
          setTimeout(() => {
            navigate("/Admin");
          }, 1000);
          return;
        }
      } catch (error) {
        console.log('Admin login error:', error); // <-- Debug
        // Continua para login cliente
      }
      // Si no es admin, intenta login cliente
      try {
        const response = await fetch("http://localhost:3000/clientes/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha: password })
        });
        const data = await response.json();
        console.log('Cliente login response:', response.status, data); // <-- Debug
        if (response.ok) {
          setMensagem("Login bem-sucedido! Bem-vindo, " + capitalizeName(data.cliente.nome));
          // Guardar token e dados do cliente
          localStorage.setItem('token', data.token);
          localStorage.setItem('usuarioLogado', JSON.stringify(data.cliente));
          setTimeout(() => {
            navigate("/PagSeg");
          }, 1000);
        } else {
          setMensagem(data.erro || "Erro ao fazer login");
        }
      } catch (error) {
        console.log('Cliente login error:', error); // <-- Debug
        setMensagem("Erro de conexão com o servidor");
      }
    } else {
      setMensagem('Por favor, preencha email e senha');
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="content-left">
          <img src={salaoImg} alt="Salão de Beleza" className="hero-image" />
          <h2 className="hero-title">
            AUMENTE SUA PRODUTIVIDADE
          </h2>
          <p className="hero-description">
            Com uma plataforma de agenda automática personalizada.<br />
            Adicione funcionalidades e conte com nosso atendimento para o que precisar.
          </p>
        </div>

        <div className="content-right">
          <div className="form-container">
            <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.2rem' }}>
              Bem-vindo ao Bellizy
            </h1>

            {mensagem && (
              <div className={`message ${mensagem.includes('sucesso') || mensagem.includes('bem-sucedido') ? 'success' : mensagem.includes('Erro') ? 'error' : 'info'}`}>
                {mensagem}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Digite seu email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Senha:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Digite sua senha"
                />
              </div>

              <button type="submit" className="form-button">
                Entrar
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <p style={{ marginBottom: '0.5rem', color: '#666' }}>
                Não tem uma conta?
              </p>
              <Link
                to="/cadastro"
                style={{
                  color: '#C8377C',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}