import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Unificar estilos en App.css

export default function PagSeg() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del usuario logueado desde localStorage
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      const userData = JSON.parse(usuario);
      setName(userData.nome);
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
    </div>
  );
}
