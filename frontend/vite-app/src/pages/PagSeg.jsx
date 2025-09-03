import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Unificar estilos en App.css
import ErrorBoundary from '../components/ErrorBoundary';
import { capitalizeName } from '../utils/textUtils';

function PagSeg() {
  const [name, setName] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del usuario logueado desde localStorage
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      const userData = JSON.parse(usuario);
      setName(userData.nome);
      // Buscar agendamentos do usuário
      fetch(`http://localhost:3000/agendamentos?clienteId=${userData.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erro ao buscar agendamentos');
          return res.json();
        })
        .then(data => {
          setAgendamentos(data);
          setFetchError(false);
        })
        .catch(() => {
          setAgendamentos([]);
          setFetchError(true);
        });
    } else {
      // Si no hay usuario logueado, redirigir al login
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setName('');
    navigate('/');
  };

  // Función para registrar la acción y navegar
  const registrarEIr = async (acao, ruta) => {
    try {
      await fetch('http://localhost:3000/api/log-acao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: name, acao })
      });
      navigate(ruta);
    } catch {
      alert('Erro ao registrar ação.');
    }
  };

  const handleEditar = (id) => {
    navigate(`/agendamento?id=${id}`);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este agendamento?')) {
      await fetch(`http://localhost:3000/agendamentos/${id}`, { method: 'DELETE' });
      setAgendamentos(agendamentos.filter(a => a.id !== id));
    }
  };

  return (
    <div className="PagSeg-body" style={{ paddingTop: '2rem' }}>
      <div className="user-info">
        <div>👤 {capitalizeName(name)}</div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Cliente</div>
      </div>
      <button onClick={handleLogout} className="logout-btn">🚪 Sair</button>
      <h1>Bem-vindo, {capitalizeName(name)}</h1>
      <h2>Você está na página de serviços.</h2>
      <h2>Selecione uma opção abaixo:</h2>
      <div className="PagSeg-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', marginTop: '24px' }}>
        <button className="PagSeg-btn" onClick={() => registrarEIr('Agendar', '/agendamento')} style={{ width: '220px' }}>Agendar</button>
        <button className="PagSeg-btn" onClick={() => registrarEIr('Serviços', '/servicos')} style={{ width: '220px' }}>Serviços</button>
        <button className="PagSeg-btn" onClick={() => registrarEIr('Feedback', '/feedback')} style={{ width: '220px' }}>Feedback</button>
      </div>
      <div style={{ marginTop: '40px', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ color: '#C8377C', marginBottom: '12px' }}>Meus Agendamentos</h2>
        {fetchError ? (
          <p style={{ color: 'red' }}>Erro ao buscar agendamentos. Tente novamente mais tarde.</p>
        ) : agendamentos.length === 0 ? (
          <p style={{ color: '#888' }}>Nenhum agendamento encontrado.</p>
        ) : (
          <table style={{ width: '100%', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #0001', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#ffd1dc', color: '#C8377C' }}>
                <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Serviço</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Data</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Hora</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map(a => (
                <tr key={a.id}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.Servico?.nome || '-'}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.data || '-'}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.hora || '-'}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <button onClick={() => handleEditar(a.id)} className="btn btn-primary btn-sm" style={{ marginRight: '8px' }}>Editar</button>
                    <button onClick={() => handleExcluir(a.id)} className="btn btn-danger btn-sm">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Export a version of PagSeg wrapped in ErrorBoundary
export function PagSegWithBoundary(props) {
  return (
    <ErrorBoundary>
      <PagSeg {...props} />
    </ErrorBoundary>
  );
}

export default PagSeg;

