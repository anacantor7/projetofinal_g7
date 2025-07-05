import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Unificar estilos en App.css

export default function PagSeg() {
  const [name, setName] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del usuario logueado desde localStorage
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      const userData = JSON.parse(usuario);
      setName(userData.nome);
      // Buscar agendamentos do usuário
      fetch(`http://localhost:3000/agendamentos?clienteId=${userData.id}`)
        .then(res => res.json())
        .then(data => setAgendamentos(data))
        .catch(() => setAgendamentos([]));
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
    } catch (error) {
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
      <div className="PagSeg-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
        <span className="PagSeg-user" style={{ fontWeight: 'bold', color: '#C8377C' }}>Usuário logado: <b>{name}</b></span>
        <button className="PagSeg-logout" onClick={handleLogout} style={{ fontSize: '0.85rem', padding: '4px 14px', borderRadius: '8px', background: '#eee', color: '#C8377C', border: '1px solid #C8377C', marginTop: '2px', alignSelf: 'flex-start' }}>Sair</button>
      </div>
      <h1>Bem-vindo, {name}</h1>
      <p>Você está na página de serviços.</p>
      <p>Selecione uma opção abaixo:</p>
      <div className="PagSeg-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', marginTop: '24px' }}>
        <button className="PagSeg-btn" onClick={() => registrarEIr('Agendar', '/agendamento')} style={{ width: '220px' }}>Agendar</button>
        <button className="PagSeg-btn" onClick={() => registrarEIr('Serviços', '/servicos')} style={{ width: '220px' }}>Serviços</button>
        <button className="PagSeg-btn" onClick={() => registrarEIr('Feedback', '/feedback')} style={{ width: '220px' }}>Feedback</button>
      </div>
      <div style={{ marginTop: '40px', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ color: '#C8377C', marginBottom: '12px' }}>Meus Agendamentos</h2>
        {agendamentos.length === 0 ? (
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
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.data}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{a.hora}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <button onClick={() => handleEditar(a.id)} style={{ marginRight: '8px', background: '#ffd1dc', color: '#C8377C', border: '1px solid #C8377C', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Editar</button>
                    <button onClick={() => handleExcluir(a.id)} style={{ background: '#eee', color: '#C8377C', border: '1px solid #C8377C', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Excluir</button>
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
