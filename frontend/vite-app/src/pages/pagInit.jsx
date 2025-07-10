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
          setMensagem("Login admin bem-sucedido! Bem-vindo, " + capitalizeName(adminData.nome));
          localStorage.setItem('usuarioLogado', JSON.stringify({ ...adminData, role: 'admin' }));
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
    <div style={{ display: 'flex', minHeight: '80vh', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
        <div style={{ maxWidth: '350px', textAlign: 'right' }}>
          <img src={salaoImg} alt="Salão" style={{ width: '100%', maxWidth: '260px', borderRadius: '12px', marginBottom: '18px', boxShadow: '0 2px 12px #0001' }} />
          <h2 style={{ color: '#C8377C', fontWeight: 'bold', fontSize: '2.3vw', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            AUMENTE SUA PRODUTIVIDADE
          </h2>
          <p style={{ fontSize: '1.3vw', color: '#333', margin: 0, textTransform: 'none', fontWeight: 500, lineHeight: 1.3, justifyContent: 'content-distribution' }}>
            Com uma plataforma de agenda automática personalizada.<br />
            Adicione funcionalidades e conte com nosso atendimento para o que precisar.
          </p>
        </div>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="pagInit" >
          <h1 style={{ textAlign: 'center', marginBottom: '18px' }}>Login</h1>
          {mensagem && <p className="mensagem-bienvenida" style={{ textAlign: 'center', color: mensagem.includes('bem-sucedido') ? '#6a0dad' : '#d32f2f', fontWeight: '600', fontSize: '1.1rem' }}>{mensagem}</p>}
          <div className='login-container'>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="input-email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
                style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', color: '#d63384' }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%', color: '#d63384' }}
              />
            </div>
            <button className="login-btn" onClick={handleLogin} style={{ width: '100%' }}>Login</button>
            <div className="links" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <Link to="/cadastro">Cadastro</Link>
              <Link to="/recuperar-senha">Recuperar Senha</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}