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
      
      // Actualizar datos del cliente desde la API para asegurar información correcta
      fetch(`http://localhost:3000/clientes/${userData.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erro ao buscar dados do cliente');
          return res.json();
        })
        .then(clienteData => {
          setName(clienteData.nome);
          console.log('[PAGSEG] Dados do cliente atualizados:', clienteData);
          
          // Actualizar localStorage con los datos más recientes
          const updatedUserData = { ...userData, nome: clienteData.nome };
          localStorage.setItem('usuarioLogado', JSON.stringify(updatedUserData));
        })
        .catch(err => {
          console.error('[PAGSEG] Erro ao atualizar dados do cliente:', err);
          // Usa los datos del localStorage caso a atualização falhe
          setName(userData.nome);
        });
      
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
    <div className="PagSeg-body">
      
      <div className="user-info">
        <div className="userinfo" style={{ color: 'white' }}>👤 {capitalizeName(name)}</div>
        <div className="user-info-secondary">Cliente</div>
      </div>
      <h1 className="userinfo page-title">Bem-vindo, {capitalizeName(name)}</h1>
      <h2 className="userinfo section-title">Você está na página de serviços.</h2>
      <h2 className="userinfo section-title">Selecione uma opção abaixo:</h2>
      <div className="PagSeg-container">
        <button className="PagSeg-btn" onClick={() => registrarEIr('Agendar', '/agendamento')}>Agendar</button>
        <button className="PagSeg-btn" onClick={() => registrarEIr('Serviços', '/servicos')}>Serviços</button>
        <button className="PagSeg-btn" onClick={() => registrarEIr('Feedback', '/feedback')}>Feedback</button>
      </div>
      <div className="agendamentos-section">
        <h2 className="agendamentos-title">Meus Agendamentos</h2>
        {fetchError ? (
          <p className="agendamentos-error">Erro ao buscar agendamentos. Tente novamente mais tarde.</p>
        ) : agendamentos.length === 0 ? (
          <p className="agendamentos-empty">Nenhum agendamento encontrado.</p>
        ) : (
          <table className="agendamentos-table">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map(a => (
                <tr key={a.id}>
                  <td>{a.Servico?.nome || '-'}</td>
                  <td>{a.data || '-'}</td>
                  <td>{a.hora || '-'}</td>
                  <td>
                    <button onClick={() => handleEditar(a.id)} className="btn-action btn-edit">Editar</button>
                    <button onClick={() => handleExcluir(a.id)} className="btn-action btn-delete">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button onClick={handleLogout} className="logout-btn">🚪 Sair</button>
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

